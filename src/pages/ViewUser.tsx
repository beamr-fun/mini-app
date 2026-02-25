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
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { flowratePerSecondToMonth } from '../utils/common';
import { PageLayout } from '../layouts/PageLayout';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { TableHeader, TableRow } from '../components/User/TableItems';
import { FlowProgressBar } from '../components/User/FlowProgressBar';
import { useUser } from '../hooks/useUser';
import { fetchProfiles } from '../utils/api';
import { gqlClient } from '../utils/envio';
import { network } from '../utils/setup';
import { transformUserByPk, UserTransformed } from '../transforms/user';
import { LoggedInUserSubscription } from '../generated/graphql';
import { useCTA } from '../hooks/useCTA';

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

const ViewBalanceDisplay = ({ data }: { data: UserTransformed }) => {
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

  return (
    <Card mb="md">
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
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const ViewReceiving = ({ data }: { data: UserTransformed }) => {
  const { colors } = useMantineTheme();

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
  const { getAuthHeaders } = useUser();

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
      <ViewBalanceDisplay data={viewedUser} />
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
