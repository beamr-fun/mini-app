import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Flex,
  Group,
  Loader,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { useMemo, useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
import { useQuery } from '@tanstack/react-query';
import { useGqlSub } from '../hooks/useGqlSub';
import {
  GlobalMostRecentDocument,
  GlobalMostRecentSubscription,
  GlobalTopDocument,
  GlobalTopSubscription,
} from '../generated/graphql';
import { useUser } from '../hooks/useUser';
import { useCTA } from '../hooks/useCTA';
import { useNavigate } from 'react-router-dom';
import { Ribbon, Trophy } from 'lucide-react';
import { ErrorDisplay } from '../components/ErrorDisplay';
import {
  globalLeaderTransform,
  globalRecentTransform,
  LeaderPoolRaw,
  RecentBeam,
} from '../transforms/global';
import { BeamrHeadline } from '../components/BeamrHeadline';
import { MULTI_POOL_WHITELIST } from '../const/params';
import { usePublicClient } from 'wagmi';
import { GDAForwarderAbi } from '../abi/GDAFowarder';
import { ADDR } from '../const/addresses';

type LeaderPool = {
  pfpUrl: string;
  username: string;
  flowRate: string;
  totalUnits: string;
  displayName: string;
  fid?: number;
  id: string;
};

export const Global = () => {
  const [tab, setTab] = useState('Recent');
  const publicClient = usePublicClient();
  const {
    getAuthHeaders,
    hasOpenPool,
    apiError,
    userSubError,
    userSubscription,
    user,
  } = useUser();

  const highlevelError = apiError || userSubError;

  const navigate = useNavigate();
  const viewUser = (fid?: number) => {
    if (!fid) return;
    navigate(`/user/${fid}`);
  };

  const {
    data: recentBeams,
    isLoading: isLoadingRecent,
    error: recentError,
  } = useGqlSub<GlobalMostRecentSubscription, RecentBeam[]>(
    GlobalMostRecentDocument,
    {
      transform: (data) => globalRecentTransform(data, getAuthHeaders),
    }
  );

  const {
    data: leaderRaw,
    isLoading: isLoadingLeader,
    error: leaderError,
  } = useGqlSub<GlobalTopSubscription, LeaderPoolRaw[]>(GlobalTopDocument, {
    transform: async (data) => {
      return globalLeaderTransform(data, getAuthHeaders);
    },
  });

  const { data: collectorByPoolId, isLoading: isLoadingCollectorRates } =
    useQuery({
      queryKey: [
        'global-leader-collector-rates',
        leaderRaw?.map((pool) => `${pool.id}:${pool.creatorAccount?.address}`),
      ],
      queryFn: async () => {
        if (!publicClient || !leaderRaw?.length) {
          return {};
        }

        const poolsWithAddress = leaderRaw.filter(
          (pool) => !!pool.creatorAccount?.address,
        );

        if (poolsWithAddress.length === 0) {
          return {};
        }

        const contracts = poolsWithAddress.map((pool) => ({
          abi: GDAForwarderAbi,
          address: ADDR.GDA_FORWARDER,
          functionName: 'getFlowDistributionFlowRate',
          args: [
            ADDR.SUPER_TOKEN,
            pool.creatorAccount!.address,
            ADDR.COLLECTOR_POOL,
          ],
        }));

        const rates = await publicClient.multicall({
          contracts,
        });

        return poolsWithAddress.reduce<Record<string, bigint>>(
          (acc, pool, idx) => {
            const result = rates[idx];
            acc[pool.id] =
              result.status === 'success' ? (result.result as bigint) : 0n;
            return acc;
          },
          {},
        );
      },
      enabled: !!publicClient && !!leaderRaw?.length,
      staleTime: 30_000,
      refetchInterval: 30_000,
    });

  const leaderboardData = useMemo(() => {
    if (!leaderRaw) return [];

    return leaderRaw.map((pool) => {
      const collectorRate = collectorByPoolId?.[pool.id] || 0n;
      const totalOutgoingFlowRate = BigInt(pool.flowRate || 0) + collectorRate;

      return {
        pfpUrl: pool.creatorAccount?.user?.profile?.pfp_url || '',
        username: pool.creatorAccount?.user?.profile?.username || 'Unknown',
        flowRate: totalOutgoingFlowRate.toString(),
        totalUnits: pool.totalUnits,
        displayName:
          pool.creatorAccount?.user?.profile?.display_name || 'Unknown',
        fid: pool.creatorAccount?.user?.fid,
        id: pool.id,
      } as LeaderPool;
    });
  }, [leaderRaw, collectorByPoolId]);

  const hideButton = useMemo(() => {
    if (!user || !user.fid) return true;

    if (highlevelError) return true;

    if (MULTI_POOL_WHITELIST.includes(user.fid)) {
      return false;
    }

    if (!userSubscription || !userSubscription.pools.length) {
      return false;
    }

    if (hasOpenPool) {
      return true;
    }
  }, [user, userSubscription]);

  useCTA({
    label: hideButton ? undefined : 'Start Beaming',
    onClick: hideButton ? undefined : () => navigate('/create-pool/1'),
    extraDeps: [hideButton],
  });

  // useCTA({
  //   label: 'Start Beaming',
  //   onClick: () => navigate('/create-pool/1'),
  // });

  if (highlevelError) {
    return (
      <PageLayout>
        <BeamrHeadline />
        <ErrorDisplay
          title="Error Loading Global Data"
          description={highlevelError.message || 'Subscription Error'}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <BeamrHeadline />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Recent', 'Leaderboard']}
          mb="md"
        />
        {tab === 'Recent' && (
          <Recent
            beams={recentBeams || []}
            isLoading={isLoadingRecent}
            error={recentError}
            onViewUser={viewUser}
          />
        )}
        {tab === 'Leaderboard' && (
          <Leader
            leaderboardData={leaderboardData}
            isLoading={isLoadingLeader || isLoadingCollectorRates}
            error={leaderError}
            onViewUser={viewUser}
          />
        )}
      </Card>
    </PageLayout>
  );
};

const Leader = ({
  leaderboardData,
  isLoading,
  error,
  onViewUser,
}: {
  leaderboardData: LeaderPool[];
  isLoading: boolean;
  error: Error | null;
  onViewUser: (fid?: number) => void;
}) => {
  const { colors } = useMantineTheme();

  if (isLoading) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Error Loading Leaderboard"
        description={error.message}
      />
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <LeaderHeader />
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No Streams
          </Text>
          <Text c={colors.gray[2]}>No Beams at all for this contract. </Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <LeaderHeader />
      <Stack gap="sm">
        {leaderboardData?.map((pool) => {
          return (
            <LeaderRow
              key={pool.id}
              flowRate={BigInt(pool.flowRate)}
              pfpUrl={pool.pfpUrl}
              place={leaderboardData.indexOf(pool) + 1}
              displayName={pool.displayName}
              username={pool.username}
              fid={pool.fid}
              onViewUser={onViewUser}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const Recent = ({
  beams,
  isLoading,
  error,
  onViewUser,
}: {
  beams: RecentBeam[];
  isLoading: boolean;
  error: Error | null;
  onViewUser: (fid?: number) => void;
}) => {
  const { colors } = useMantineTheme();

  if (isLoading) {
    return (
      <Group justify="center" h={350}>
        <Loader color="var(--glass-thick)" />
      </Group>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Error Loading Recent Beams"
        description={error.message}
      />
    );
  }

  if (beams.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <GlobalHeader />
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No Streams
          </Text>
          <Text c={colors.gray[2]}>No Beams at all for this contract. </Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <GlobalHeader />
      <Stack gap="sm">
        {beams?.map((beam) => {
          const perUnitFlowRate =
            BigInt(beam.beamPool?.flowRate) / BigInt(beam.beamPool?.totalUnits);
          const beamFlowRate = perUnitFlowRate * BigInt(beam.units);

          const percentage = Number(
            (
              (Number(beam.units) / Number(beam.beamPool?.totalUnits)) *
              100
            ).toFixed(2)
          );

          return (
            <GlobalRow
              key={beam.id}
              flowRate={beamFlowRate}
              senderUrl={beam.from?.profile?.pfp_url || ''}
              receiverUrl={beam.to?.profile?.pfp_url || ''}
              senderUsername={beam.from?.profile?.username || undefined}
              receiverUsername={beam.to?.profile?.username || undefined}
              percentage={percentage}
              senderFid={beam.from?.fid}
              receiverFid={beam.to?.fid}
              onViewUser={onViewUser}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const GlobalRow = ({
  senderUrl,
  receiverUrl,
  senderUsername,
  receiverUsername,
  flowRate,
  percentage,
  senderFid,
  receiverFid,
  onViewUser,
}: {
  senderUrl: string;
  receiverUrl: string;
  senderUsername?: string;
  receiverUsername?: string;
  flowRate: bigint;
  percentage: number;
  senderFid?: number;
  receiverFid?: number;
  onViewUser: (fid?: number) => void;
}) => {
  return (
    <Group justify="space-between">
      <AvatarGroup>
        <Tooltip
          label={senderUsername ? `@${senderUsername}` : undefined}
          disabled={!senderUsername}
        >
          <Avatar
            size={32}
            radius="xl"
            src={senderUrl}
            style={{ cursor: senderFid ? 'pointer' : 'default' }}
            onClick={senderFid ? () => onViewUser(senderFid) : undefined}
          />
        </Tooltip>
        <Tooltip
          label={receiverUsername ? `@${receiverUsername}` : undefined}
          disabled={!receiverUsername}
        >
          <Avatar
            size={32}
            radius="xl"
            src={receiverUrl}
            style={{ cursor: receiverFid ? 'pointer' : 'default' }}
            onClick={receiverFid ? () => onViewUser(receiverFid) : undefined}
          />
        </Tooltip>
      </AvatarGroup>
      <Box w={32} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      <Box w={75} ta="right">
        {flowratePerSecondToMonth(flowRate)}
      </Box>
      <Text w={48} ta="right">
        {percentage}%
      </Text>
    </Group>
  );
};

const GlobalHeader = () => {
  const { colors } = useMantineTheme();

  return (
    <Group justify="space-between" c={colors.gray[0]} mb="12px">
      <Text w={50} fz="sm" fw={500} ta="left">
        Users
      </Text>
      <Text w={32} fz="sm" fw={500} ta="left">
        Token
      </Text>
      <Text w={75} fz="sm" fw={500} ta="right">
        Amount/mo
      </Text>
      <Text w={48} fz="sm" fw={500} ta="right">
        Pool %
      </Text>
    </Group>
  );
};

const LeaderHeader = () => {
  const { colors } = useMantineTheme();
  return (
    <Group mb={12} gap={'sm'}>
      <Trophy size={16} color={colors.gray[3]} />
      <Text c={colors.gray[3]} fz="sm">
        Top Beamrs by flow rate
      </Text>
    </Group>
  );
};

const TROPHY_COLORS = ['#D4AF37', '#BFC1C2', '#A97142'];

const LeaderRow = ({
  pfpUrl,
  place,
  flowRate,
  displayName,
  username,
  fid,
  onViewUser,
}: {
  pfpUrl: string;
  place: number;
  flowRate: bigint;
  displayName: string;
  username?: string;
  fid?: number;
  onViewUser: (fid?: number) => void;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Group gap={0}>
      <Box w={20} mr={4}>
        {place >= 4 && (
          <Box ta="left" c={colors.gray[5]}>
            {place}
          </Box>
        )}
        {place < 4 && (
          <Ribbon
            size={16}
            strokeWidth={2}
            color={TROPHY_COLORS[place - 1]}
            style={{ transform: 'translate(-3px, 3px)' }}
          />
        )}
      </Box>
      <Tooltip label={username ? `@${username}` : undefined} disabled={!username}>
        <Avatar
          size={32}
          radius="xl"
          src={pfpUrl}
          mr="sm"
          style={{ cursor: fid ? 'pointer' : 'default' }}
          onClick={fid ? () => onViewUser(fid) : undefined}
        />
      </Tooltip>
      <Text
        w={75}
        lineClamp={1}
        mr="auto"
        style={{ cursor: fid ? 'pointer' : 'default' }}
        onClick={fid ? () => onViewUser(fid) : undefined}
      >
        {displayName}
      </Text>
      {/* </Group> */}
      <Box w={75} ta="right" mr="8">
        {flowratePerSecondToMonth(flowRate)}
      </Box>
      <Box w={32} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
    </Group>
  );
};
