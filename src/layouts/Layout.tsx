import { Box, Flex, Group, ScrollArea } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Header } from '../components/Header';
import classes from '../styles/layout.module.css';
import { Nav } from './Nav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      direction="column"
      style={{ height: '100vh' }}
      maw="393px"
      className={classes.appBackground}
    >
      <ScrollArea className={classes.scrollArea} id="main-scroll">
        <Box className={classes.contentBox}>
          <Notifications />
          <Header />
          {children}
        </Box>
      </ScrollArea>
      <Nav />
    </Flex>
  );
};
