import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Address } from 'viem';

import { useAccount } from 'wagmi';
import { SOCKET_URL } from '../utils/setup';
import {
  Beam,
  ClientToServerEvents,
  IOEvent,
  Pool,
  PoolResponse,
} from '../types/sharedTypes';

import { ServerToClientEvents } from '../types/sharedTypes';
import sdk from '@farcaster/miniapp-sdk';
import { User } from '@neynar/nodejs-sdk/build/api';

type UserContextType = {
  isSocketConnected: boolean;
  address?: Address;
  user: User | null;
  pool: Pool | null;
  incomingBeams: Beam[] | null;
  outgoingBeams: Beam[] | null;
  hasPool: boolean;
  isLoading: boolean;
  userErrors: string[] | null;
  socket?: Socket;
};

type IOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const UserContext = createContext<UserContextType>({
  pool: null,
  user: null,
  incomingBeams: null,
  outgoingBeams: null,
  isLoading: false,
  userErrors: null,
  hasPool: false,
  isSocketConnected: false,
  address: undefined,
  socket: undefined,
});

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { address } = useAccount();

  const [socket, setSocket] = useState<IOSocket | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pool, setPool] = useState<Pool | null>(null);
  const [incomingBeams, setIncomingBeams] = useState<Beam[] | null>(null);
  const [outgoingBeams, setOutgoingBeams] = useState<Beam[] | null>(null);
  const [userErrors, setErrors] = useState<string[] | null>([]);

  const hasPool = !!user && !isLoading && !!pool;

  useEffect(() => {
    let socket: IOSocket;

    const handlePoolLoad = (poolResponse: PoolResponse) => {
      setPool(poolResponse.pool || null);
      setIncomingBeams(poolResponse.incomingBeams || null);
      setOutgoingBeams(poolResponse.outgoingBeams || null);
      setErrors(
        poolResponse.errors
          ? (prevErrors) =>
              prevErrors
                ? [...prevErrors, ...(poolResponse.errors || [])]
                : prevErrors
          : null
      );
      setIsLoading(false);
      console.log('Beampool Request Complete ☄️ ☄️ ☄️');
      sdk.actions.ready();
    };

    const handleLoadSocket = async () => {
      setIsLoading(true);

      const [isMiniApp, tokenRes, context] = await Promise.all([
        sdk.isInMiniApp(),
        sdk.quickAuth.getToken(),
        sdk.context,
      ]);

      if (!isMiniApp) {
        console.error('Not running in a mini app context');
        setIsLoading(false);
        // TODO: Handle this case appropriately, maybe redirect or show a message
        return;
      }

      const token = tokenRes?.token || null;

      if (!token) {
        // TODO: Handle error
        setIsLoading(false);
        console.error('No token provided for socket connection');
        return;
      }

      if (!context?.user) {
        // TODO: Handle error
        setIsLoading(false);
        console.error('No user context found for socket connection');
        return;
      }

      socket = io(SOCKET_URL, {
        reconnection: true,
        auth: {
          token,
        },
        reconnectionAttempts: 7,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 180_000,
        randomizationFactor: 0.5,
        autoConnect: true,
        transports: ['websocket'],
      });

      /// Socket connection listeners //////
      socket.on('connect', () => {
        console.log('Socket Connected 🛜');
      });
      socket.on('disconnect', (reason) => {
        setIsSocketConnected(false);
        console.log('🛸 Disconnected:', reason);
      });

      //// User authentication listeners ////
      socket.on(IOEvent.UserAuthSuccess, ({ user }: { user: User }) => {
        console.log('User Authed! 🔒');
        setIsSocketConnected(true);
        sdk.actions.ready();
        setUser(user);
      });

      socket.on(IOEvent.UserAuthError, (error) => {
        console.error('User auth error:', error);
        setIsLoading(false);
        setErrors((prevErrors) =>
          prevErrors ? [...prevErrors, error.error || 'Auth error'] : prevErrors
        );
      });

      //// Pool load listeners ////

      socket.on(IOEvent.PoolLoad, (poolResponse) => {
        handlePoolLoad(poolResponse);
      });

      socket.on(IOEvent.WalletConnectError, (error) => {
        console.error('Wallet connection error:', error);
        setIsLoading(false);
        setErrors((prevErrors) =>
          prevErrors
            ? [...prevErrors, error.error || 'Wallet connection error']
            : prevErrors
        );
      });

      setSocket(socket);
    };

    handleLoadSocket();

    return () => {
      socket?.disconnect?.();
      setSocket(undefined);
      setIsLoading(false);
      setIsSocketConnected(false);
      socket?.off?.(IOEvent.PoolLoad); // Remove specific listener
    };
  }, []);

  useEffect(() => {
    if (!address || !socket || !isSocketConnected || !user) return;

    socket.emit(IOEvent.WalletConnected, { address });

    return () => {
      setPool(null);
      setIncomingBeams(null);
      setOutgoingBeams(null);
      setErrors([]);
    };
  }, [address, socket, isSocketConnected, user]);

  return (
    <UserContext.Provider
      value={{
        address,
        user,
        socket,
        isLoading,
        isSocketConnected,
        pool,
        incomingBeams,
        outgoingBeams,
        hasPool,
        userErrors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
