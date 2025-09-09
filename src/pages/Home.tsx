import { Box, Text, Title } from '@mantine/core';

export const Home = () => {
  return (
    <Box>
      <Text mb="sm" c="dim">
        Welcome!
      </Text>
      <Text mb={'lg'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae
        felis ac leo elementum ultrices nec ut ex.
      </Text>
      <Text>
        Duis porta libero et velit imperdiet, vulputate viverra enim feugiat. In
        nec tempor diam. Donec a maximus enim. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        Praesent sed magna at magna placerat mattis.
      </Text>
    </Box>
  );
};
