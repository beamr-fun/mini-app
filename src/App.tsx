import { Flex, Group, ScrollArea } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ClientRoutes } from './Routes';
import { Header } from './components/Header';

export default function App() {
  return (
    <Layout>
      <ClientRoutes />
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
        <Notifications />
        <Group justify="center">
          <Header />
        </Group>
        {children}
      </Flex>
    </ScrollArea>
  );
};
