import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { Follower } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { usePublicClient, useReadContract, useWalletClient } from 'wagmi';
import { Address, erc20Abi, formatUnits, isAddress, parseEther } from 'viem';
import { useUser } from '../hooks/useUser';
import { CreationStage } from '../utils/api';
import z from 'zod';

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

const fetchUserFollowing = async (fid: number) => {
  const res = await fetch(`http://localhost:3000/v1/user/following/${fid}/all`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Failed to fetch user following');
  }

  return data.following.flat() as Follower[];
};

export const OnboardDataProvider = ({ children }: { children: ReactNode }) => {
  const [creationStage, setCreationStage] = React.useState<CreationStage>();
  const [createError, setCreateError] = React.useState<string | undefined>();
  const [poolId, setPoolId] = React.useState<Address | undefined>();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const { user } = useUser();
  const { address } = useUser();
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

    const schema = z.object({
      creatorAddress: z
        .string()
        .refine(isAddress, { message: 'Invalid creator address' })
        .transform((val) => val as Address),
      tokenAddress: z
        .string()
        .refine(isAddress, { message: 'Invalid token address' })
        .transform((val) => val as Address),
      fid: z.number().int().positive(),
      displayName: z.string().min(1, { message: 'Display name is required' }),
      flowRate: z.string(),
      selectedFriends: z.array(z.number().int().positive()),
    });

    console.log('form values', form.values);

    const flowRate =
      parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

    console.log('flowRate', flowRate.toString());

    const validated = schema.safeParse({
      creatorAddress: form.values.preferredAddress,
      tokenAddress: ADDR.SUPER_TOKEN,
      fid: user.fid,
      displayName: user.display_name || user.username,
      flowRate: flowRate.toString(),
      selectedFriends: form.values.selectedFriends,
    });

    if (!validated.success) {
      throw new Error(`Invalid form data: ${validated.error.message}`);
    }

    try {
      setCreationStage(CreationStage.CreatingPool);

      //   const res = await fetch('http://localhost:3000/v1/pool/createPool', {
      //     method: 'POST',
      //     body: JSON.stringify(validated.data),
      //   });

      //   if (!walletClient) throw new Error('No wallet client');

      //   setCreationStage(CreationStage.RequestingTx);

      //   // const receipt =  walletClient.writeContract({})
      //   setCreationStage(CreationStage.ValidatingTx);
      //   // await publicClient.waitForTransactionReceipt({ hash });
      //   setCreationStage(CreationStage.Completed);

      // const t
    } catch (error) {
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
