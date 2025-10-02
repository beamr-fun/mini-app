import { Box, BoxComponentProps } from '@mantine/core';
import { ReactNode } from 'react';

export const Tag = (props: BoxComponentProps & { children: ReactNode }) => {
  return (
    <Box
      {...props}
      bg={'var(--mantine-color-gray-8)'}
      px={6}
      py={4}
      fz={10}
      color={'var(--mantine-color-gray-0)'}
      style={{ borderRadius: 6 }}
    >
      {props.children}
    </Box>
  );
};
