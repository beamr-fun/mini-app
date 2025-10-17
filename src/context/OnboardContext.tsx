import React, { ReactNode } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { Follower } from '@neynar/nodejs-sdk/build/api';
import { ADDR } from '../const/addresses';
import { usePublicClient, useReadContract, useWalletClient } from 'wagmi';
import { Address, erc20Abi, isAddress, parseEther, parseEventLogs } from 'viem';
import { useUser } from '../hooks/useUser';
import { CreationStage } from '../utils/api';
import z from 'zod';
import { BeamRABI } from '../abi/BeamR';
import { GDAForwarderAbi } from '../abi/GDAFowarder';

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
  const cached = sessionStorage.getItem(`userFollowing_${fid}`);

  if (cached) {
    console.log('cached', JSON.parse(cached));
    return JSON.parse(cached) as Follower[];
  }

  const res = await fetch(`http://localhost:3000/v1/user/following/${fid}/all`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Failed to fetch user following');
  }

  const following = data.following.flat() as Follower[];

  const withPrimaryAddresses = following.filter(
    (f) => f.user.verified_addresses.primary.eth_address
  );

  sessionStorage.setItem(
    `userFollowing_${fid}`,
    JSON.stringify(withPrimaryAddresses)
  );

  return withPrimaryAddresses;
};

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
      const schema = z.object({
        creatorAddress: z
          .string()
          .refine(isAddress, { message: 'Invalid creator address' }),
        tokenAddress: z
          .string()
          .refine(isAddress, { message: 'Invalid token address' }),
        fid: z.number().int().positive(),
        displayName: z.string().min(1, { message: 'Display name is required' }),
        flowRate: z.string(),
        seedAddresses: z.array(
          z.string().refine(isAddress, { message: 'Invalid creator address' })
        ),
      });

      const flowRate =
        parseEther(form.values.budget.toString()) / 30n / 24n / 60n / 60n; // budget per month to flow rate per second

      const validated = schema.safeParse({
        creatorAddress: form.values.preferredAddress,
        tokenAddress: ADDR.SUPER_TOKEN,
        fid: user.fid,
        displayName: user.display_name || user.username,
        flowRate: flowRate.toString(),
        seedAddresses: form.values.selectedFriends,
      });

      if (!validated.success) {
        throw new Error(`Invalid form data: ${validated.error.message}`);
      }

      setCreationStage(CreationStage.CreatingPool);

      const apiHeaders = await getAuthHeaders();

      if (!apiHeaders) {
        throw new Error('Failed to get auth headers');
      }

      const res = await fetch('http://localhost:3000/v1/pool/createPool', {
        method: 'POST',
        body: JSON.stringify(validated.data),
        headers: apiHeaders,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || 'Failed to create pool');
      }

      const json = await res.json();

      if (!json.hash) {
        console.error('No transaction hash in response', json);
        return;
      }

      if (!walletClient || !publicClient) {
        throw new Error('Wallet client or public client not available');
      }

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: json.hash,
      });
      if (receipt.status !== 'success') {
        console.error('Transaction failed', receipt);
        return;
      }

      const decoded = parseEventLogs({
        abi: BeamRABI,
        logs: receipt.logs,
      });

      const poolAddress = decoded.find((log) => log.eventName === 'PoolCreated')
        ?.args.pool;

      if (!poolAddress) {
        throw new Error('PoolCreated event not found in transaction logs');
      }

      const hash = await walletClient.writeContract({
        abi: GDAForwarderAbi,
        address: ADDR.GDA_FORWARDER,
        functionName: 'distributeFlow',
        args: [ADDR.SUPER_TOKEN, address, poolAddress, flowRate, '0x'],
      });

      const distReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      if (distReceipt.status !== 'success') {
        console.error('Distribute flow transaction failed', distReceipt);
        return;
      }

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
