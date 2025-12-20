import React, { useEffect } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { Tag } from '../components/Tag';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { useDisclosure } from '@mantine/hooks';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Heart,
  MessageSquareReply,
  RefreshCcw,
  Speech,
  Users,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { completePool, fetchUserPrefs } from '../utils/api';
import { notifications } from '@mantine/notifications';

export const Settings = () => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const { user, getAuthHeaders, userSubscription } = useUser();

  const {
    data: userPrefs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-prefs', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: 'Failed to get headers',
        });

        return;
      }

      return fetchUserPrefs(user!.fid, headers);
    },
    enabled: !!user?.fid,
  });

  console.log('userPrefs', userPrefs);

  return (
    <PageLayout title="Settings">
      <Stack>
        <Box>
          <Text fw={600} mb="md">
            Your Pools
          </Text>
          <Card>
            <Group justify="space-between">
              <Text>Jord's Tipping Pool</Text>
              <Tag bg={colors.blue[9]} c={colors.blue[3]} w="fit-content">
                Tipping Pool
              </Tag>
            </Group>
            <Text c={colors.gray[3]} fz="sm" mb="md">
              Created Oct 28th
            </Text>
            <Group justify="space-between" mb="lg">
              <Group gap="xs">
                <Avatar src={beamrTokenLogo} size={24} />
                <Text fw={500}>300/mo</Text>
              </Group>
              <Group gap="xs">
                <Button size="xs">Adjust Flow</Button>
                <Button size="xs" variant="secondary">
                  Stop
                </Button>
              </Group>
            </Group>

            <Collapse in={opened}>
              <Text mb={10} c={colors.gray[3]}>
                Shares Per Action
              </Text>
              <Stack gap="sm" mb="md">
                <Group gap="sm">
                  <Heart size={20} color={colors.red[7]} />
                  <Text>5</Text>
                </Group>
                <Group gap="sm">
                  <RefreshCcw size={20} color={colors.green[7]} />
                  <Text>10</Text>
                </Group>
                <Group gap="sm">
                  <Users size={20} color={colors.purple[7]} />
                  <Text>15</Text>
                </Group>
                <Group gap="sm">
                  <MessageSquareReply size={20} color={colors.blue[5]} />
                  <Text>25</Text>
                </Group>
              </Stack>
              <Button size="xs" variant="secondary" mb={'sm'}>
                Edit Preferences
              </Button>
            </Collapse>
            <Group gap={4}>
              <Text c={colors.gray[3]} fz="sm">
                Prefs
              </Text>

              <ActionIcon size="xs" onClick={toggle}>
                {opened ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </ActionIcon>
            </Group>
          </Card>
        </Box>
      </Stack>
    </PageLayout>
  );
};
