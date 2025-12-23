import { Box, Flex, Group, ScrollArea } from '@mantine/core';
import { Header } from '../components/Header';
import classes from '../styles/layout.module.css';
import { Nav } from './Nav';
import { CTAProvider } from '../context/CTAContext';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location?.pathname]);

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
          viewportRef={viewportRef}
          // key={pathname} // Reset scroll position on route change
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
