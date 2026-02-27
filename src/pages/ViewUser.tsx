import {
  Avatar,
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
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { flowratePerSecondToMonth, formatUnitBalance } from '../utils/common';
import { PageLayout } from '../layouts/PageLayout';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { TableHeader, TableRow } from '../components/User/TableItems';
import { FlowProgressBar } from '../components/User/FlowProgressBar';
import { useUser } from '../hooks/useUser';
import { fetchProfiles, fetchUserPrefs } from '../utils/api';
import { gqlClient } from '../utils/envio';
import { network } from '../utils/setup';
import { transformUserByPk, UserTransformed } from '../transforms/user';
import { LoggedInUserSubscription } from '../generated/graphql';

import { BeamrNav } from '../components/svg/BeamrNav';
import { DancingText } from '../components/DancingText';
import { ADDR } from '../const/addresses';
import { useToken } from '../hooks/useToken';
import { Abi, Address, isAddress } from 'viem';
import { poolAbi } from '../abi/Pool';
import { usePublicClient } from 'wagmi';
import { getFlowDistributionRate } from '../utils/reads';
import { ArrowLeft } from 'lucide-react';
import { Glass } from '../components/Glass';
import classes from '../styles/effects.module.css';
import sdk from '@farcaster/miniapp-sdk';

const VIEW_USER_QUERY = `
  query ViewUser($id: String!) {
    User_by_pk(id: $id) {
      id
      pools {
        id
        flowRate
        totalUnits
        active
        hasDistributed
        metadata {
          name
        }
        creatorAccount {
          address
        }
      }
      incoming(
        order_by: { lastUpdated: desc }
        where: { beamPool: { active: { _eq: true } } }
      ) {
        id
        units
        isReceiverConnected
        lastUpdated
        beamPool {
          flowRate
          totalUnits
          id
        }
        from {
          fid
          id
        }
      }
      outgoing(
        order_by: { lastUpdated: desc }
        where: { beamPool: { active: { _eq: true } } }
      ) {
        units
        id
        beamPool {
          flowRate
          creatorFlowRate
          totalUnits
          id
        }
        to {
          id
          fid
        }
      }
    }
  }
`;

type ViewUserQueryResponse = {
  User_by_pk?: LoggedInUserSubscription['User_by_pk'] | null;
};

const getBeamFlowRate = (item: {
  beamPool?: {
    flowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const perUnitFlowRate = BigInt(item.beamPool?.flowRate || 0) / totalUnits;

  return perUnitFlowRate * BigInt(item.units || 0);
};

const getOutgoingBeamFlowRate = (item: {
  beamPool?: {
    creatorFlowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const perUnitFlowRate =
    BigInt(item.beamPool?.creatorFlowRate || 0) / totalUnits;

  return perUnitFlowRate * BigInt(item.units || 0);
};

const getOutgoingBoostFlowRate = (item: {
  beamPool?: {
    flowRate?: bigint | string;
    creatorFlowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const flowRate = BigInt(item.beamPool?.flowRate || 0);
  const creatorFlowRate = BigInt(item.beamPool?.creatorFlowRate || 0);
  const boostedFlowRate = flowRate - creatorFlowRate;

  if (boostedFlowRate <= 0n) return 0n;

  return (boostedFlowRate / totalUnits) * BigInt(item.units || 0);
};

const ViewBalanceDisplay = ({
  data,
  userBalance,
  connectedBalance,
  unconnectedBalance,
  collectionFlowRate,
  userBalanceFetchedAt,
  canNag,
  nagTooltipLabel,
  onNagClick,
}: {
  data: UserTransformed;
  userBalance: bigint;
  connectedBalance: bigint;
  unconnectedBalance: bigint;
  collectionFlowRate: bigint;
  userBalanceFetchedAt: Date;
  canNag: boolean;
  nagTooltipLabel: string;
  onNagClick: () => void;
}) => {
  const { colors } = useMantineTheme();

  const totalIncomingFlowRate = useMemo(() => {
    if (!data?.incoming?.length) return 0n;

    return data.incoming.reduce(
      (total, item) => total + getBeamFlowRate(item),
      0n,
    );
  }, [data]);

  const totalOutgoingFlowRate = useMemo(() => {
    if (!data?.outgoing?.length && !collectionFlowRate) return 0n;

    let total = data.outgoing.reduce(
      (total, item) => total + getOutgoingBeamFlowRate(item),
      0n,
    );

    if (collectionFlowRate) {
      total += collectionFlowRate;
    }

    return total;
  }, [data, collectionFlowRate]);

  const totalBoostedFlowRate = useMemo(() => {
    if (!data?.outgoing?.length) return 0n;

    return data.outgoing.reduce(
      (total, item) => total + getOutgoingBoostFlowRate(item),
      0n,
    );
  }, [data]);

  const hasBoost = totalBoostedFlowRate > 0n;
  const displayedOutgoingFlowRate = hasBoost
    ? totalOutgoingFlowRate + totalBoostedFlowRate
    : totalOutgoingFlowRate;

  const moreIncomingThanOutgoing =
    totalIncomingFlowRate >= totalOutgoingFlowRate;
  const netFlowRate = moreIncomingThanOutgoing
    ? totalIncomingFlowRate - totalOutgoingFlowRate
    : totalOutgoingFlowRate - totalIncomingFlowRate;
  const signedNetFlowRate = totalIncomingFlowRate - totalOutgoingFlowRate;

  return (
    <Card mb="md">
      <Group gap={2} c={colors.gray[3]} mb="md">
        <BeamrNav size={18} />
        <Text mr={6}>Beamr</Text>
        <DancingText
          userBalance={userBalance}
          fetchedAt={userBalanceFetchedAt}
          flowRate={signedNetFlowRate}
          fw={500}
          fz="lg"
          c={colors.gray[0]}
          mr="auto"
        />
      </Group>
      <Group gap={4} mb="xs">
        <Text
          fz="sm"
          c={moreIncomingThanOutgoing ? colors.green[7] : colors.purple[7]}
        >
          Net Monthly Rate {moreIncomingThanOutgoing ? '+' : '-'}
          {flowratePerSecondToMonth(netFlowRate, 'no-label')}
        </Text>
      </Group>
      <FlowProgressBar
        connected={totalIncomingFlowRate}
        notConnected={0n}
        outgoing={displayedOutgoingFlowRate}
        boosted={totalBoostedFlowRate}
      />
      <Group justify="space-between">
        <Text c={colors.green[7]} fz="sm">
          Incoming
        </Text>
        <Text c={colors.purple[7]} fz="sm">
          {hasBoost ? 'Total Outgoing' : 'Outgoing'}
        </Text>
      </Group>
      <Group justify="space-between">
        <Text fz="sm">
          {flowratePerSecondToMonth(totalIncomingFlowRate, 'no-label')}
        </Text>
        <Text fz="sm">
          {flowratePerSecondToMonth(displayedOutgoingFlowRate, 'no-label')}
        </Text>
      </Group>
      <Group mt="md" justify="space-between">
        <Text c={colors.gray[3]} fz="sm">
          Connected Balance {formatUnitBalance(connectedBalance)}
        </Text>
        <Tooltip label={nagTooltipLabel} disabled={!canNag} multiline w={260}>
          <Text
            c={canNag ? colors.gray[0] : colors.gray[3]}
            fz="sm"
            className={canNag ? classes.glow : undefined}
            style={{ cursor: canNag ? 'pointer' : 'default' }}
            onClick={canNag ? onNagClick : undefined}
          >
            Unconnected {formatUnitBalance(unconnectedBalance)}
          </Text>
        </Tooltip>
      </Group>
    </Card>
  );
};

const ViewSending = ({ data }: { data: UserTransformed }) => {
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  const sorted = useMemo(() => {
    if (!data?.outgoing?.length) return [];

    return [...data.outgoing].sort((a, b) => {
      const aBeamFlowRate = getBeamFlowRate(a);
      const bBeamFlowRate = getBeamFlowRate(b);

      return bBeamFlowRate > aBeamFlowRate ? 1 : -1;
    });
  }, [data]);

  if (sorted.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={true} />
        <Flex justify="center" align="center" h={100} direction="column">
          <Text size="xl" mb="md">
            No outgoing streams
          </Text>
          <Text c={colors.gray[2]}>No outgoing beams for this user yet.</Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <TableHeader sending={true} />
      <Stack gap="12px">
        {sorted.map((item) => {
          const beamFlowRate = getBeamFlowRate(item);
          const percentage = Number(
            (
              (Number(item.units || 0) /
                Number(item.beamPool?.totalUnits || 1)) *
              100
            ).toFixed(2),
          );

          return (
            <TableRow
              sending={true}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.to?.profile?.pfp_url || ''}
              avatarTooltip={
                item.to?.profile?.username
                  ? `@${item.to.profile.username}`
                  : undefined
              }
              avatarOnClick={
                item.to?.fid
                  ? () => navigate(`/user/${item.to.fid}`)
                  : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const ViewReceiving = ({ data }: { data: UserTransformed }) => {
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  const sorted = useMemo(() => {
    if (!data?.incoming?.length) return [];

    return [...data.incoming].sort((a, b) => {
      const aBeamFlowRate = getBeamFlowRate(a);
      const bBeamFlowRate = getBeamFlowRate(b);

      return bBeamFlowRate > aBeamFlowRate ? 1 : -1;
    });
  }, [data]);

  if (sorted.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={false} showConnection={false} />
        <Flex justify="center" align="center" h={100} direction="column">
          <Text size="xl" mb="md">
            No incoming streams
          </Text>
          <Text c={colors.gray[2]}>No one has beamed to this user yet.</Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <TableHeader sending={false} showConnection={false} />
      <Stack gap="sm">
        {sorted.map((item) => {
          const beamFlowRate = getBeamFlowRate(item);
          const percentage = Number(
            (
              (Number(item.units || 0) /
                Number(item.beamPool?.totalUnits || 1)) *
              100
            ).toFixed(2),
          );

          return (
            <TableRow
              sending={false}
              showConnection={false}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.from?.profile?.pfp_url || ''}
              avatarTooltip={
                item.from?.profile?.username
                  ? `@${item.from.profile.username}`
                  : undefined
              }
              avatarOnClick={
                item.from?.fid
                  ? () => navigate(`/user/${item.from.fid}`)
                  : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export const ViewUser = () => {
  const { fid } = useParams();
  const [tab, setTab] = useState('Outgoing');
  const [fallbackBalanceFetchedAt] = useState(() => new Date());
  const { getAuthHeaders, user: loggedInUser } = useUser();
  const publicClient = usePublicClient();
  const navigate = useNavigate();

  const parsedFid = Number(fid);
  const isValidFid = !!fid && Number.isInteger(parsedFid) && parsedFid > 0;
  const userId = isValidFid ? `${parsedFid}-${network.id}` : '';

  const {
    data: viewedUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['view-user', userId],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) {
        throw new Error('Failed to authenticate user');
      }

      const data = await gqlClient.request<ViewUserQueryResponse>(
        VIEW_USER_QUERY,
        { id: userId },
        headers,
      );

      return transformUserByPk(
        data,
        async () => headers,
        parsedFid ? [parsedFid.toString()] : [],
      );
    },
    enabled: isValidFid,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const { data: viewedProfile } = useQuery({
    queryKey: ['view-user-profile', parsedFid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers || !parsedFid) {
        throw new Error('Failed to authenticate user');
      }

      const profiles = await fetchProfiles([parsedFid.toString()], headers);
      return profiles[0];
    },
    enabled: isValidFid,
    staleTime: 60_000,
  });

  const { data: viewedUserPrefs } = useQuery({
    queryKey: ['view-user-prefs', parsedFid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers || !parsedFid) {
        throw new Error('Failed to authenticate user');
      }

      try {
        return await fetchUserPrefs(parsedFid, headers);
      } catch {
        return null;
      }
    },
    enabled: isValidFid,
    staleTime: 60_000,
  });

  const preferredAddress = viewedUserPrefs?.preferredAddress;
  const neynarPrimaryAddress =
    viewedProfile?.verified_addresses?.primary?.eth_address;
  const viewedDisplayName =
    viewedProfile?.display_name || viewedProfile?.username || 'Farcaster user';
  const viewedUsername = viewedProfile?.username;
  const resolvedAddress = preferredAddress || neynarPrimaryAddress;
  const parsedViewedAddress =
    resolvedAddress && isAddress(resolvedAddress)
      ? (resolvedAddress as Address)
      : undefined;

  const { data: viewedTokenData } = useToken({
    userAddress: parsedViewedAddress,
    tokenAddress: ADDR.SUPER_TOKEN,
    calls: { balanceOf: true },
    enabled: !!parsedViewedAddress,
  });

  const viewedUserBalance = (viewedTokenData?.balanceOf as bigint) || 0n;
  const viewedUserBalanceFetchedAt =
    viewedTokenData?.fetchedAt || fallbackBalanceFetchedAt;

  const { data: collectionFlowRate = 0n } = useQuery({
    queryKey: ['view-user-collector-flow-rate', parsedViewedAddress],
    queryFn: async () => {
      if (!parsedViewedAddress) return 0n;

      return getFlowDistributionRate({
        userAddress: parsedViewedAddress,
        poolAddress: ADDR.COLLECTOR_POOL,
        tokenAddress: ADDR.SUPER_TOKEN,
      });
    },
    enabled: !!parsedViewedAddress,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  const unconnectedPoolAddresses = useMemo(() => {
    if (!viewedUser?.incoming?.length) return [];

    const pools = viewedUser.incoming
      .filter((beam) => !beam.isReceiverConnected)
      .map((beam) => beam.beamPool?.id)
      .filter((id): id is string => !!id && isAddress(id));

    return [...new Set(pools)] as Address[];
  }, [viewedUser]);

  const { data: unconnectedClaimable = 0n } = useQuery({
    queryKey: [
      'view-user-unconnected-claimable',
      parsedViewedAddress,
      unconnectedPoolAddresses,
    ],
    queryFn: async () => {
      if (
        !publicClient ||
        !parsedViewedAddress ||
        !unconnectedPoolAddresses.length
      ) {
        return 0n;
      }

      const contracts = unconnectedPoolAddresses.map((pool) => ({
        address: pool,
        abi: poolAbi as Abi,
        functionName: 'getClaimableNow',
        args: [parsedViewedAddress],
      }));

      const results = await publicClient.multicall({
        contracts,
      });

      return results.reduce((total, result) => {
        if (result.status !== 'success') return total;

        const [claimable] = result.result as [bigint, bigint];
        return claimable > 0n ? total + claimable : total;
      }, 0n);
    },
    enabled:
      !!publicClient &&
      !!parsedViewedAddress &&
      unconnectedPoolAddresses.length > 0,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  const unconnectedIncoming = useMemo(() => {
    if (!viewedUser?.incoming?.length) return 0n;

    return viewedUser.incoming.reduce((total, beam) => {
      if (beam.isReceiverConnected) return total;
      return total + getBeamFlowRate(beam);
    }, 0n);
  }, [viewedUser]);

  const nagSenderFids = useMemo(() => {
    if (!viewedUser?.incoming?.length) return [];

    const senders = viewedUser.incoming
      .filter((beam) => !beam.isReceiverConnected)
      .map((beam) => beam.from?.fid)
      .filter((fid): fid is number => !!fid);

    return [...new Set(senders)].slice(0, 6);
  }, [viewedUser]);

  const nagSenderNames = useMemo(() => {
    if (!viewedUser?.incoming?.length) return [];

    const loggedInUsername = loggedInUser?.username?.toLowerCase();

    const names = viewedUser.incoming
      .filter((beam) => !beam.isReceiverConnected)
      .map((beam) => beam.from?.profile?.username)
      .filter(
        (name) =>
          !!name &&
          (!loggedInUsername || name.toLowerCase() !== loggedInUsername),
      )
      .filter((name): name is string => !!name);

    return [...new Set(names)];
  }, [viewedUser, loggedInUser?.username]);

  const canNagUser =
    nagSenderFids.length > 0 &&
    nagSenderNames.length > 0 &&
    unconnectedIncoming > 0n &&
    !!parsedFid &&
    !!viewedUsername;

  const nagTooltipLabel = viewedUsername
    ? `Nag @${viewedUsername} to connect and claim`
    : 'Nag this user to connect and claim';

  const onNagClick = () => {
    if (!canNagUser || !parsedFid || !viewedUsername) return;

    const monthlyUnconnected = flowratePerSecondToMonth(
      unconnectedIncoming,
      'no-label',
    );

    const infoLine =
      nagSenderNames.length === 0
        ? `You can connect to streams sending you ${monthlyUnconnected} $BEAMR/mo!`
        : nagSenderNames.length === 1
          ? `${nagSenderNames[0]} is streaming to you. You can connect to streams sending you ${monthlyUnconnected} $BEAMR/mo!`
          : nagSenderNames.length === 2
            ? `${nagSenderNames[0]} and ${nagSenderNames[1]} are streaming to you. You can connect to streams sending you ${monthlyUnconnected} $BEAMR/mo!`
            : `${nagSenderNames[0]}, ${nagSenderNames[1]}, and others are streaming to you. You can connect to streams sending you ${monthlyUnconnected} $BEAMR/mo!`;

    const text = `Hey @${viewedUsername}!
    
${infoLine}

Open the Beamr Mini app to claim.`;

    sdk.actions.composeCast({
      embeds: [
        `https://app.beamr.fun/og/reply-embed?senders=${nagSenderFids.join(',')}&receiver=${parsedFid}&flowrate=0`,
      ],
      text,
    });
  };

  const onAvatarClick = async () => {
    if (!parsedFid) return;

    try {
      await sdk.actions.viewProfile({ fid: parsedFid });
    } catch (error) {
      const fallbackUrl = viewedUsername
        ? `https://warpcast.com/${viewedUsername}`
        : `https://warpcast.com/~/profiles/${parsedFid}`;
      await sdk.actions.openUrl(fallbackUrl);
    }
  };

  useEffect(() => {
    if (!viewedUser) return;

    setTab(viewedUser.outgoing.length === 0 ? 'Incoming' : 'Outgoing');
  }, [fid, viewedUser?.outgoing.length]);

  if (!isValidFid) {
    return (
      <PageLayout>
        <ErrorDisplay
          title="Invalid user"
          description="Invalid FID in route."
        />
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <Group justify="center" h={350}>
          <Loader color="var(--glass-thick)" />
        </Group>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <ErrorDisplay title="Error Loading User" description={error.message} />
      </PageLayout>
    );
  }

  if (!viewedUser) {
    return (
      <PageLayout>
        <ErrorDisplay
          title="User not found"
          description="No incoming or outgoing streams for this user."
        />
      </PageLayout>
    );
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/global');
  };

  return (
    <PageLayout>
      <Glass
        px="sm"
        py={6}
        mb="sm"
        onClick={handleBack}
        style={{ width: 'fit-content', cursor: 'pointer' }}
      >
        <Group wrap="nowrap" gap={6}>
          <ArrowLeft size={14} />
          <Text fz="sm">Back</Text>
        </Group>
      </Glass>
      <Group justify="center" mb="xl">
        <Stack align="center" gap={8}>
          <Tooltip label="View Farcaster Profile">
            <Avatar
              src={viewedProfile?.pfp_url}
              alt={viewedDisplayName}
              size={80}
              radius="xl"
              onClick={onAvatarClick}
              style={{ cursor: parsedFid ? 'pointer' : 'default' }}
            />
          </Tooltip>
          <Stack gap={0} align="center">
            <Text fw={600}>{viewedDisplayName}</Text>
            {viewedProfile?.display_name &&
              viewedUsername &&
              viewedProfile.display_name !== viewedUsername && (
                <Text c="dimmed" fz="sm">
                  @{viewedUsername}
                </Text>
              )}
          </Stack>
        </Stack>
      </Group>
      <ViewBalanceDisplay
        data={viewedUser}
        userBalance={viewedUserBalance + unconnectedClaimable}
        connectedBalance={viewedUserBalance}
        unconnectedBalance={unconnectedClaimable}
        collectionFlowRate={collectionFlowRate}
        userBalanceFetchedAt={viewedUserBalanceFetchedAt}
        canNag={canNagUser}
        nagTooltipLabel={nagTooltipLabel}
        onNagClick={onNagClick}
      />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Outgoing', 'Incoming']}
          mb="md"
        />
        {tab === 'Outgoing' && <ViewSending data={viewedUser} />}
        {tab === 'Incoming' && <ViewReceiving data={viewedUser} />}
      </Card>
    </PageLayout>
  );
};
