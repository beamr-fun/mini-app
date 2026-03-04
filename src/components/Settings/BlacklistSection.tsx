import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { getBlacklist, removeFromBlacklist } from '../../utils/api';
import { ErrorDisplay } from '../ErrorDisplay';

export const BlacklistSection = () => {
  const { colors } = useMantineTheme();
  const { user, getAuthHeaders } = useUser();
  const queryClient = useQueryClient();
  const [removingFid, setRemovingFid] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['blacklist', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      if (!headers) throw new Error('Failed to get headers');
      return getBlacklist(headers, true);
    },
    enabled: !!user?.fid,
  });

  const handleRemove = async (fid: number) => {
    if (!user?.fid) return;
    setRemovingFid(fid);
    try {
      const headers = await getAuthHeaders();
      if (!headers) throw new Error('Failed to get headers');
      await removeFromBlacklist({ fid: user.fid, blacklistFids: [fid], headers });
      queryClient.invalidateQueries({ queryKey: ['blacklist', user.fid] });
    } catch {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to remove from blacklist',
      });
    } finally {
      setRemovingFid(null);
    }
  };

  if (isLoading) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (error) {
    return <ErrorDisplay title="Failed to load blacklist" description="" />;
  }

  const profiles = data?.profiles ?? [];

  return (
    <Card>
      <Text fz="lg" fw={500} mb="xs">
        Blocked Users
      </Text>
      <Text c={colors.gray[4]} fz="sm" mb="md">
        Blocked users cannot receive beams from you.
      </Text>

      {profiles.length === 0 ? (
        <Text c={colors.gray[5]} fz="sm">
          No blocked users.
        </Text>
      ) : (
        <Stack gap="xs">
          <Group wrap="wrap" gap="xs">
            {profiles.map((profile) => (
              <Group
                key={profile.fid}
                gap={6}
                px={10}
                py={5}
                style={{
                  background: 'var(--glass-pane)',
                  border: '1px solid var(--glass-edge)',
                  borderRadius: 'var(--mantine-radius-xl)',
                }}
              >
                <Avatar src={profile.pfp_url} size={20} radius="xl" />
                <Text fz="sm">@{profile.username}</Text>
                <ActionIcon
                  size={16}
                  variant="transparent"
                  color={colors.gray[5]}
                  loading={removingFid === profile.fid}
                  onClick={() => handleRemove(profile.fid)}
                >
                  <X size={12} />
                </ActionIcon>
              </Group>
            ))}
          </Group>
        </Stack>
      )}
    </Card>
  );
};
