import { Box } from '@mantine/core';

export const ConnectionIndicator = () => (
  <Box
    pos="absolute"
    bg={'red'}
    h={6}
    style={{ borderRadius: '16px' }}
    w={6}
    top={1}
    right={2}
  />
);
