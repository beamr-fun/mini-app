import sdk from '@farcaster/miniapp-sdk';
import { JWTPayload } from '../types/sharedTypes';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect } from 'react';
import { Address } from 'viem';
import { createClient } from 'graphql-ws';
import { print } from 'graphql';

import { useAccount } from 'wagmi';
import { AuthResponse, FCUser } from '../types/sharedTypes';
import { APIHeaders } from '../utils/api';
import { gql } from '../generated';
import { GetTxByIdDocument, GetTxByIdSubscription } from '../generated/graphql';

//
type UserContextType = {
  user?: FCUser;
  address?: Address;
  jwtPayload?: JWTPayload;
  token?: string;
  getAuthHeaders: () => Promise<APIHeaders | false>;
};

export const UserContext = createContext<UserContextType>({
  getAuthHeaders: async () => false,
});

const wsClient = createClient({
  url: 'ws://localhost:8080/v1/graphql',
});

const txs = gql(/* GraphQL */ `
  subscription Test($id: String!) {
    TX_by_pk(id: $id) {
      id
    }
  }
`);

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

  const res = await fetch('http://localhost:3000/v1/user/auth', {
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

  sdk.actions.ready();

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
    const dispose = wsClient.subscribe<GetTxByIdSubscription>(
      { query: print(GetTxByIdDocument), variables: { id: '' } },
      {
        next: (data) => {
          console.log('Subscription data:', data.data?.TX_by_pk?.id);
        },
        error: console.error,
        complete: () => {},
      }
    );
    return () => dispose();
  }, []);

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
        // user,
        // isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
