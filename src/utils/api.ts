import { Follower, User } from '@neynar/nodejs-sdk/build/api';
import { Address, isAddress, parseEventLogs } from 'viem';
import z from 'zod';
import { BeamRABI } from '../abi/BeamR';
import { isTestnet, keys } from './setup';
import { cacheProfiles, getCachedProfiles } from './cache';
import {
  QuoteRequestParams,
  quoteRequestSchema,
  quoteResponseSchema,
} from '../validation/swap';
import { beamReceiptsSchema } from '../validation/receipts';

export type APIHeaders = {
  'Content-Type': string;
  authorization: string;
};

export type Weightings = {
  recast: string;
  like: string;
  comment: string;
  follow: string;
};

type PoolPrefs = {
  poolAddress: string;
  creatorAddress: string;
  createdAt: string;
  updatedAt: string;
  weightings: Weightings;
};

export type UserPrefs = {
  fid: number;
  preferredAddress: string;
  pools: PoolPrefs[];
};

export const fetchUserPrefs = async (fid: number, apiHeaders: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/prefs/${fid}`, {
      headers: apiHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${res.status}: Failed to fetch user preferences`);
    }

    if (!data.prefs) {
      throw new Error('No preferences found for user');
    }

    return data.prefs as UserPrefs;
  } catch (error) {
    throw Error;
  }
};

export const fetchBesties = async (fid: number, apiHeaders: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/besties/${fid}`, {
      headers: apiHeaders,
    });

    const data = await res.json();

    console.log('data', data);

    if (!res.ok) {
      throw new Error(data?.error || 'Failed to fetch besties');
    }

    return data.besties as User[];
  } catch (error) {
    throw Error;
  }
};

export const fetchProfiles = async (fids: string[], apiHeaders: APIHeaders) => {
  try {
    if (!fids || !Array.isArray(fids)) throw new Error('Invalid FIDs');
    const uniqueFids = [...new Set(fids)];
    if (uniqueFids.length === 0) return [];

    const { found, missing } = await getCachedProfiles(uniqueFids);

    if (missing.length === 0) {
      return found;
    }

    const res = await fetch(
      `${keys.apiUrl}/v1/user/profiles?fids=${missing.join(',')}`,
      {
        method: 'GET',
        headers: apiHeaders,
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || 'Failed to fetch profiles');
    }

    const fetchedUsers = data.users as User[];

    await cacheProfiles(fetchedUsers);

    return [...found, ...fetchedUsers];
  } catch (error) {
    throw Error;
  }
};

export const fetchUserFollowing = async (
  fid: number,
  apiHeaders: APIHeaders
) => {
  try {
    const cached = sessionStorage.getItem(`userFollowing_${fid}`);

    if (cached) {
      return JSON.parse(cached) as Follower[];
    }

    const res = await fetch(`${keys.apiUrl}/v1/user/following/${fid}/all`, {
      headers: apiHeaders,
    });
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
  } catch (error) {
    throw Error;
  }
};

export const fetchIsUserSubbed = async (apiHeaders: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/hook`, {
      headers: apiHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Failed to check subscription status');
    }

    return data;
  } catch (error) {
    throw Error;
  }
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
      throw new Error('No transaction hash returned from pool creation');
    }

    if (typeof publicClient?.waitForTransactionReceipt !== 'function') {
      throw new Error('Wallet client or public client not available');
    }

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: json.hash,
    });

    if (receipt.status !== 'success') {
      throw new Error('Transaction failed');
    }

    const decoded = parseEventLogs({
      abi: BeamRABI,
      logs: receipt.logs,
    }) as any;

    const poolAddress = decoded.find(
      (log: any) => log.eventName === 'PoolCreated'
    )?.args.pool;

    if (!poolAddress) {
      throw new Error('PoolCreated event not found in transaction logs');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    onSuccess(poolAddress as string);

    return poolAddress as string;
  } catch (error) {
    onError((error as Error).message);
    throw Error;
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

    onSuccess();

    return true;
  } catch (error) {
    onError((error as Error).message);
    throw Error;
  }
};

export const updatePoolPrefs = async ({
  poolAddress,
  weightings,
  headers,
}: {
  poolAddress: string;
  weightings: Weightings;
  headers: APIHeaders;
}) => {
  try {
    if (!isAddress(poolAddress)) {
      throw new Error('Invalid pool address');
    }

    const res = await fetch(`${keys.apiUrl}/v1/pool/pool-prefs`, {
      method: 'PUT',
      body: JSON.stringify({ poolAddress, weightings }),
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Failed to update pool preferences');
    }

    const data = await res.json();

    if (!data?.success && typeof data.success !== 'boolean') {
      throw new Error('Invalid response from server');
    }

    return data.success as boolean;
  } catch (error) {
    throw Error;
  }
};

export const deleteUserSub = async (apiHeaders: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/hook`, {
      method: 'DELETE',
      headers: apiHeaders,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Failed to delete user subscription');
    }

    return data;
  } catch (error) {
    throw Error;
  }
};

export const getQuote = async (params: QuoteRequestParams) => {
  if (isTestnet) {
    console.warn(
      'getQuote is not available on testnet, returning values for base mainnet'
    );
  }

  const isValidParams = quoteRequestSchema.safeParse(params);

  if (!isValidParams.success) {
    throw new Error(`Invalid quote parameters: ${isValidParams.error.message}`);
  }

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const res = await fetch(`${keys.apiUrl}/v1/swap/quote?${queryParams}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Failed to fetch quote');
    }

    const validQuote = quoteResponseSchema.safeParse(data);

    if (!validQuote.success) {
      throw new Error(`Invalid quote response: ${validQuote.error.message}`);
    }

    return validQuote.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw Error;
  }
};

export const fetchActivePool = async (headers: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/pool/active-pool`, {
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Failed to fetch active pool');
    }

    const data = await res.json();

    if (!data?.poolAddress || !isAddress(data.poolAddress)) {
      return null;
    }

    return data?.poolAddress as Address;
  } catch (error) {
    console.error('Error fetching active pool', error);
    throw Error;
  }
};

export const fetchIsConnected = async (headers: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/user-connected`, {
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Failed to fetch active pool');
    }

    const data = await res.json();

    return data?.isConnected;
  } catch (error) {
    console.error('Error fetching active pool', error);
    throw Error;
  }
};

export const connectToPool = async (headers: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/connect-user`, {
      method: 'POST',
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Failed to connect to pool');
    }

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error('Error connecting to pool', error);
    throw Error;
  }
};

export const getTipLimit = async (headers: APIHeaders) => {
  const res = await fetch(`${keys.apiUrl}/v1/user/tip-limit`, {
    method: 'POST',
    headers,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.error || 'Failed to fetch tip limit');
  }

  const data = await res.json();

  const parsed = z
    .object({
      limited: z.boolean(),
      limit: z.number(),
      remaining: z.number(),
      resetsAt: z.string(),
      resetsInSeconds: z.number(),
    })
    .safeParse(data);

  if (!parsed.success) {
    throw new Error(`Invalid tip limit response: ${parsed.error.message}`);
  }

  return parsed.data;
};

export const getUserSubs = async (headers: APIHeaders) => {
  try {
    const res = await fetch(`${keys.apiUrl}/v1/user/receipts`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Failed to fetch recent subs');
    }

    const data = await res.json();

    const validated = beamReceiptsSchema.safeParse(data.receipts);

    if (!validated.success) {
      throw new Error(`Invalid receipts data: ${validated.error.message}`);
    }

    return validated.data;
  } catch (error) {
    console.error('Error fetching recent subs', error);
    throw Error;
  }
};
