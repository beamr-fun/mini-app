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

type UserContextType = {
  isSocketConnected: boolean;
  address?: Address;
  pool: Pool | null;
  incomingBeams: Beam[] | null;
  outgoingBeams: Beam[] | null;
  hasPool: boolean;
  isPoolLoading: boolean;
  poolLoadErrors: string[] | null;
  socket?: Socket;
};

type IOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const UserContext = createContext<UserContextType>({
  pool: null,
  incomingBeams: null,
  outgoingBeams: null,
  isPoolLoading: false,
  poolLoadErrors: null,
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
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [pool, setPool] = useState<Pool | null>(null);
  const [hasPool, setHasPool] = useState(false);
  const [incomingBeams, setIncomingBeams] = useState<Beam[] | null>(null);
  const [outgoingBeams, setOutgoingBeams] = useState<Beam[] | null>(null);
  const [isPoolLoading, setIsPoolLoading] = useState(false);
  const [poolLoadErrors, setPoolLoadErrors] = useState<string[] | null>([]);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      SOCKET_URL,
      {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true,
        transports: ['websocket'],
      }
    );

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    setSocket(socket);
    setIsSocketConnected(true);

    return () => {
      socket.disconnect();
      setSocket(undefined);
      setIsSocketConnected(false);
    };
  }, []);

  useEffect(() => {
    const handlePoolLoad = (poolResponse: PoolResponse) => {
      setPool(poolResponse.pool || null);
      setHasPool(!!poolResponse.hasPool);
      setIsPoolLoading(!!poolResponse.isLoading);
      setIncomingBeams(poolResponse.incomingBeams || null);
      setOutgoingBeams(poolResponse.outgoingBeams || null);
      setPoolLoadErrors(poolResponse.errors || null);
    };

    if (!address || !socket) return;

    socket.emit(IOEvent.WalletConnected, { address });

    socket.on(IOEvent.PoolLoad, (poolResponse) => {
      handlePoolLoad(poolResponse);
    });

    socket.on(IOEvent.WalletConnectError, (error) => {
      console.error('Wallet connection error:', error);
      setPoolLoadErrors([error.error]);
    });

    return () => {
      socket.off(IOEvent.PoolLoad, handlePoolLoad); // Remove specific listener
      // Clear state when address changes
      setPool(null);
      setIncomingBeams(null);
      setOutgoingBeams(null);
      setIsPoolLoading(false);
      setPoolLoadErrors([]);
    };
  }, [address, socket]);

  return (
    <UserContext.Provider
      value={{
        address,
        socket,
        isSocketConnected,
        pool,
        incomingBeams,
        outgoingBeams,
        hasPool,
        isPoolLoading,
        poolLoadErrors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
