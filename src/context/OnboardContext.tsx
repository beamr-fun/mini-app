import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { Follower } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { usePublicClient, useReadContract, useWalletClient } from 'wagmi';
import { Address, erc20Abi, parseEther } from 'viem';
import { useUser } from '../hooks/useUser';
import { completePool, createPool, fetchUserFollowing } from '../utils/api';
import { distributeFlow } from '../utils/interactions';
import { startTxPoll } from '../utils/urql';

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
  following?: Follower[];
  creationSteps: CreationSteps;
  poolId?: Address;
  errMsg?: string;
  handlePoolCreate?: () => Promise<void>;
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
    data: userFollowing,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userFollowing', user?.fid],
    queryFn: () => fetchUserFollowing(user!.fid),
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

  const handlePoolCreate = async () => {
    // handle errors later
    if (!user || !form || !address) return;

    // call API to create pool
    try {
      const flowRate =
        parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

      const apiHeaders = await getAuthHeaders();

      const poolAddress = await createPool({
        onSuccess(_poolAddress) {
          setPoolAddress(_poolAddress as Address);
          setCreationSteps((prev) => ({ ...prev, createPool: true }));
        },
        onError(errorMsg) {
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
    } catch (error) {
      console.error('Error in pool creation process:', error);
      setErrorMsg((error as Error).message);
    }
  };

  return (
    <OnboardContext.Provider
      value={{
        budget: form.values.budget,
        preferredAddress: form.values.preferredAddress,
        form: form,
        balance: userBalance,
        following: userFollowing,
        selectedFriends: form.values.selectedFriends,
        creationSteps: creationSteps,
        handlePoolCreate: handlePoolCreate,
        errMsg: errorMsg,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
