import { Follower } from '@neynar/nodejs-sdk/build/api';
import { isAddress, parseEventLogs } from 'viem';
import z from 'zod';
import { BeamRABI } from '../abi/BeamR';
import { distributeFlow } from './interactions';
import { keys } from './setup';

export type APIHeaders = {
  'Content-Type': string;
  authorization: string;
};
export const fetchUserFollowing = async (fid: number) => {
  const cached = sessionStorage.getItem(`userFollowing_${fid}`);

  if (cached) {
    console.log('cached', JSON.parse(cached));
    return JSON.parse(cached) as Follower[];
  }

  const res = await fetch(`${keys.apiUrl}/v1/user/following/${fid}/all`);
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

const createPoolSchema = z.object({
  creatorAddress: z
    .string()
    .refine(isAddress, { message: 'Invalid creator address' }),
  tokenAddress: z
    .string()
    .refine(isAddress, { message: 'Invalid token address' }),
  fid: z.number().int().positive(),
  displayName: z.string().min(1, { message: 'Display name is required' }),
  flowRate: z.string(),
  selectedFriends: z.array(
    z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'FID string must be a positive number',
    })
  ),
});

export const createPool = async ({
  args,
  onSuccess,
  onError,
  apiHeaders,
  publicClient,
}: {
  args: z.infer<typeof createPoolSchema>;
  onSuccess: (poolAddress: string) => void;
  onError: (errMsg: string) => void;
  apiHeaders: APIHeaders | false;
  publicClient: any;
}) => {
  try {
    const validated = createPoolSchema.safeParse(args);

    if (!validated.success) {
      throw new Error(`Invalid pool data: ${validated.error.message}`);
    }

    if (!apiHeaders) {
      throw new Error('Failed to get auth headers');
    }

    const res = await fetch(`${keys.apiUrl}/v1/pool/createPool`, {
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

    if (typeof publicClient?.waitForTransactionReceipt !== 'function') {
      throw new Error('Wallet client or public client not available');
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: json.hash,
    });

    if (receipt.status !== 'success') {
      console.error('Transaction failed', receipt);
      return;
    }

    // Why does the new ABI cause type issues here?

    const decoded = parseEventLogs({
      abi: BeamRABI,
      logs: receipt.logs,
    }) as any;

    console.log('decoded', decoded);

    const poolAddress = decoded.find(
      (log: any) => log.eventName === 'PoolCreated'
    )?.args.pool;

    if (!poolAddress) {
      throw new Error('PoolCreated event not found in transaction logs');
    }

    onSuccess(poolAddress);

    return poolAddress;
  } catch (error) {
    onError((error as Error).message);
    console.error('Error creating pool', error);
  }
};

const completePoolSchema = z.object({
  poolAddress: z.string().refine(isAddress, {
    message: 'Invalid pool address',
  }),
  creatorAddress: z.string().refine(isAddress, {
    message: 'Invalid creator address',
  }),
  fid: z.number().int().positive(),
});

export const completePool = async ({
  onSuccess,
  onError,
  apiHeaders,
  args,
}: {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
  apiHeaders: APIHeaders | false;
  args: z.infer<typeof completePoolSchema>;
}) => {
  try {
    const validated = completePoolSchema.safeParse(args);

    if (!apiHeaders) {
      throw new Error('Failed to get auth headers');
    }

    if (!validated.success) {
      throw new Error(`Invalid pool data: ${validated.error.cause}`);
    }

    const finalRes = await fetch(`${keys.apiUrl}/v1/pool/completePool`, {
      method: 'POST',
      body: JSON.stringify(validated.data),
      headers: apiHeaders || {},
    });

    if (!finalRes.ok) {
      const data = await finalRes.json();
      throw new Error(data?.error || 'Failed to complete pool creation');
    }

    const data = await finalRes.json();

    console.log('DATA FROM COMPLETE', data);

    onSuccess();

    return true;
  } catch (error) {
    console.error('Error completing pool', error);
    onError((error as Error).message);
  }
};
