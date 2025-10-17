import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { Follower } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { usePublicClient, useReadContract, useWalletClient } from 'wagmi';
import { Address, erc20Abi, isAddress, parseEther, parseEventLogs } from 'viem';
import { useUser } from '../hooks/useUser';
import { createPool, CreationStage, fetchUserFollowing } from '../utils/api';
import z from 'zod';
import { BeamRABI } from '../abi/BeamR';
import { GDAForwarderAbi } from '../abi/GDAFowarder';
import { distributeFlow } from '../utils/interactions';

type OnboardFormValues = {
  budget: number;
  preferredAddress: string;
  selectedFriends: string[];
};

type OnboardContextType = {
  budget: number;
  preferredAddress: string;
  selectedFriends?: string[];
  creationStage?: CreationStage;
  form?: UseFormReturnType<OnboardFormValues>;
  balance?: bigint;
  following?: Follower[];
  poolId?: Address;
  error?: string;
  handlePoolCreate?: () => Promise<void>;
};

export const OnboardContext = React.createContext<OnboardContextType>({
  budget: 0,
  preferredAddress: '',
});

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [creationStage, setCreationStage] = React.useState<CreationStage>();
  const [createError, setCreateError] = React.useState<string | undefined>();
  const [poolId, setPoolId] = React.useState<Address | undefined>();
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
          // updateStage
        },
        onError(errorMsg) {
          console.error('Error in createPool:', errorMsg);
        },
        apiHeaders,
        publicClient,
        args: {
          creatorAddress: address,
          tokenAddress: ADDR.SUPER_TOKEN,
          fid: user.fid,
          displayName: user.display_name || 'Unnamed',
          flowRate: flowRate.toString(),
          seedAddresses: form.values.selectedFriends,
        },
      });

      await distributeFlow({
        onError(errMsg) {
          throw new Error(errMsg);
        },
        onSuccess() {
          // nothing
        },
        args: {
          poolAddress: poolAddress as Address,
          user: address as Address,
          flowRate: flowRate,
        },
        walletClient,
        publicClient,
      });

      console.log('Distribution transaction successful', distReceipt);

      const completePoolData = {
        poolAddress: poolAddress,
        creatorAddress: validated.data.creatorAddress,
        fid: validated.data.fid,
      };

      const completePoolSchema = z.object({
        poolAddress: z
          .string()
          .refine(isAddress, {
            message: 'Invalid pool address',
          })
          .transform((val) => val as Address),
        creatorAddress: z
          .string()
          .refine(isAddress, {
            message: 'Invalid creator address',
          })
          .transform((val) => val as Address),

        fid: z.number().int().positive(),
      });

      const validated2 = completePoolSchema.safeParse(completePoolData);

      if (!validated2.success) {
        throw new Error(`Invalid pool data: ${validated2.error.message}`);
      }

      const newApiHeaders = await getAuthHeaders();

      const finalRes = await fetch(
        'http://localhost:3000/v1/pool/completePool',
        {
          method: 'POST',
          body: JSON.stringify(validated2.data),
          headers: newApiHeaders || {},
        }
      );

      if (!finalRes.ok) {
        const data = await finalRes.json();
        throw new Error(data?.error || 'Failed to complete pool creation');
      }
    } catch (error) {
      console.error('Error creating pool', error);
      setCreationStage(CreationStage.Error);
      if (error instanceof Error) {
        setCreateError(error.message);
      } else {
        setCreateError('Unknown error');
      }
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
        creationStage,
        handlePoolCreate: handlePoolCreate,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};
