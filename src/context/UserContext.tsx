import { createContext, ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Address } from 'viem';

import { useAccount } from 'wagmi';
import { SOCKET_URL } from '../utils/setup';

type UserContextType = {
  isSocketConnected: boolean;
  isWalletConnected: boolean;
  address?: Address;
  socket?: Socket;
};

export const UserContext = createContext<UserContextType>({
  isSocketConnected: false,
  isWalletConnected: false,
  address: undefined,
  socket: undefined,
});

export const UserProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { address } = useAccount();
  const [socket, setSocket] = useState<Socket | undefined>();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(socket);
    setIsSocketConnected(true);

    () => {
      if (socket) {
        console.log('Disconnecting socket...');
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!address || !socket) return;

    socket.emit('wallet:connected', { address });

    socket.on('wallet:connected', (data) => {
      setIsWalletConnected(true);
      console.log('Wallet connected:', data);
    });

    socket.on('wallet:disconnected', (data) => {});
  }, [address, socket]);

  return (
    <UserContext.Provider
      value={{ address, socket, isSocketConnected, isWalletConnected }}
    >
      {children}
    </UserContext.Provider>
  );
};
