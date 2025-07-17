import '@mantine/core/styles.css';
import { Flex, Group, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { Login } from './components/Login';
import { ClientRoutes } from './Routes';

import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from './utils/setup';
import { useAccount } from 'wagmi';
import { useUser } from './hooks/useUser';

export default function App() {
  const { isSocketConnected } = useUser();

  useEffect(() => {
    sdk.actions.ready();

    // setTimeout(() => {
    //   sdk.actions.addMiniApp();
    // }, 2000);
  }, []);

  // const updateShares = async () => {
  //   try {
  //     if (!isAddress(addressStr)) {
  //       alert('Please provide a valid address');
  //       return;
  //     }

  //     if (!amount || isNaN(amount) || amount <= 0) {
  //       alert('Please provide a valid amount');
  //       return;
  //     }

  //     const response = await fetch(
  //       `http://localhost:3000/send/${addressStr}/${amount}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();

  //     console.log('Response data:', data);

  //     client.setQueryData(['members'], () => data.members);
  //   } catch (error) {
  //     console.error('Error updating shares:', error);
  //   }
  // };

  return (
    <MantineProvider theme={theme}>
      <Group justify="end">
        <Login />
      </Group>
      <Flex h="90vh" justify="center" align="center" p="md">
        <ClientRoutes />
      </Flex>
    </MantineProvider>
  );
}
