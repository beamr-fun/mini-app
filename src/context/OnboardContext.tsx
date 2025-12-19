import React, { ReactNode, useCallback } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { User } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { usePublicClient, useReadContract, useWalletClient } from 'wagmi';
import { Address, erc20Abi, parseEther } from 'viem';
import { useUser } from '../hooks/useUser';
import { completePool, createPool, fetchBesties } from '../utils/api';
import { distributeFlow } from '../utils/interactions';
import { startTxPoll } from '../utils/poll';
import { notifications } from '@mantine/notifications';

type CreationSteps = {
  createPool: 'loading' | 'error' | 'success';
  distributeFlow: 'loading' | 'requesting' | 'error' | 'success';
  completePool: 'loading' | 'error' | 'success';
  indexTransaction: 'loading' | 'error' | 'success' | 'timeout';
};

type OnboardFormValues = {
  budget: number;
  preferredAddress: string;
  selectedFriends: string[];
};

type OnboardContextType = {
  budget: number;
  preferredAddress: string;
  selectedFriends?: string[];
  form?: UseFormReturnType<OnboardFormValues>;
  balance?: bigint;
  besties?: User[] | null;
  bestiesError: Error | null;
  creationSteps: CreationSteps;
  poolId?: Address;
  errMsg?: string;
  handlePoolCreate?: () => Promise<void>;
  handleDistributeFlow?: () => Promise<void>;
};

export const OnboardContext = React.createContext<OnboardContextType>({
  budget: 0,
  preferredAddress: '',
  errMsg: undefined,
  bestiesError: null,
  creationSteps: {
    createPool: 'loading',
    distributeFlow: 'loading',
    completePool: 'loading',
    indexTransaction: 'loading',
  },
});

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [creationSteps, setCreationSteps] = React.useState<CreationSteps>({
    createPool: 'loading',
    distributeFlow: 'loading',
    completePool: 'loading',
    indexTransaction: 'loading',
  });
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>();
  const [poolAddress, setPoolAddress] = React.useState<Address | undefined>();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { user, address, getAuthHeaders } = useUser();

  const {
    data: besties,
    error: bestiesError,
    // isLoading: isLoadingBesties,
  } = useQuery({
    queryKey: ['userFollowing', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) {
        // HANDLE ERROR
        console.error('No auth headers available');
        return null;
      }

      return fetchBesties(user!.fid, headers);
    },
    enabled: !!user?.fid,
  });
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      preferredAddress: '',
      budget: 0,
      selectedFriends: [] as string[],
    },
  });

  const { data: userBalance } = useReadContract({
    address: ADDR.SUPER_TOKEN,
    abi: erc20Abi,
    functionName: 'balanceOf',
    query: {
      enabled: !!form.values.preferredAddress,
    },
    args: [form.values.preferredAddress as `0x${string}`],
  });

  const handleError = (error: unknown, defaultMessage: string) => {
    let errMsg;

    if (error instanceof Error) {
      errMsg = error.message;
    } else if (typeof error === 'string') {
      errMsg = error;
    } else {
      errMsg = defaultMessage;
    }

    notifications.show({
      title: 'Error',
      message: errMsg,
      color: 'red',
    });

    setErrorMsg(errMsg);
  };

  const handlePoolCreate = useCallback(async () => {
    // handle errors later
    if (!user || !form || !address) {
      handleError(
        new Error('Missing user, form, or address'),
        'Cannot create pool'
      );
      return;
    }

    try {
      const flowRate =
        parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

      const apiHeaders = await getAuthHeaders();

      await createPool({
        onSuccess(poolAddress) {
          setPoolAddress(poolAddress as Address);
          setCreationSteps((prev) => ({ ...prev, createPool: 'success' }));
        },
        onError(errorMsg) {
          handleError(errorMsg, 'Error creating pool');
          setCreationSteps((prev) => ({ ...prev, createPool: 'error' }));
        },
        apiHeaders,
        publicClient,
        args: {
          creatorAddress: address,
          tokenAddress: ADDR.SUPER_TOKEN,
          fid: user.fid,
          displayName: user.display_name || 'Unnamed',
          flowRate: flowRate.toString(),
          selectedFriends: form.values.selectedFriends,
        },
      });
    } catch (error: any) {
      console.error('Error in pool creation process:', error);
      handleError(error?.message, 'Error in pool creation process');
    }
  }, [
    user,
    form,
    address,
    getAuthHeaders,
    publicClient,
    form.values.selectedFriends.length,
  ]);

  const handleDistributeFlow = async () => {
    if (!address || !poolAddress || !walletClient || !user) {
      handleError(
        new Error('Missing address, poolAddress, walletClient, or user'),
        'Cannot distribute flow'
      );
      return;
    }

    const flowRate =
      parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

    await distributeFlow({
      onError(errMsg) {
        handleError(errMsg, 'Error distributing flow');
      },
      onSuccess(txHash) {
        setCreationSteps((prev) => ({ ...prev, distributeFlow: 'success' }));
        startTxPoll({
          id: txHash,
          onTimeout() {
            setCreationSteps((prev) => ({
              ...prev,
              indexTransaction: 'timeout',
            }));
          },
          onError() {
            handleError(
              new Error('Transaction indexing failed'),
              'Error indexing transaction'
            );
            setCreationSteps((prev) => ({
              ...prev,
              indexTransaction: 'error',
            }));
          },
          onSuccess() {
            setCreationSteps((prev) => ({
              ...prev,
              indexTransaction: 'success',
            }));
          },
        });
      },
      args: {
        poolAddress: poolAddress as Address,
        user: address as Address,
        flowRate: flowRate,
      },
      walletClient,
      publicClient,
    });

    const freshApiHeaders = await getAuthHeaders();

    const completeArgs = {
      poolAddress,
      creatorAddress: address,
      fid: user.fid,
    };

    completePool({
      args: completeArgs,
      apiHeaders: freshApiHeaders,
      onSuccess() {
        setCreationSteps((prev) => ({ ...prev, completePool: 'success' }));
      },
      onError(errorMsg) {
        handleError(new Error(errorMsg), 'Error completing pool');
        setCreationSteps((prev) => ({ ...prev, completePool: 'error' }));
        setErrorMsg(errorMsg || 'Error Completing Pool');
      },
    });
  };

  return (
    <OnboardContext.Provider
      value={{
        budget: form.values.budget,
        preferredAddress: form.values.preferredAddress,
        form: form,
        balance: userBalance,
        besties,
        bestiesError,
        selectedFriends: form.values.selectedFriends,
        creationSteps: creationSteps,
        handlePoolCreate: handlePoolCreate,
        handleDistributeFlow: handleDistributeFlow,
        errMsg: errorMsg,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
