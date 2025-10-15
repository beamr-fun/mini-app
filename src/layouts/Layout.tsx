import { Flex, Group, ScrollArea } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from '../components/Header';
import { Nav } from './Nav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
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
      {/* <Nav /> */}
    </Flex>
  );
};
