import { useState } from 'react';
import { ActionIcon, Button, Card, Group, Stack, Text } from '@mantine/core';
import { X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useSnapshotVote } from '../hooks/useSnapshotVote';

const DISMISSED_KEY = 'beamr-vote-s5-dismissed';

export const SnapshotVoteBanner = () => {
  const { address } = useAccount();
  const { vote, isVoting, hasVoted, error } = useSnapshotVote(address);
  const [dismissed, setDismissed] = useState(
    () =>
      typeof window !== 'undefined' &&
      localStorage.getItem(DISMISSED_KEY) === 'true',
  );

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  if (dismissed || hasVoted) return null;

  return (
    <Card
      mb="md"
      style={{
        background: 'rgba(14, 22, 38, 0.9)',
        border: '1px solid rgba(99, 179, 255, 0.18)',
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group gap="sm" align="flex-start" wrap="nowrap" style={{ flex: 1 }}>
          <Text fz="xl" style={{ lineHeight: 1 }}>
            🗳️
          </Text>
          <Stack gap={2}>
            <Text fw={600} fz="sm">
              Vote for Beamr
            </Text>
            <Text fz="xs" c="dimmed">
              Season 5 $SUP Rewards
            </Text>
          </Stack>
        </Group>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={handleDismiss}
        >
          <X size={14} />
        </ActionIcon>
      </Group>

      {error && (
        <Text fz="xs" c="red.4" mt="xs">
          {error}
        </Text>
      )}

      <Button
        mt="md"
        fullWidth
        variant="secondary"
        onClick={vote}
        loading={isVoting}
      >
        Vote 100% for Beamr
      </Button>
    </Card>
  );
};
