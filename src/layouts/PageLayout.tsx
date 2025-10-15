import { ScrollArea, Stack } from '@mantine/core';
import { ReactNode } from 'react';

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea mah="vh" pos="relative">
      {children}
    </ScrollArea>
  );
};
