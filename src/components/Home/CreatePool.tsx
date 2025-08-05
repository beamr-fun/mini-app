import { Box, Button, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { IOEvent } from '../../types/sharedTypes';

enum Status {
  Idle,
  Initializing,
  Creating,
  Success,
  Error,
}

export const CreatePool = () => {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const { socket } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [poolAddress, setPoolAddress] = useState<string | null>(null);

  const isLoading =
    status === Status.Initializing || status === Status.Creating;

  useEffect(() => {
    if (!socket) return;
    socket.on(IOEvent.PoolCreate, (poolResponse) => {});

    return () => {
      socket.off(IOEvent.PoolCreate);
    };
  }, []);

  const handleCreatePool = async () => {
    if (status !== Status.Idle) return;

    setStatus(Status.Initializing);

    if (!socket) {
      setError('Socket is not connected');
      setStatus(Status.Error);
      return;
    }

    socket.emit(IOEvent.PoolInit);
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
        onClick={handleCreatePool}
      >
        Create Pool
      </Button>
    </Stack>
  );
};
