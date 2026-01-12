import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Check, Loader, X } from 'lucide-react';
import { ErrorDisplay } from '../ErrorDisplay';
import { notifications } from '@mantine/notifications';
import { connectToPool } from '../../utils/api';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';

export const WebhookConnection = ({
  isConnected,
  activePoolAddress,
  isLoadingPrefs,
  prefsError,
}: {
  isLoadingPrefs: boolean;
  prefsError: Error | null;
  isConnected: boolean;
  activePoolAddress?: string;
}) => {
  const { colors } = useMantineTheme();
  const { getAuthHeaders } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoadingPrefs) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (prefsError) {
    return <ErrorDisplay title="No Pools Found" description="" />;
  }

  const handleConnectToWebhook = async () => {
    try {
      setIsLoading(true);
      const headers = await getAuthHeaders();

      if (!headers) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: 'Failed to get headers',
        });
        return;
      }

      const res = await connectToPool(headers);
      if (!res) {
        throw new Error('Unknown error');
      }

      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'Connected to webhook successfully',
      });
    } catch (error) {
      console.error('Failed to connect to webhook', error);

      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to connect to webhook',
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper>
      <Text fz="lg" fw={500} mb="sm">
        Microsub Activated
      </Text>
      <Text c={colors.gray[3]} mb="md">
        This connection allows Neynar to respond to your interactions and
        allocate pool shares accordingly.
      </Text>

      <Stack gap="sm" mb="lg">
        {isConnected ? (
          <Group gap={'xs'}>
            <Check color={colors.green[7]} size={16} />
            <Text>Webhook Connected</Text>
          </Group>
        ) : (
          <Group gap={'xs'}>
            <X color={colors.red[7]} size={16} />
            <Text>Webhook Not Connected</Text>
          </Group>
        )}
        {activePoolAddress ? (
          <Group gap={'xs'}>
            <Check color={colors.green[7]} size={16} />
            <Text>Active Pool</Text>
          </Group>
        ) : (
          <Group gap={'xs'}>
            <X color={colors.red[7]} size={16} />
            <Text>No Active Pool</Text>
          </Group>
        )}
        {activePoolAddress ? (
          <Group gap={'xs'}>
            <Check color={colors.green[7]} size={16} />
            <Text>Distribution Open</Text>
          </Group>
        ) : (
          <Group gap={'xs'}>
            <X color={colors.red[7]} size={16} />
            <Text>No Open Distribution</Text>
          </Group>
        )}
      </Stack>
      {isConnected && (
        <Button loading={isLoading} onClick={handleConnectToWebhook}>
          Connect to Webhook
        </Button>
      )}
    </Paper>
  );
};
