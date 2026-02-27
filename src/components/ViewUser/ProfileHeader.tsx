import { Avatar, Group, Stack, Text, Tooltip } from '@mantine/core';

export const ProfileHeader = ({
  displayName,
  username,
  pfpUrl,
  onAvatarClick,
}: {
  displayName: string;
  username?: string;
  pfpUrl?: string | null;
  onAvatarClick: () => void;
}) => {
  return (
    <Group justify="center" mb="xl">
      <Stack align="center" gap={8}>
        <Tooltip label="View Farcaster Profile">
          <Avatar
            src={pfpUrl}
            alt={displayName}
            size={80}
            radius="xl"
            onClick={onAvatarClick}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
        <Stack gap={0} align="center">
          <Text fw={600}>{displayName}</Text>
          {username && displayName !== username && (
            <Text c="dimmed" fz="sm">
              @{username}
            </Text>
          )}
        </Stack>
      </Stack>
    </Group>
  );
};
