import '@mantine/core/styles.css';
import { Box, Flex, Group, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { Header } from './components/Header';
import { ClientRoutes } from './Routes';

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Group justify="center">
          <Header />
        </Group>
        <Flex justify="center" align="center">
          <ClientRoutes />
        </Flex>
      </Layout>
    </MantineProvider>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      direction="column"
      style={{ height: '100vh' }}
      px="md"
      py="xs"
      maw="393px"
      bg="dark.8"
    >
      {children}
    </Flex>
  );
};
