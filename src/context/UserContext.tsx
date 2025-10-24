import sdk from '@farcaster/miniapp-sdk';
import { JWTPayload } from '../types/sharedTypes';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Address } from 'viem';
import { createClient } from 'graphql-ws';
import { print } from 'graphql';

import { useAccount } from 'wagmi';
import { AuthResponse, FCUser } from '../types/sharedTypes';
import { APIHeaders } from '../utils/api';
import {
  LoggedInUserDocument,
  LoggedInUserSubscription,
} from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

type UserSub = LoggedInUserSubscription['User_by_pk'];
//
type UserContextType = {
  user?: FCUser;
  address?: Address;
  jwtPayload?: JWTPayload;
  userSubscription?: UserSub;
  token?: string;
  getAuthHeaders: () => Promise<APIHeaders | false>;
  startingRoute?: string;
};

export const UserContext = createContext<UserContextType>({
  getAuthHeaders: async () => false,
});

const wsClient = createClient({
  url: 'ws://localhost:8080/v1/graphql',
});

const login = async (clientAddress: Address) => {
  const [isMiniApp, tokenRes, context] = await Promise.all([
    sdk.isInMiniApp(),
    sdk.quickAuth.getToken(),
    sdk.context,
  ]);

  if (!isMiniApp) {
    console.error('Not running in a mini app context');
    // TODO: Handle this case appropriately, maybe redirect or show a message
    return;
  }

  const token = tokenRes?.token || null;

  if (!token) {
    console.error('No token provided for socket connection');
  }

  const res = await fetch('https://beamr.ngrok.app/v1/user/auth', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok || res.status !== 200) {
    console.error('Failed to authenticate user');
    return;
  }

  const data = (await res.json()) as AuthResponse;

  if (!data.success) {
    console.error('Authentication failed:', data);
    return;
  }

  return {
    user: data.user,
    jwt: data.jwtPayload,
    isMiniApp,
    context,
    token: token || undefined,
  };
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { address } = useAccount();

  const [hasLoadedSubscription, setHasLoadedSubscription] = useState(false);
  const [userSubscription, setUserSubscription] = useState<
    LoggedInUserSubscription['User_by_pk'] | undefined
  >(undefined);
  const [startingRoute, setStartingRoute] = useState<string | undefined>();

  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: () => login(address as Address),
    enabled: !!address,
  });

  useEffect(() => {
    let dispose: () => void = () => {};

    const getUserSubscription = async () => {
      const context = await sdk.context;

      const fid = context?.user?.fid;

      if (!fid) {
        return;
      }

      dispose = wsClient.subscribe<LoggedInUserSubscription>(
        {
          query: print(LoggedInUserDocument),
          variables: { id: fid.toString() },
        },
        {
          next: (data) => {
            console.log('data', data);
            const userSub = data?.data?.User_by_pk;
            setHasLoadedSubscription(true);

            if (userSub) {
              setUserSubscription(userSub);
            }
          },
          error: console.error,
          complete: () => {},
        }
      );
    };

    getUserSubscription();

    return () => dispose();
  }, []);

  useEffect(() => {
    if (startingRoute) return;

    console.log('apiData', apiData);
    console.log('hasLoadedSubscription', hasLoadedSubscription);

    if (hasLoadedSubscription && apiData) {
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

        // user,
        // isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
