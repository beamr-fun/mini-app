import sdk from '@farcaster/miniapp-sdk';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { Address } from 'viem';

import { useAccount } from 'wagmi';
import { AuthResponse } from '../types/sharedTypes';

//
type UserContextType = {
  address: Address | undefined;
};

export const UserContext = createContext<UserContextType>({
  address: undefined,
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

  const res = await fetch('http://localhost:3000/v1/user/auth', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  console.log('res', res);

  if (!res.ok || res.status !== 200) {
    console.error('Failed to authenticate user');
    return;
  }

  const data = (await res.json()) as AuthResponse;

  return data;
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { address } = useAccount();
  const {
    data: authRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', address],
    queryFn: () => login(address as Address),
    enabled: !!address,
  });

  // TOMORROW, set up Apollo and subscribe utilities.
  // Set up typegen from graphql schema

  // useEffect(() => {
  //   let socket: IOSocket;

  //   const handlePoolLoad = (poolResponse: PoolResponse) => {
  //     setPool(poolResponse.pool || null);
  //     setIncomingBeams(poolResponse.incomingBeams || null);
  //     setOutgoingBeams(poolResponse.outgoingBeams || null);
  //     setErrors(
  //       poolResponse.errors
  //         ? (prevErrors) =>
  //             prevErrors
  //               ? [...prevErrors, ...(poolResponse.errors || [])]
  //               : prevErrors
  //         : null
  //     );
  //     setIsLoading(false);
  //     console.log('Beampool Request Complete ☄️ ☄️ ☄️');
  //     sdk.actions.ready();
  //   };

  //   const handleLoadSocket = async () => {
  //     setIsLoading(true);

  //     const [isMiniApp, tokenRes, context] = await Promise.all([
  //       sdk.isInMiniApp(),
  //       sdk.quickAuth.getToken(),
  //       sdk.context,
  //     ]);

  //     if (!isMiniApp) {
  //       console.error('Not running in a mini app context');
  //       setIsLoading(false);
  //       // TODO: Handle this case appropriately, maybe redirect or show a message
  //       return;
  //     }

  //     const token = tokenRes?.token || null;

  //     if (!token) {
  //       // TODO: Handle error
  //       setIsLoading(false);
  //       console.error('No token provided for socket connection');
  //       return;
  //     }

  //     if (!context?.user) {
  //       // TODO: Handle error
  //       setIsLoading(false);
  //       console.error('No user context found for socket connection');
  //       return;
  //     }

  //     socket = io(SOCKET_URL, {
  //       reconnection: true,
  //       auth: {
  //         token,
  //       },
  //       reconnectionAttempts: 7,
  //       reconnectionDelay: 1000,
  //       reconnectionDelayMax: 180_000,
  //       randomizationFactor: 0.5,
  //       autoConnect: true,
  //       transports: ['websocket'],
  //     });

  //     /// Socket connection listeners //////
  //     socket.on('connect', () => {
  //       console.log('Socket Connected 🛜');
  //     });
  //     socket.on('disconnect', (reason) => {
  //       setIsSocketConnected(false);
  //       console.log('🛸 Disconnected:', reason);
  //     });

  //     //// User authentication listeners ////
  //     socket.on(IOEvent.UserAuthSuccess, ({ user }: { user: User }) => {
  //       console.log('User Authed! 🔒');
  //       setIsSocketConnected(true);
  //       sdk.actions.ready();
  //       setUser(user);
  //     });

  //     socket.on(IOEvent.UserAuthError, (error) => {
  //       console.error('User auth error:', error);
  //       setIsLoading(false);
  //       setErrors((prevErrors) =>
  //         prevErrors ? [...prevErrors, error.error || 'Auth error'] : prevErrors
  //       );
  //     });

  //     //// Pool load listeners ////

  //     socket.on(IOEvent.PoolLoad, (poolResponse) => {
  //       handlePoolLoad(poolResponse);
  //     });

  //     socket.on(IOEvent.WalletConnectError, (error) => {
  //       console.error('Wallet connection error:', error);
  //       setIsLoading(false);
  //       setErrors((prevErrors) =>
  //         prevErrors
  //           ? [...prevErrors, error.error || 'Wallet connection error']
  //           : prevErrors
  //       );
  //     });

  //     setSocket(socket);
  //   };

  //   handleLoadSocket();

  //   return () => {
  //     socket?.disconnect?.();
  //     setSocket(undefined);
  //     setIsLoading(false);
  //     setIsSocketConnected(false);
  //     socket?.off?.(IOEvent.PoolLoad); // Remove specific listener
  //   };
  // }, []);

  return (
    <UserContext.Provider
      value={{
        address,
        // user,
        // isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
