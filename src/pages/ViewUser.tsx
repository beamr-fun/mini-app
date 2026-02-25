import {
  Avatar,
  Card,
  Flex,
  Group,
  Loader,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { flowratePerSecondToMonth } from '../utils/common';
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
import { useCTA } from '../hooks/useCTA';
import { BeamrNav } from '../components/svg/BeamrNav';
import { DancingText } from '../components/DancingText';
import { ADDR } from '../const/addresses';
import { useToken } from '../hooks/useToken';
import { Abi, Address, isAddress } from 'viem';
import { poolAbi } from '../abi/Pool';
import { usePublicClient } from 'wagmi';

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
  beamPool?: { flowRate?: bigint | string; totalUnits?: bigint | string } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const perUnitFlowRate = BigInt(item.beamPool?.flowRate || 0) / totalUnits;

  return perUnitFlowRate * BigInt(item.units || 0);
};

const ViewBalanceDisplay = ({
  data,
  userBalance,
  userBalanceFetchedAt,
}: {
  data: UserTransformed;
  userBalance: bigint;
  userBalanceFetchedAt: Date;
}) => {
  const { colors } = useMantineTheme();

  const totalIncomingFlowRate = useMemo(() => {
    if (!data?.incoming?.length) return 0n;

    return data.incoming.reduce((total, item) => total + getBeamFlowRate(item), 0n);
  }, [data]);

  const totalOutgoingFlowRate = useMemo(() => {
    if (!data?.outgoing?.length) return 0n;

    return data.outgoing.reduce((total, item) => total + getBeamFlowRate(item), 0n);
  }, [data]);

  const moreIncomingThanOutgoing = totalIncomingFlowRate >= totalOutgoingFlowRate;
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
        outgoing={totalOutgoingFlowRate}
        boosted={0n}
      />
      <Group justify="space-between">
        <Text c={colors.green[7]} fz="sm">
          Incoming
        </Text>
        <Text c={colors.purple[7]} fz="sm">
          Outgoing
        </Text>
      </Group>
      <Group justify="space-between">
        <Text fz="sm">{flowratePerSecondToMonth(totalIncomingFlowRate, 'no-label')}</Text>
        <Text fz="sm">{flowratePerSecondToMonth(totalOutgoingFlowRate, 'no-label')}</Text>
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
              (Number(item.units || 0) / Number(item.beamPool?.totalUnits || 1)) *
              100
            ).toFixed(2)
          );

          return (
            <TableRow
              sending={true}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.to?.profile?.pfp_url || ''}
              avatarOnClick={
                item.to?.fid ? () => navigate(`/user/${item.to.fid}`) : undefined
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
              (Number(item.units || 0) / Number(item.beamPool?.totalUnits || 1)) *
              100
            ).toFixed(2)
          );

          return (
            <TableRow
              sending={false}
              showConnection={false}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.from?.profile?.pfp_url || ''}
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
  const { getAuthHeaders } = useUser();
  const publicClient = usePublicClient();

  useCTA({
    label: undefined,
    onClick: undefined,
    extraDeps: [fid],
  });

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
        headers
      );

      return transformUserByPk(
        data,
        async () => headers,
        parsedFid ? [parsedFid.toString()] : []
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
      if (!publicClient || !parsedViewedAddress || !unconnectedPoolAddresses.length) {
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

  if (!isValidFid) {
    return (
      <PageLayout>
        <ErrorDisplay title="Invalid user" description="Invalid FID in route." />
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

  return (
    <PageLayout>
      <Group justify="center" mb="xl">
        <Avatar
          src={viewedProfile?.pfp_url}
          alt={viewedProfile?.display_name || viewedProfile?.username || 'User'}
          size={80}
          radius="xl"
        />
      </Group>
      <ViewBalanceDisplay
        data={viewedUser}
        userBalance={viewedUserBalance + unconnectedClaimable}
        userBalanceFetchedAt={viewedUserBalanceFetchedAt}
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
