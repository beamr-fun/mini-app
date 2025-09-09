import { Flex, Group, ScrollArea } from '@mantine/core';
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
    <ScrollArea>
      <Flex
        direction="column"
        style={{ height: '100vh' }}
        px="32"
        py="12"
        maw="393px"
      >
        {children}
      </Flex>
    </ScrollArea>
  );
};
