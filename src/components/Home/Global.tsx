import { Box, Button, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Global = () => {
  return (
    <Stack w="100%" align="center" pos="relative">
      <Box h={150} w={300} bg="dark.6" my="md" />
      <Text fz="sm" fw="600" c="dark.2" mb="4" w="100%">
        Who's beaming who?
      </Text>
      <Box mx={'sm'} h={400} bg="dark.6" w={'100%'} mb={100} />

      <Button
        to="/create-pool"
        w="90%"
        variant="default"
        pos="fixed"
        bottom={40}
        px="sm"
        size="lg"
        component={Link}
      >
        Create Pool
      </Button>
    </Stack>
  );
};
