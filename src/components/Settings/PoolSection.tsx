import React, { useMemo, useState } from 'react';
import {
  ActionIcon,
  Box,
  Collapse,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { updatePoolPrefs, UserPrefs, Weightings } from '../../utils/api';
import { notifications } from '@mantine/notifications';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { Address, parseEther } from 'viem';
import { distributeFlow } from '../../utils/interactions';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { PoolCard } from '../../components/Settings/PoolCard';

export const PoolSection = ({
  userPrefs,
  activePoolAddress,
  refetchPrefs,
  isLoadingPrefs,
  prefsError,
}: {
  prefsError: Error | null;
  isLoadingPrefs: boolean;
  refetchPrefs: () => void;
  userPrefs?: UserPrefs;
  activePoolAddress?: string;
}) => {
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

  const pools = useMemo(() => {
    if (!userPrefs?.pools || !userSubscription?.pools) {
      return [];
    }

    const collectionRate = collectionFlowRate || 0n;
    const subscriptionPools = userSubscription.pools;
    const outgoingByPool = new Map<
      string,
      { creatorFlowRate: bigint; totalFlowRate: bigint }
    >();

    userSubscription.outgoing?.forEach((beam) => {
      const poolId = beam.beamPool?.id;

      if (!poolId) {
        return;
      }

      const totalUnits = BigInt(beam.beamPool?.totalUnits || 0);
      const units = BigInt(beam.units || 0);

      if (totalUnits === 0n) {
        return;
      }

      const creatorPerUnit =
        BigInt(beam.beamPool?.creatorFlowRate || 0) / totalUnits;
      const totalPerUnit = BigInt(beam.beamPool?.flowRate || 0) / totalUnits;

      const existing = outgoingByPool.get(poolId) || {
        creatorFlowRate: 0n,
        totalFlowRate: 0n,
      };

      outgoingByPool.set(poolId, {
        creatorFlowRate: existing.creatorFlowRate + creatorPerUnit * units,
        totalFlowRate: existing.totalFlowRate + totalPerUnit * units,
      });
    });

    const creatorFlowRateByPool = new Map<string, bigint>();

    subscriptionPools.forEach((pool) => {
      const metrics = outgoingByPool.get(pool.id);

      // Fallback only when there are no outgoing edges for this pool.
      const creatorFlowRate = metrics
        ? metrics.creatorFlowRate
        : BigInt(pool.flowRate || 0);

      creatorFlowRateByPool.set(pool.id, creatorFlowRate);
    });

    const totalCreatorFlowRate = [...creatorFlowRateByPool.values()].reduce(
      (acc, rate) => acc + rate,
      0n,
    );

    return subscriptionPools.map((pool) => {
      const poolFlowRate = BigInt(pool.flowRate || 0);
      const poolMetrics = outgoingByPool.get(pool.id);
      const creatorPoolFlowRate =
        creatorFlowRateByPool.get(pool.id) ?? BigInt(pool.flowRate || 0);
      const totalPoolOutgoingFlowRate =
        poolMetrics?.totalFlowRate ?? creatorPoolFlowRate;

      const boostedPoolFlowRate =
        totalPoolOutgoingFlowRate > creatorPoolFlowRate
          ? totalPoolOutgoingFlowRate - creatorPoolFlowRate
          : 0n;

      let proportionalRate = 0n;

      if (totalCreatorFlowRate > 0n && collectionRate > 0n) {
        /* Calculate proportional fee: (Pool Flow * Total Fees) / Total Flow
         */
        proportionalRate =
          (creatorPoolFlowRate * BigInt(collectionRate)) / totalCreatorFlowRate;
      }

      const budgetFlowRate = creatorPoolFlowRate + proportionalRate;

      // Return the pool object combined with any UI preferences
      const prefs = userPrefs.pools.find((p) => p.poolAddress === pool.id);

      return {
        ...pool,
        ...prefs,
        proportionalRate,
        rawFlowRate: poolFlowRate, // Original flow
        reconstitutedFlowRate: budgetFlowRate.toString(), // Creator + collector
        budgetFlowRate: budgetFlowRate.toString(),
        creatorFlowRate: creatorPoolFlowRate.toString(),
        boostedFlowRate: boostedPoolFlowRate.toString(),
        totalOutgoingFlowRate: (
          totalPoolOutgoingFlowRate + proportionalRate
        ).toString(),
      };
    });
  }, [userPrefs, userSubscription, collectionFlowRate]);

  const handleUpdatePrefs = async (
    poolAddress: string,
    weightings: Weightings,
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
        .map((pool) => BigInt(pool.reconstitutedFlowRate || 0));

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

  if (pools === null || prefsError || collectionError) {
    return <ErrorDisplay title="No Pools Found" description="" />;
  }

  const activePool = pools.find(
    (pool) =>
      pool.poolAddress?.toLowerCase() === activePoolAddress?.toLowerCase(),
  );

  const inactivePools = pools.filter(
    (pool) =>
      pool.poolAddress?.toLowerCase() !== activePoolAddress?.toLowerCase(),
  );

  return (
    <Stack>
      <Box>
        <Text fz="lg" mb="md">
          Active Pool
        </Text>
        <Box mb="md">
          {activePool ? (
            <PoolCard
              id={activePool.id}
              flowRate={activePool.budgetFlowRate}
              boostedFlowRate={activePool.boostedFlowRate}
              totalOutgoingFlowRate={activePool.totalOutgoingFlowRate}
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
                      flowRate={pool.budgetFlowRate}
                      boostedFlowRate={pool.boostedFlowRate}
                      totalOutgoingFlowRate={pool.totalOutgoingFlowRate}
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
