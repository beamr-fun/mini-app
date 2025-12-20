import React, { useEffect, useMemo } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Group,
  Loader,
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
  ChevronUp,
  Heart,
  MessageSquareReply,
  RefreshCcw,
  Users,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import { fetchUserPrefs, updatePoolPrefs, Weightings } from '../utils/api';
import { notifications } from '@mantine/notifications';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { flowratePerSecondToMonth } from '../utils/common';

export const Settings = () => {
  const { colors } = useMantineTheme();

  const { user, getAuthHeaders, userSubscription, isLoadingSub } = useUser();
  const [loadingPrefs, setLoadingPrefs] = React.useState(false);

  const {
    data: userPrefs,
    isLoading: isLoadingPrefs,
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

  const pools = useMemo(() => {
    if (!userPrefs || !userSubscription) {
      return null;
    }

    if (!userPrefs.pools?.length || !userSubscription?.pools.length) {
      return [];
    }

    return userSubscription.pools.map((pool) => {
      const prefs = userPrefs.pools.find(
        (p) => p.poolAddress.toLowerCase() === pool.id.toLowerCase()
      );

      if (!prefs) return null;

      return {
        id: pool.id,
        creatorAddress: prefs.creatorAddress,
        weightings: prefs.weightings,
        name: pool.metadata.name,
        lastUpdated: prefs.updatedAt,
        poolAddress: prefs.poolAddress,
        flowRate: pool.flowRate,
      };
    });
  }, [userPrefs, userSubscription]);

  const handleUpdatePrefs = async (
    poolAddress: string,
    weightings: Weightings
  ) => {
    try {
      setLoadingPrefs(true);

      const headers = await getAuthHeaders();

      if (!headers) {
        return;
      }

      const res = await updatePoolPrefs({
        poolAddress,
        weightings,
        headers,
      });

      if (!res) {
        throw new Error('Failed to update pool preferences');
      }
    } catch (error) {
      console.error('Failed to update pool preferences', error);

      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to update pool preferences',
      });
    } finally {
      setLoadingPrefs(false);
    }
  };

  if (isLoadingPrefs || isLoadingSub) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (pools === null || error) {
    return <ErrorDisplay title="No Pools Found" description="" />;
  }
  return (
    <Stack>
      <Box>
        <Text fw={600} mb="md">
          Your Pools
        </Text>
        {pools && pools.length > 0 ? (
          <Stack gap="md">
            {pools.map((pool) => {
              if (!pool) return null;
              return (
                <PoolCard
                  key={pool.id}
                  {...pool}
                  updatePrefs={handleUpdatePrefs}
                  loadingUpdate={loadingPrefs}
                />
              );
            })}
          </Stack>
        ) : (
          <Card>
            <Flex
              justify={'center'}
              align={'center'}
              h={100}
              direction={'column'}
            >
              <Text size="xl" mb="md">
                No Streams
              </Text>
              <Text c={colors.gray[2]}>
                No Beams at all for this contract.{' '}
              </Text>
            </Flex>
          </Card>
        )}
      </Box>
    </Stack>
  );
};

const PoolCard = ({
  flowRate,
  lastUpdated,
  name,
  weightings,
  updatePrefs,
  poolAddress,
  loadingUpdate,
}: {
  id: string;
  creatorAddress: string;
  weightings: {
    recast: string;
    like: string;
    comment: string;
    follow: string;
  };
  name: string;
  lastUpdated: string;
  poolAddress: string;
  flowRate: string;
  updatePrefs: (poolAddress: string, weightings: Weightings) => Promise<void>;
  loadingUpdate?: boolean;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [weightingState, setWeightingState] =
    React.useState<Weightings>(weightings);

  const handleChangeWeighting = (
    weightType: keyof Weightings,
    value: string
  ) => {
    setWeightingState((prev) => ({
      ...prev,
      [weightType]: value,
    }));
  };

  const hasDiff =
    weightingState.like === weightings.like &&
    weightingState.recast === weightings.recast &&
    weightingState.comment === weightings.comment &&
    weightingState.follow === weightings.follow;

  return (
    <Card>
      <Group justify="space-between" mb={4}>
        <Text fw={500}>{name}</Text>
        <Tag bg={colors.blue[9]} c={colors.blue[3]} w="fit-content">
          Tipping Pool
        </Tag>
      </Group>
      <Text c={colors.gray[3]} fz="sm" mb="md">
        Last Updated: {new Date(lastUpdated).toLocaleDateString()}
      </Text>
      <Group justify="space-between" mb="lg">
        <Group gap="xs">
          <Avatar src={beamrTokenLogo} size={24} />
          <Text fw={500}>{flowratePerSecondToMonth(BigInt(flowRate))}</Text>
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
          <TextInput
            leftSection={<Heart size={20} color={colors.red[7]} />}
            value={weightingState.like}
            onChange={(e) => handleChangeWeighting('like', e.target.value)}
          />
          <TextInput
            leftSection={<RefreshCcw size={20} color={colors.green[7]} />}
            value={weightingState.recast}
            onChange={(e) => handleChangeWeighting('recast', e.target.value)}
          />
          <TextInput
            leftSection={<Users size={20} color={colors.purple[7]} />}
            value={weightingState.follow}
            onChange={(e) => handleChangeWeighting('follow', e.target.value)}
          />
          <TextInput
            leftSection={
              <MessageSquareReply size={20} color={colors.yellow[7]} />
            }
            value={weightingState.comment}
            onChange={(e) => handleChangeWeighting('comment', e.target.value)}
          />
        </Stack>
        <Button
          size="xs"
          mb={'sm'}
          disabled={hasDiff}
          onClick={() => updatePrefs(poolAddress, weightingState)}
          loading={loadingUpdate}
        >
          Save
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
  );
};
