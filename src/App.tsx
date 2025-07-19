import '@mantine/core/styles.css';
import { Flex, Group, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { Login } from './components/Login';
import { ClientRoutes } from './Routes';

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

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
