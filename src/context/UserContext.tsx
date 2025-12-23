import sdk from '@farcaster/miniapp-sdk';
import { JWTPayload } from '../types/sharedTypes';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Address } from 'viem';

import { useAccount, useConnect } from 'wagmi';
import { AuthResponse } from '../types/sharedTypes';
import { APIHeaders } from '../utils/api';
import {
  LoggedInUserDocument,
  LoggedInUserSubscription,
} from '../generated/graphql';
import { keys, network } from '../utils/setup';
import { useToken } from '../hooks/useToken';
import { ADDR } from '../const/addresses';
import { useGqlSub } from '../hooks/useGqlSub';
import { User } from '@neynar/nodejs-sdk/build/api';
import { userProfileTransform, UserTransformed } from '../transforms/user';

let wakeupCalls = 0;

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
  refetchUserTokenData?: () => Promise<void>;
  hasPool: boolean;
  incomingOnly: boolean;
  setIncomingOnly: (only: boolean) => void;
  isLoadingSub: boolean;
  userSubError: Error | null;
  isLoadingAPI: boolean;
  apiError: Error | null;
  refetchLogin: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  hasPool: false,
  incomingOnly: false,
  setIncomingOnly: (only: boolean) => {},
  refetchUserTokenData: async () => {},
  isLoadingSub: false,
  userSubError: null,
  isLoadingAPI: false,
  apiError: null,
  getAuthHeaders: async () => false,
  refetchLogin: async () => {},
});

const login = async (wakeup: () => void) => {
  try {
    console.log('LOADING PROCESS: START');

    const timerStart = Date.now();

    const tokenRes = await sdk.quickAuth.getToken();

    console.log('LOADING PROCESS: TOKEN');

    const token = tokenRes?.token || null;

    if (!token) {
      throw new Error('No auth token available');
    }

    console.log('LOADING PROCESS: API REQUEST');

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

    console.log('LOADING PROCESS: API RESPONSE');

    const timerStop = Date.now();

    const duration = timerStop - timerStart;

    console.log(`LOADING PROCESS: DURATION ${duration}ms`);

    if (duration > 4000) {
      console.log('DURATION EXCEEDED THRESHOLD, WAKE UP CALLS: ', wakeupCalls);
      if (wakeupCalls < 1) {
        wakeupCalls++;
        console.log('LOADING PROCESS: INVOKING WAKEUP');
        wakeup();
      }
    }

    if (!data.success) {
      console.error('Authentication failed', data);
      throw new Error('Authentication unsuccessful');
    }

    return {
      user: data.user,
      jwt: data.jwtPayload,
      token: token || undefined,
    };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const IS_TESTING = false;
  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  const [startingRoute, setStartingRoute] = useState<string | undefined>();
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [incomingOnly, setIncomingOnly] = useState<boolean>(false);

  const { data: beamrTokenData, refetch: refetchUserTokenData } = useToken({
    userAddress: address,
    tokenAddress: ADDR.SUPER_TOKEN,
    calls: { balanceOf: true },
    enabled: !!address,
  });

  const userBalance = beamrTokenData?.balanceOf as bigint | undefined;
  const userBalanceFetchedAt = beamrTokenData?.fetchedAt;

  const {
    data: apiData,
    isLoading: isLoadingAPI,
    error: apiError,
    refetch: refetchLogin,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: () => login(() => connect({ connector: connectors[0] })),
    enabled: !!address,
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
    const { data: newData, isError } = await refetchLogin();

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
      // variables: { id: '11244-8453' },
      variables: { id: `${apiData?.user?.fid.toString()}-${network.id}` || '' },
      enabled: !!apiData?.user?.fid && !IS_TESTING,
      transform: async (data) => {
        if (!userSubscription) {
          console.log('LOADING PROCESS: SUBSCRIBER RESPONSE');
        }
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

    console.log('LOADING PROCESS: DATA TRANSFORMED');

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
    console.log('LOADING COMPLETE: SDK READY');
  }, [
    isLoadingSub,
    userSubscription,
    apiData,
    apiError,
    userSubError,
    address,
  ]);

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
        refetchUserTokenData:
          refetchUserTokenData as any as () => Promise<void>,
        incomingOnly,
        setIncomingOnly,
        isLoadingSub,
        apiError,
        isLoadingAPI,
        userSubError,
        refetchLogin: refetchLogin as any as () => Promise<void>,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
