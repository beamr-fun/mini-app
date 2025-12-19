import sdk from '@farcaster/miniapp-sdk';
import { JWTPayload } from '../types/sharedTypes';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { Address } from 'viem';

import { useAccount } from 'wagmi';
import { AuthResponse } from '../types/sharedTypes';
import { APIHeaders } from '../utils/api';
import {
  LoggedInUserDocument,
  LoggedInUserSubscription,
} from '../generated/graphql';
import { keys } from '../utils/setup';
import { useToken } from '../hooks/useToken';
import { ADDR } from '../const/addresses';
import { useGqlSub } from '../hooks/useGqlSub';
import { User } from '@neynar/nodejs-sdk/build/api';
import { userProfileTransform, UserTransformed } from '../transforms/user';

type UserSub = LoggedInUserSubscription['User_by_pk'];

type UserContextType = {
  user?: User;
  address?: Address;
  jwtPayload?: JWTPayload;
  userSubscription?: UserTransformed | null;
  token?: string;
  getAuthHeaders: () => Promise<APIHeaders | false>;
  startingRoute?: string;
  userBalance?: bigint;
  userBalanceFetchedAt?: Date;
  hasPool: boolean;
  incomingOnly: boolean;
  isLoadingSub: boolean;
  userSubError: Error | null;
  isLoadingAPI: boolean;
  apiError: Error | null;
};

export const UserContext = createContext<UserContextType>({
  hasPool: false,
  incomingOnly: false,
  isLoadingSub: false,
  userSubError: null,
  isLoadingAPI: false,
  apiError: null,
  getAuthHeaders: async () => false,
});

const login = async () => {
  const [tokenRes, context] = await Promise.all([
    sdk.quickAuth.getToken(),
    sdk.context,
  ]);

  const token = tokenRes?.token || null;

  if (!token) {
    throw new Error('No auth token available');
  }

  const res = await fetch(`${keys.apiUrl}/v1/user/auth`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok || res.status !== 200) {
    console.error('Failed to authenticate user', await res.text());
    throw new Error('Failed to authenticate user');
  }

  const data = (await res.json()) as AuthResponse;

  if (!data.success) {
    console.error('Authentication failed', data);
    throw new Error('Authentication unsuccessful');
  }

  return {
    user: data.user,
    jwt: data.jwtPayload,
    context,
    token: token || undefined,
  };
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const IS_TESTING = false;
  const { address } = useAccount();

  const [startingRoute, setStartingRoute] = useState<string | undefined>();
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [incomingOnly, setIncomingOnly] = useState<boolean>(false);

  const { data } = useToken({
    userAddress: address,
    tokenAddress: ADDR.SUPER_TOKEN,
    calls: { balanceOf: true },
  });

  const userBalance = data?.balanceOf as bigint | undefined;
  const userBalanceFetchedAt = data?.fetchedAt;

  const {
    data: apiData,
    isLoading: isLoadingAPI,
    error: apiError,
    refetch,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: () => login(),
    enabled: !!address && !IS_TESTING,
  });

  const getAuthHeaders = async (): Promise<APIHeaders | false> => {
    const BUFFER = 10 * 1000; // 6 seconds buffer
    // Helper to validate a given data object
    const isValid = (data: typeof apiData) => {
      return (
        data &&
        data.user &&
        data.jwt &&
        data.token &&
        data.jwt.exp * 1000 > Date.now() + BUFFER // Check expiry
      );
    };

    // CURRENT state (captured in closure)
    if (isValid(apiData)) {
      return {
        'Content-Type': 'application/json',
        authorization: `Bearer ${apiData!.token}`,
      };
    }

    // If invalid or expired, force a refresh
    // This gives us the FRESH data immediately.
    const { data: newData, isError } = await refetch();

    // 4. Validate the NEW data
    if (isError || !isValid(newData)) {
      return false;
    }

    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${newData!.token}`,
    };
  };

  const {
    data: userSubscription,
    isLoading: isLoadingSub,
    error: userSubError,
  } = useGqlSub<LoggedInUserSubscription, UserTransformed | null>(
    LoggedInUserDocument,
    {
      variables: { id: apiData?.user?.fid.toString() || '' },
      enabled: !!apiData?.user?.fid && !IS_TESTING,
      transform: async (data) => {
        return userProfileTransform(data, getAuthHeaders);
      },
    }
  );

  useEffect(() => {
    if (startingRoute) return;
    if (userSubError || apiError) {
      setHasPool(false);
      setStartingRoute('/global');
      sdk.actions.ready();
      return;
    }
    if (isLoadingSub || !apiData) return;

    const currentSub = userSubscription;

    if (!currentSub) {
      setHasPool(false);
      setStartingRoute('/global');
    } else {
      if (currentSub.pools.length > 0) {
        setHasPool(true);
        setStartingRoute('/home');
      } else {
        setHasPool(false);
        setIncomingOnly(true);
        setStartingRoute('/global');
      }
    }

    sdk.actions.ready();
  }, [isLoadingSub, userSubscription, apiData]);

  return (
    <UserContext.Provider
      value={{
        address,
        user: apiData?.user,
        jwtPayload: apiData?.jwt,
        token: apiData?.token,
        getAuthHeaders,
        startingRoute,
        userSubscription,
        userBalance,
        userBalanceFetchedAt,
        hasPool,
        incomingOnly,
        isLoadingSub,
        apiError,
        isLoadingAPI,
        userSubError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
