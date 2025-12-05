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

type CreationSteps = {
  createPool: boolean;
  distributeFlow: boolean;
  completePool: boolean;
  indexTransaction: boolean;
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
  creationSteps: {
    createPool: false,
    distributeFlow: false,
    completePool: false,
    indexTransaction: false,
  },
});

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [creationSteps, setCreationSteps] = React.useState<CreationSteps>({
    createPool: false,
    distributeFlow: false,
    completePool: false,
    indexTransaction: false,
  });
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>();
  const [poolAddress, setPoolAddress] = React.useState<Address | undefined>();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { user, address, getAuthHeaders } = useUser();

  const {
    data: besties,
    error: followingError,
    isLoading: isLoadingFollowing,
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

  const handlePoolCreate = useCallback(async () => {
    // handle errors later
    if (!user || !form || !address) return;

    console.log('*********');
    console.log('selectedFriends', form.values.selectedFriends);

    // call API to create pool
    try {
      const flowRate =
        parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

      const apiHeaders = await getAuthHeaders();

      const poolAddress = await createPool({
        onSuccess(poolAddress) {
          setPoolAddress(poolAddress as Address);
          setCreationSteps((prev) => ({ ...prev, createPool: true }));
        },
        onError(errorMsg) {
          console.log('Errored out here');
          throw new Error(errorMsg);
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

      if (!poolAddress) {
        throw new Error('Pool address not returned from createPool');
      }

      if (!publicClient) {
        throw new Error('Public client not available');
      }
    } catch (error) {
      console.error('Error in pool creation process:', error);
      setErrorMsg((error as Error).message);
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
    if (!address || !poolAddress || !walletClient || !user) return;

    const flowRate =
      parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

    await distributeFlow({
      onError(errMsg) {
        throw new Error(errMsg);
      },
      onSuccess(txHash) {
        setCreationSteps((prev) => ({ ...prev, distributeFlow: true }));
        startTxPoll({
          id: txHash,
          onError() {
            throw new Error('Transaction indexing failed');
          },
          onSuccess() {
            setCreationSteps((prev) => ({ ...prev, indexTransaction: true }));
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
        setCreationSteps((prev) => ({ ...prev, completePool: true }));
      },
      onError(errorMsg) {
        throw new Error(errorMsg);
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
