import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Flex, Group } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ClientRoutes } from './Routes';
import { Header } from './components/Header';

export default function App() {
  return (
    <Layout>
      <Notifications />
      <Group justify="center">
        <Header />
      </Group>
      <Flex justify="center" align="center">
        <ClientRoutes />
      </Flex>
    </Layout>
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
