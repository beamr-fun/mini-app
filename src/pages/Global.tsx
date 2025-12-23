import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Loader,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import beamrLogo from '../assets/beamrLogo.png';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { useEffect, useMemo, useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
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

//

type LeaderPool = {
  pfpUrl: string;
  username: string;
  flowRate: string;
  totalUnits: string;
  displayName: string;
  fid: number;
  id: string;
};

export const Global = () => {
  const [tab, setTab] = useState('Recent');
  const { getAuthHeaders, hasPool, apiError, userSubError } = useUser();

  const highlevelError = apiError || userSubError;

  const navigate = useNavigate();

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

  const leaderboardData = useMemo(() => {
    if (!leaderRaw) return [];

    return leaderRaw.map((pool) => {
      return {
        pfpUrl: pool.creatorAccount?.user?.profile?.pfp_url || '',
        username: pool.creatorAccount?.user?.profile?.username || 'Unknown',
        flowRate: pool.flowRate,
        totalUnits: pool.totalUnits,
        displayName:
          pool.creatorAccount?.user?.profile?.display_name || 'Unknown',
        fid: pool.creatorAccount?.user?.fid,
        id: pool.id,
      } as LeaderPool;
    });
  }, [leaderRaw]);

  const shouldRenderCTA = !hasPool && !highlevelError;

  useCTA({
    label: shouldRenderCTA ? 'Start Beaming' : undefined,
    onClick: shouldRenderCTA ? () => navigate('/create-pool/1') : undefined,
    extraDeps: [shouldRenderCTA],
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
          />
        )}
        {tab === 'Leaderboard' && (
          <Leader
            leaderboardData={leaderboardData}
            isLoading={isLoadingLeader}
            error={leaderError}
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
}: {
  leaderboardData: LeaderPool[];
  isLoading: boolean;
  error: Error | null;
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
}: {
  beams: RecentBeam[];
  isLoading: boolean;
  error: Error | null;
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
              percentage={percentage}
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
  flowRate,
  percentage,
}: {
  senderUrl: string;
  receiverUrl: string;
  flowRate: bigint;
  percentage: number;
}) => {
  return (
    <Group justify="space-between">
      <AvatarGroup>
        <Avatar size={32} radius="xl" src={senderUrl} />
        <Avatar size={32} radius="xl" src={receiverUrl} />
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
        Top Beamrs on the App by flow rate
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
}: {
  pfpUrl: string;
  place: number;
  flowRate: bigint;
  displayName: string;
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
      <Avatar size={32} radius="xl" src={pfpUrl} mr="sm" />
      <Text w={75} lineClamp={1} mr="auto">
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
