import { Box, Flex, Group, ScrollArea } from '@mantine/core';
import { Header } from '../components/Header';
import classes from '../styles/layout.module.css';
import { Nav } from './Nav';
import { CTAProvider } from '../context/CTAContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CTAProvider>
      <Flex
        direction="column"
        style={{ height: '100vh' }}
        className={classes.appBackground}
      >
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="beamr-gradient" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="var(--mantine-color-blue-5)" />
              <stop offset="100%" stopColor="var(--mantine-color-blue-7)" />
            </linearGradient>
          </defs>
        </svg>

        <ScrollArea
          id="main-scroll"
          classNames={{ root: classes.scrollArea, thumb: classes.scrollThumb }}
        >
          <Box className={classes.contentBox}>
            <Header />
            {children}
          </Box>
        </ScrollArea>
        <Nav />
      </Flex>
    </CTAProvider>
  );
};
