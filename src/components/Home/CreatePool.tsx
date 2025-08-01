import { Box, Button, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

enum Status {
  Idle,
  Initializing,
  Creating,
  Success,
  Error,
}

export const CreatePool = () => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [error, setError] = useState<string | null>(null);
  const [poolAddress, setPoolAddress] = useState<string | null>(null);

  const isLoading =
    status === Status.Initializing || status === Status.Creating;

  const handleCreatePool = async () => {
    try {
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.message || 'Failed to create pool',
        color: 'red',
      });
    }
  };

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
      >
        Create Pool
      </Button>
    </Stack>
  );
};
