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

type UserSub = LoggedInUserSubscription['User_by_pk'];

type UserContextType = {
  user?: User;
  address?: Address;
  jwtPayload?: JWTPayload;
  userSubscription?: UserSub;
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

  const {
    data: userSubRes,
    isLoading: isLoadingSub,
    error: userSubError,
  } = useGqlSub<LoggedInUserSubscription>(LoggedInUserDocument, {
    variables: { id: apiData?.user?.fid?.toString() || '' },
    enabled: !!apiData?.user?.fid && !IS_TESTING,
  });

  const userSubscription = useMemo(() => {
    if (!userSubRes) {
      return undefined;
    }

    if (!userSubRes.User_by_pk) {
      return undefined;
    }

    return userSubRes.User_by_pk;
  }, [userSubRes]);

  console.log('userSubscription', userSubscription);

  useEffect(() => {
    if (startingRoute) return;
    if (!apiData) return;

    if (isLoadingSub) return;

    if (!userSubscription) {
      setHasPool(false);
      setStartingRoute('/global');
    } else {
      if (userSubscription.pools.length > 0) {
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

  const getAuthHeaders = async () => {
    if (!apiData || !apiData?.user || !apiData?.jwt || !apiData?.token) {
      await refetch();

      if (!apiData || !apiData?.jwt || !apiData?.user || !apiData?.token) {
        return false;
      }
      return {
        'Content-Type': 'application/json',
        authorization: `Bearer ${apiData.token}`,
      };
    }

    if (apiData.jwt.exp * 1000 < Date.now()) {
      await refetch();

      if (!apiData || !apiData?.jwt || !apiData?.user || !apiData?.token) {
        return false;
      }
      return {
        'Content-Type': 'application/json',
        authorization: `Bearer ${apiData.token}`,
      };
    }

    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${apiData.token}`,
    };
  };

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
