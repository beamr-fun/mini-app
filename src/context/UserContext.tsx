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
//
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
};

export const UserContext = createContext<UserContextType>({
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

  const [hasLoadedSubscription, setHasLoadedSubscription] = useState(false);
  // const [userSubscription, setUserSubscription] = useState<
  //   LoggedInUserSubscription['User_by_pk'] | undefined
  // >(undefined);
  const [startingRoute, setStartingRoute] = useState<string | undefined>();

  const { data } = useToken({
    userAddress: address,
    tokenAddress: ADDR.SUPER_TOKEN,
    calls: { balanceOf: true },
  });

  const userBalance = data?.balanceOf as bigint | undefined;
  const userBalanceFetchedAt = data?.fetchedAt;

  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: () => login(),
    enabled: !!address && !IS_TESTING,
  });

  const { data: userSubRes } = useGqlSub<LoggedInUserSubscription>(
    LoggedInUserDocument,
    {
      variables: { id: apiData?.user?.fid?.toString() || '' },
      enabled: !!apiData?.user?.fid && !IS_TESTING,
    }
  );

  const userSubscription = useMemo(() => {
    if (!userSubRes) {
      return undefined;
    }

    if (!userSubRes.User_by_pk) {
      return undefined;
    }

    const onlyMostRecentOutgoing = userSubRes.User_by_pk?.outgoing.filter(
      (outgoing) =>
        outgoing.beamPool?.id === '0x33A49b63639cE3aF37941bdb02B13023E0468BaF'
    );

    return { ...userSubRes.User_by_pk, outgoing: onlyMostRecentOutgoing };
  }, [userSubRes]);

  // useEffect(() => {
  //   if (IS_TESTING) {
  //     return;
  //   }

  //   let dispose: () => void = () => {};

  //   const getUserSubscription = async () => {
  //     const context = await sdk.context;

  //     const fid = context?.user?.fid;

  //     if (!fid) {
  //       return;
  //     }

  //     dispose = wsClient.subscribe<LoggedInUserSubscription>(
  //       {
  //         query: print(LoggedInUserDocument),
  //         variables: { id: fid.toString() },
  //       },
  //       {
  //         next: (data) => {
  //           const userSub = data?.data?.User_by_pk;
  //           setHasLoadedSubscription(true);

  //           if (userSub) {
  //             setUserSubscription(userSub);
  //           }
  //         },
  //         error: console.error,
  //         complete: () => {},
  //       }
  //     );
  //   };

  //   getUserSubscription();

  //   return () => dispose();
  // }, []);

  useEffect(() => {
    // if (OVERRIDE) {
    //   setStartingRoute(OVERRIDE);
    //   sdk.actions.ready();
    //   return;
    // }

    // if (IS_TESTING) {
    //   setStartingRoute('/create-pool/1');
    //   sdk.actions.ready();
    //   return;
    // }
    if (startingRoute) return;
    if (userSubscription && apiData) {
      if (!userSubscription || !userSubscription?.pools?.length) {
        console.log('No pools found for user in subscription data');
        setStartingRoute('/create-pool/1');
      } else {
        setStartingRoute('/home');
        console.log('User subscription pools:', userSubscription.pools);
      }

      sdk.actions.ready();
    }
  }, [hasLoadedSubscription, userSubscription, apiData]);

  const getAuthHeaders = async () => {
    if (!apiData || !apiData?.user || !apiData?.jwt || !apiData?.token) {
      // try to re-login
      // return login(address as Address);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
