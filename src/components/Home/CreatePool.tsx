import { Box, Button, Stack } from '@mantine/core';
import { useState } from 'react';

enum Status {
  Idle,
  Initializing,
  Creating,
  Success,
  Error,
}

export const CreatePool = () => {
  const [status] = useState<Status>(Status.Idle);

  const isLoading =
    status === Status.Initializing || status === Status.Creating;

  const handleCreatePool = async () => {};

  return (
    <Stack w="100%" h="100%" justify="space-between">
      <Box h="400px" bg="dark.6">
        Explainer
      </Box>
      <Button
        mt="lg"
        size="lg"
        w="100%"
        variant="default"
        loading={isLoading}
        disabled={isLoading}
        onClick={handleCreatePool}
      >
        Create Pool
      </Button>
    </Stack>
  );
};
