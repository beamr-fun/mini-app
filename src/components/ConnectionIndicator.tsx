import { Box } from '@mantine/core';

export const ConnectionIndicator = () => (
  <Box
    pos="absolute"
    bg={'red'}
    h={8}
    style={{ borderRadius: '16px' }}
    w={8}
    top={1}
    right={2}
  />
);
