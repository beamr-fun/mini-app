import React, { useEffect, useMemo, useState } from 'react';
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
  NumberInput,
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
import {
  deleteUserSub,
  fetchIsUserSubbed,
  fetchUserPrefs,
  updatePoolPrefs,
  Weightings,
} from '../utils/api';
import { notifications } from '@mantine/notifications';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { flowratePerSecondToMonth } from '../utils/common';
import { Address, formatUnits, parseEther } from 'viem';
import { distributeFlow } from '../utils/interactions';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

export const Settings = () => {
  const { colors } = useMantineTheme();

  const { user, getAuthHeaders, userSubscription, isLoadingSub } = useUser();
  const [loadingPrefs, setLoadingPrefs] = React.useState(false);

  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const {
    data: userPrefs,
    isLoading: isLoadingPrefs,
    error,
    refetch,
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

    return userSubscription.pools
      .map((pool) => {
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
      })
      .filter((pool) => pool !== null) as {
      id: string;
      creatorAddress: string;
      weightings: Weightings;
      name: string;
      lastUpdated: string;
      poolAddress: string;
      flowRate: string;
    }[];
  }, [userPrefs, userSubscription]);

  const handleUpdatePrefs = async (
    poolAddress: string,
    weightings: Weightings
  ) => {
    try {
      if (!user || !address || !walletClient) {
        throw new Error('User address or client not found');
      }

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

      await refetch();
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

  const handleDistributeFlow = async (poolAddress: string, monthly: string) => {
    try {
      if (!address || !walletClient || !publicClient) {
        throw new Error('Missing required parameters for flow distribution');
      }

      if (!pools) {
        throw new Error('No pools available for flow distribution');
      }

      const headers = await getAuthHeaders();

      if (!headers) {
        throw new Error('Failed to get auth headers');
      }

      setLoadingPrefs(true);
      const flowRate = parseEther(monthly) / 30n / 24n / 60n / 60n;

      const allOtherPools = pools.filter(
        (pool) => pool.poolAddress !== poolAddress
      );

      const noOtherPoolWithFlow = allOtherPools.every(
        (pool) => BigInt(pool.flowRate) === 0n
      );

      await distributeFlow({
        enableZeroFlowRate: true,
        onError(errorMsg) {
          throw new Error('Error in flow distribution call');
        },
        onSuccess() {
          setTimeout(() => {
            setLoadingPrefs(false);

            notifications.show({
              color: 'green',
              title: 'Success',
              message: 'Flow distribution updated successfully',
            });
            if (noOtherPoolWithFlow && BigInt(flowRate) === 0n) {
              deleteUserSub(headers);
            }
          }, 2000);
        },
        args: {
          poolAddress: poolAddress as Address,
          flowRate: flowRate,
          user: address as Address,
        },

        publicClient,
        walletClient,
      });
    } catch (error) {
      console.error('Failed to distribute flow', error);

      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Failed to distribute flow',
      });
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
                  handleDistributeFlow={handleDistributeFlow}
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
  handleDistributeFlow,
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
  handleDistributeFlow: (poolAddress: string, monthly: string) => Promise<void>;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [weightingState, setWeightingState] =
    React.useState<Weightings>(weightings);
  const [monthly, setMonthly] = useState<string>(
    flowratePerSecondToMonth(BigInt(flowRate), 'rounded')
  );

  const existingMonthly = flowratePerSecondToMonth(BigInt(flowRate), 'rounded');

  const handleChangeWeighting = (
    weightType: keyof Weightings,
    value: string
  ) => {
    setWeightingState((prev) => ({
      ...prev,
      [weightType]: value,
    }));
  };

  const prefsDiff =
    weightingState.like === weightings.like &&
    weightingState.recast === weightings.recast &&
    weightingState.comment === weightings.comment &&
    weightingState.follow === weightings.follow;

  const monthlyDiff = monthly === existingMonthly;

  const isZero = monthly === '0';

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
          <NumberInput
            label="Monthly Budget"
            thousandSeparator
            valueIsNumericString
            leftSectionWidth={45}
            leftSection={<Avatar src={beamrTokenLogo} size={24} />}
            description={'Amount streaming per month'}
            value={monthly}
            onChange={(val) => setMonthly(val.toString())}
            disabled={loadingUpdate}
          />

          <Text fw={500}></Text>
        </Group>
        <Group gap="xs">
          <Button
            size="xs"
            disabled={monthlyDiff || loadingUpdate}
            onClick={() => handleDistributeFlow(poolAddress, monthly)}
            loading={loadingUpdate}
          >
            Adjust Flow
          </Button>
          <Button
            size="xs"
            variant="danger"
            disabled={isZero}
            onClick={() => {
              setMonthly('0');
            }}
          >
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
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('like', e.target.value)}
          />
          <TextInput
            leftSection={<RefreshCcw size={20} color={colors.green[7]} />}
            value={weightingState.recast}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('recast', e.target.value)}
          />
          <TextInput
            leftSection={<Users size={20} color={colors.purple[7]} />}
            value={weightingState.follow}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('follow', e.target.value)}
          />
          <TextInput
            leftSection={
              <MessageSquareReply size={20} color={colors.yellow[7]} />
            }
            disabled={loadingUpdate}
            value={weightingState.comment}
            onChange={(e) => handleChangeWeighting('comment', e.target.value)}
          />
        </Stack>
        <Button
          size="xs"
          mb={'sm'}
          disabled={prefsDiff || loadingUpdate}
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
