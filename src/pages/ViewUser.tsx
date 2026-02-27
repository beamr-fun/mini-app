import {
  Card,
  Group,
  Loader,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { flowratePerSecondToMonth } from '../utils/common';
import { PageLayout } from '../layouts/PageLayout';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { useUser } from '../hooks/useUser';
import { fetchProfiles, fetchUserPrefs } from '../utils/api';
import { gqlClient } from '../utils/envio';
import { network } from '../utils/setup';
import { transformUserByPk, UserTransformed } from '../transforms/user';
import { ViewUserDocument } from '../generated/graphql';
import { ADDR } from '../const/addresses';
import { useToken } from '../hooks/useToken';
import { Abi, Address, isAddress } from 'viem';
import { poolAbi } from '../abi/Pool';
import { usePublicClient } from 'wagmi';
import { getFlowDistributionRate } from '../utils/reads';
import { ArrowLeft } from 'lucide-react';
import { Glass } from '../components/Glass';
import sdk from '@farcaster/miniapp-sdk';
import { BalanceDisplay } from '../components/ViewUser/BalanceDisplay';
import { ProfileHeader } from '../components/ViewUser/ProfileHeader';
import { Receiving } from '../components/ViewUser/Receiving';
import { Sending } from '../components/ViewUser/Sending';
import { getBeamFlowRate } from '../components/ViewUser/flowRates';

export const ViewUser = () => {
  const { fid } = useParams();
  const [tab, setTab] = useState('Outgoing');
  const [fallbackBalanceFetchedAt] = useState(() => new Date());
  const { getAuthHeaders, startingRoute, user: loggedInUser } = useUser();
  const publicClient = usePublicClient();
  const navigate = useNavigate();
  const location = useLocation();

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

      const data = await gqlClient.request(
        ViewUserDocument,
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
    const backTo = (location.state as { backTo?: string } | null)?.backTo;
    navigate(backTo || startingRoute || '/global', { replace: true });
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
      <ProfileHeader
        displayName={viewedDisplayName}
        username={viewedUsername}
        pfpUrl={viewedProfile?.pfp_url}
        onAvatarClick={onAvatarClick}
      />
      <BalanceDisplay
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
        {tab === 'Outgoing' && <Sending data={viewedUser} />}
        {tab === 'Incoming' && <Receiving data={viewedUser} />}
      </Card>
    </PageLayout>
  );
};
