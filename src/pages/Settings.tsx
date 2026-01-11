import React, { useMemo, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
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
  ChevronRight,
  ChevronUp,
  Heart,
  MessageSquareReply,
  PencilIcon,
  RefreshCcw,
  Users,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../hooks/useUser';
import {
  fetchActivePool,
  fetchIsConnected,
  fetchUserPrefs,
  updatePoolPrefs,
  Weightings,
} from '../utils/api';
import { notifications } from '@mantine/notifications';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { flowratePerSecondToMonth, formatBalance } from '../utils/common';
import { Address, parseEther } from 'viem';
import { distributeFlow } from '../utils/interactions';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { MIN_POOL_AMT } from '../const/params';

export const Settings = () => {
  const { colors } = useMantineTheme();

  const {
    user,
    getAuthHeaders,
    userSubscription,
    isLoadingSub,
    collectionFlowRate,
    isLoadingCollections,
    collectionError,
    refetchCollections,
  } = useUser();
  const [loadingPrefs, setLoadingPrefs] = React.useState(false);

  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [showInactive, setShowInactive] = useState(false);
  const publicClient = usePublicClient();

  const {
    data: apiData,
    isLoading: isLoadingPrefs,
    error,
    refetch: refetchPrefs,
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

      const [userPrefs, activePoolAddress, isConnected] = await Promise.all([
        fetchUserPrefs(user!.fid, headers),
        fetchActivePool(headers),
        fetchIsConnected(headers),
      ]);

      return {
        userPrefs,
        activePoolAddress,
        isConnected,
      };
    },
    enabled: !!user?.fid,
  });

  const { userPrefs, activePoolAddress, isConnected } = apiData || {};

  const pools = useMemo(() => {
    if (!userPrefs?.pools || !userSubscription?.pools) {
      return [];
    }

    const collectionRate = collectionFlowRate || 0n;

    const subscriptionPools = userSubscription.pools;

    const totalUserFlowRate = subscriptionPools.reduce((acc, pool) => {
      return acc + BigInt(pool.flowRate || 0);
    }, 0n);

    return subscriptionPools.map((pool) => {
      const poolFlowRate = BigInt(pool.flowRate || 0);
      let reconstitutedFlowRate = poolFlowRate;
      let proportionalRate = 0n;

      if (totalUserFlowRate > 0n && collectionRate > 0n) {
        /* Calculate proportional fee: (Pool Flow * Total Fees) / Total Flow
         */
        proportionalRate =
          (poolFlowRate * BigInt(collectionRate)) / totalUserFlowRate;
        reconstitutedFlowRate = poolFlowRate + proportionalRate;
      }

      // Return the pool object combined with any UI preferences
      const prefs = userPrefs.pools.find((p) => p.poolAddress === pool.id);

      return {
        ...pool,
        ...prefs,
        proportionalRate,
        rawFlowRate: poolFlowRate, // Original flow
        reconstitutedFlowRate: reconstitutedFlowRate.toString(), // Flow + Fees
      };
    });
  }, [userPrefs, userSubscription, collectionFlowRate]);

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

      await refetchPrefs();
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

      const otherPoolFlowRates = pools
        .filter((p) => p.id !== poolAddress)
        .map((pool) => {
          return BigInt(pool.reconstitutedFlowRate || 0);
        });

      await distributeFlow({
        enableZeroFlowRate: true,
        onError(errorMsg) {
          throw new Error('Error in flow distribution call');
        },
        onSuccess() {
          setTimeout(() => {
            setLoadingPrefs(false);
            refetchPrefs();
            refetchCollections?.();
            notifications.show({
              color: 'green',
              title: 'Success',
              message: 'Flow distribution updated successfully',
            });

            // if (noOtherPoolWithFlow && BigInt(flowRate) === 0n) {
            //   deleteUserSub(headers);
            // }
          }, 2500);
        },
        args: {
          poolAddress: poolAddress as Address,
          flowRate: flowRate,
          user: address as Address,
          otherPoolFlowRates,
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

  if (isLoadingPrefs || isLoadingSub || isLoadingCollections) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (pools === null || error || collectionError) {
    return <ErrorDisplay title="No Pools Found" description="" />;
  }

  const activePool = pools.find(
    (pool) =>
      pool.poolAddress?.toLowerCase() === activePoolAddress?.toLowerCase()
  );

  const inactivePools = pools.filter(
    (pool) =>
      pool.poolAddress?.toLowerCase() !== activePoolAddress?.toLowerCase()
  );

  console.log('inactivePools', inactivePools);

  return (
    <Stack>
      <Box>
        <Text fw={600} fz="xl" mb="md">
          Your Pool
        </Text>
        <Box mb="md">
          {activePool ? (
            <PoolCard
              id={activePool.id}
              flowRate={activePool.reconstitutedFlowRate}
              lastUpdated={activePool.updatedAt || ''}
              creatorAddress={activePool.creatorAddress || ''}
              name={activePool.metadata.name || 'Unnamed Pool'}
              weightings={
                activePool.weightings || {
                  recast: '0',
                  like: '0',
                  comment: '0',
                  follow: '0',
                }
              }
              poolAddress={activePool.id}
              updatePrefs={handleUpdatePrefs}
              loadingUpdate={loadingPrefs}
              handleDistributeFlow={handleDistributeFlow}
            />
          ) : (
            <ErrorDisplay
              title="No Active Pool"
              description="You have not created a pool. If you have a pool and are seeing this error, contact beamr support."
            />
          )}
        </Box>
        {inactivePools.length > 0 && (
          <>
            {' '}
            <Group gap={'xs'} mb="md">
              <Text fz="lg">Inactive Pools</Text>
              <ActionIcon onClick={() => setShowInactive(!showInactive)}>
                <ChevronRight
                  size={18}
                  color={colors.gray[4]}
                  style={{
                    transform: showInactive ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 150ms ease',
                  }}
                />
              </ActionIcon>
            </Group>
            <Collapse in={showInactive}>
              <Stack gap="md">
                {inactivePools.map((pool) => {
                  return (
                    <PoolCard
                      id={pool.id}
                      flowRate={pool.reconstitutedFlowRate}
                      lastUpdated={pool.updatedAt || ''}
                      creatorAddress={pool.creatorAddress || ''}
                      name={pool.metadata.name || 'Unnamed Pool'}
                      weightings={
                        pool.weightings || {
                          recast: '0',
                          like: '0',
                          comment: '0',
                          follow: '0',
                        }
                      }
                      poolAddress={pool.id}
                      key={pool.id}
                      updatePrefs={handleUpdatePrefs}
                      loadingUpdate={loadingPrefs}
                      handleDistributeFlow={handleDistributeFlow}
                    />
                  );
                })}
              </Stack>
            </Collapse>
          </>
        )}
      </Box>
    </Stack>
  );
};

const MAX_WEIGHTING = 100;

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

  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isWeightingOverMax = (type: keyof Weightings) => {
    const value = Number(weightingState[type]);
    return value > MAX_WEIGHTING;
  };

  const isAnyWeightingOverMax = useMemo(() => {
    return (
      isWeightingOverMax('like') ||
      isWeightingOverMax('recast') ||
      isWeightingOverMax('follow') ||
      isWeightingOverMax('comment')
    );
  }, [weightingState]);

  const isBelowMin =
    monthly !== '' && monthly !== '0' && BigInt(monthly) < MIN_POOL_AMT;

  return (
    <Card>
      <Group justify="space-between" mb={4}>
        <Text fw={500}>{name}</Text>
        <Tag bg={colors.blue[9]} c={colors.blue[3]} w="fit-content">
          Microsub Pool
        </Tag>
      </Group>
      <Text c={colors.gray[3]} fz="sm" mb="md">
        Last Updated: {new Date(lastUpdated).toLocaleDateString()}
      </Text>

      <NumberInput
        label="Monthly Budget"
        ref={inputRef}
        thousandSeparator
        valueIsNumericString
        leftSectionWidth={45}
        leftSection={<Avatar src={beamrTokenLogo} size={24} />}
        description={`Fees Included: 2.5% Team + 2.5% Burn`}
        error={
          isBelowMin
            ? `Minimum monthly amount is ${formatBalance(MIN_POOL_AMT.toString())} BEAMR`
            : undefined
        }
        value={monthly}
        onChange={(val) => setMonthly(val.toString())}
        disabled={loadingUpdate}
        mb="md"
      />

      <Group gap="sm" mb="md">
        <Button
          size="xs"
          variant={monthlyDiff ? 'secondary' : undefined}
          disabled={loadingUpdate || isBelowMin}
          onClick={
            monthlyDiff
              ? () => focusInput()
              : () => handleDistributeFlow(poolAddress, monthly)
          }
          loading={loadingUpdate}
          leftSection={monthlyDiff ? <PencilIcon size={14} /> : undefined}
        >
          {monthlyDiff ? 'Adjust Flow' : 'Set Flow'}
        </Button>
        <Button
          size="xs"
          variant="danger"
          disabled={isZero}
          onClick={() => {
            setMonthly('0');
          }}
        >
          Stop Flow
        </Button>
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
            error={isWeightingOverMax('like') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={<RefreshCcw size={20} color={colors.green[7]} />}
            value={weightingState.recast}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('recast', e.target.value)}
            error={isWeightingOverMax('recast') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={<Users size={20} color={colors.purple[7]} />}
            value={weightingState.follow}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('follow', e.target.value)}
            error={isWeightingOverMax('follow') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={
              <MessageSquareReply size={20} color={colors.yellow[7]} />
            }
            disabled={loadingUpdate}
            value={weightingState.comment}
            onChange={(e) => handleChangeWeighting('comment', e.target.value)}
            error={isWeightingOverMax('comment') ? 'Max is 100' : undefined}
          />
        </Stack>
        <Button
          size="xs"
          mb={'sm'}
          disabled={prefsDiff || loadingUpdate || isAnyWeightingOverMax}
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
