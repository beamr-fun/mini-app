import {
  ActionIcon,
  Box,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { useEffect, useMemo } from 'react';
import { flowratePerSecondToMonth } from '../../utils/common';
import { BeamrNav } from '../svg/BeamrNav';
import { DancingText } from '../DancingText';
import { IconTransfer } from '../svg/IconTransfer';
import { CircleAlert, Info, Share, Share2 } from 'lucide-react';
import classes from '../../styles/effects.module.css';
import { usePoolAccount } from '../../hooks/usePoolAccount';
import { FlowProgressBar } from './FlowProgressBar';
import sdk from '@farcaster/miniapp-sdk';
import { notifications } from '@mantine/notifications';

function formatList(items: string[], separator = ', ', lastSeparator = ' & ') {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(separator)}${lastSeparator}${items.at(-1)}`;
}

export const BalanceDisplay = ({
  openSwap,
  setTab,
}: {
  openSwap: () => void;
  setTab: (tab: string) => void;
}) => {
  const { colors } = useMantineTheme();
  const {
    userSubscription,
    userBalance,
    userBalanceFetchedAt,
    collectionFlowRate,
    user,
  } = useUser();

  const { userPoolAddress } = usePoolAccount();

  const getOutgoingBeamFlowRate = (item: {
    beamPool?: {
      creatorFlowRate?: bigint | string;
      totalUnits?: bigint | string;
    } | null;
    units?: bigint | string;
  }) => {
    const creatorFlowRate = BigInt(item.beamPool?.creatorFlowRate || 0);
    const totalUnits = BigInt(item.beamPool?.totalUnits || 0);
    const units = BigInt(item.units || 0);

    if (totalUnits === 0n) {
      return 0n;
    }

    return (creatorFlowRate / totalUnits) * units;
  };

  const getOutgoingBoostFlowRate = (item: {
    beamPool?: {
      flowRate?: bigint | string;
      creatorFlowRate?: bigint | string;
      totalUnits?: bigint | string;
    } | null;
    units?: bigint | string;
  }) => {
    const flowRate = BigInt(item.beamPool?.flowRate || 0);
    const creatorFlowRate = BigInt(item.beamPool?.creatorFlowRate || 0);
    const totalUnits = BigInt(item.beamPool?.totalUnits || 0);
    const units = BigInt(item.units || 0);

    if (totalUnits === 0n) {
      return 0n;
    }

    const boostedFlowRate = flowRate - creatorFlowRate;

    if (boostedFlowRate <= 0n) {
      return 0n;
    }

    return (boostedFlowRate / totalUnits) * units;
  };

  const {
    connectedIncoming,
    amtUnconnected,
    unconnectedIncoming,
    amtConnected,
  } = useMemo(() => {
    if (!userSubscription?.incoming) {
      return {
        totalIncomingFlowRate: 0n,
        connectedIncoming: 0n,
        unconnectedIncoming: 0n,
        amtUnconnected: 0,
        amtConnected: 0,
      };
    }

    if (userSubscription.incoming.length === 0) {
      return {
        totalIncomingFlowRate: 0n,
        connectedIncoming: 0n,
        unconnectedIncoming: 0n,
        amtUnconnected: 0,
        amtConnected: 0,
      };
    }

    let total = 0n;
    let connected = 0n;
    let unconnected = 0n;
    let amtUnconnected = 0;
    let amtConnected = 0;

    userSubscription.incoming.forEach((item) => {
      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);

      const receivingAddress = item.id.split('_')?.[1];

      if (
        userPoolAddress &&
        receivingAddress?.toLowerCase() !== userPoolAddress.toLowerCase()
      ) {
        return;
      }

      if (item.isReceiverConnected) {
        connected += beamFlowRate;
        amtConnected += 1;
      } else {
        amtUnconnected += 1;
        unconnected += beamFlowRate;
      }

      total += beamFlowRate;
    });

    return {
      totalIncomingFlowRate: total,
      connectedIncoming: connected,
      unconnectedIncoming: unconnected,
      amtUnconnected,
      amtConnected,
    };
  }, [userSubscription?.incoming, userPoolAddress]);

  const totalOutgoingFlowRate = useMemo(() => {
    if (!userSubscription?.outgoing) {
      return 0n;
    }

    if (userSubscription.outgoing.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.outgoing.forEach((item) => {
      total += getOutgoingBeamFlowRate(item);
    });

    if (collectionFlowRate) {
      total += collectionFlowRate;
    }

    return total;
  }, [userSubscription?.outgoing, collectionFlowRate]);

  const totalBoostedFlowRate = useMemo(() => {
    if (!userSubscription?.outgoing || userSubscription.outgoing.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.outgoing.forEach((item) => {
      total += getOutgoingBoostFlowRate(item);
    });

    return total;
  }, [userSubscription?.outgoing]);

  const hasUnconnected = amtUnconnected > 0;

  const realIncomingPerMonth = connectedIncoming
    ? flowratePerSecondToMonth(connectedIncoming, 'no-label')
    : 0n;

  const unconnectedIncomingPerMonth = unconnectedIncoming
    ? flowratePerSecondToMonth(unconnectedIncoming, 'no-label')
    : 0n;

  const realOutgoingPerMonth = totalOutgoingFlowRate
    ? flowratePerSecondToMonth(totalOutgoingFlowRate, 'no-label')
    : 0n;
  const boostedPerMonth = totalBoostedFlowRate
    ? flowratePerSecondToMonth(totalBoostedFlowRate, 'no-label')
    : 0n;
  const hasBoost = totalBoostedFlowRate > 0n;
  const displayedOutgoingFlowRate = hasBoost
    ? totalOutgoingFlowRate + totalBoostedFlowRate
    : totalOutgoingFlowRate;
  const displayedOutgoingPerMonth = displayedOutgoingFlowRate
    ? flowratePerSecondToMonth(displayedOutgoingFlowRate, 'no-label')
    : 0n;

  const moreIncomingThanOutgoing = connectedIncoming >= totalOutgoingFlowRate;

  const netFlowRate = moreIncomingThanOutgoing
    ? connectedIncoming - totalOutgoingFlowRate
    : totalOutgoingFlowRate - connectedIncoming;

  const netMonthly = flowratePerSecondToMonth(netFlowRate, 'no-label');

  const shareSending = (isNewPool = false) => {
    if (!userSubscription?.outgoing || userSubscription.outgoing.length === 0) {
      notifications.show({
        title: 'No outgoing streams',
        message: 'You have no outgoing streams to share.',
        color: 'red',
      });
      return;
    }

    const topOutgoing = userSubscription?.outgoing?.sort((a, b) => {
      const beamFlowRateA = getOutgoingBeamFlowRate(a);
      const beamFlowRateB = getOutgoingBeamFlowRate(b);

      return beamFlowRateB > beamFlowRateA ? 1 : -1;
    });

    if (isNewPool) {
      const names = topOutgoing
        ?.map((item) => item.to.profile?.username)
        .filter(Boolean) as string[];

      const fids = topOutgoing.map((item) => item.to.fid).slice(0, 6);

      sdk.actions.composeCast({
        embeds: [
          `https://app.beamr.fun/og/share-embed?sender=${user?.fid}&receivers=${fids.join(',')}&flowrate=0`,
        ],
        text: `Just launched my @beamr microsubscription pool: I'm streaming ${realOutgoingPerMonth} $BEAMR/mo to the Farcasters I interact with.

${formatList(names.map((n) => `@${n}`))} are my first microsubs.

Claim your $BEAMR streams and start your own pool in the app:`,
      });
    } else {
      const top6 = topOutgoing?.slice(0, 6);

      const top6Names = top6
        ?.map((item) => item.to.profile?.username)
        .filter(Boolean) as string[];

      const top6Fids = top6?.map((item) => item.to.fid).filter(Boolean);

      sdk.actions.composeCast({
        embeds: [
          `https://app.beamr.fun/og/share-embed?sender=${user?.fid}&receivers=${top6Fids.join(',')}&flowrate=0`,
        ],
        text: `I'm streaming ${realOutgoingPerMonth} $BEAMR/mo to Farcasters I interact with.
       
${formatList(top6Names.map((name) => `@${name}`))} are my top microsubs.

Claim your $BEAMR streams and start your own pool in the app:`,
      });
    }
  };

  useEffect(() => {
    if (!userSubscription && realOutgoingPerMonth) return;

    const hasCreatedNewPool = localStorage.getItem('hasOnboarded');

    if (hasCreatedNewPool) {
      shareSending(true);
      localStorage.removeItem('hasOnboarded');
    }
  }, [userSubscription, realOutgoingPerMonth]);

  const hasOutgoingAndPool =
    userSubscription?.outgoing &&
    userSubscription?.outgoing.length > 2 &&
    userSubscription?.pools &&
    userSubscription?.pools.length > 0;

  return (
    <Card mb="md">
      <Group gap={2} c={colors.gray[3]} mb={'md'}>
        <BeamrNav size={18} />
        <Text mr={6}>Beamr</Text>
        <DancingText
          userBalance={userBalance || 0n}
          fetchedAt={userBalanceFetchedAt || new Date()}
          flowRate={connectedIncoming - totalOutgoingFlowRate}
          fw={500}
          fz={'lg'}
          c={colors.gray[0]}
          mr={'auto'}
        />

        <ActionIcon onClick={openSwap}>
          <Group gap={6}>
            <IconTransfer />
            <Text
              fz="xs"
              style={{ transform: 'translateY(-1px)' }}
              c={colors.blue[5]}
            >
              Buy
            </Text>
          </Group>
        </ActionIcon>
      </Group>
      <Group gap={4} mb="xs">
        <Text
          fz="sm"
          c={moreIncomingThanOutgoing ? colors.green[7] : colors.purple[7]}
        >
          Net Monthly Rate {moreIncomingThanOutgoing ? '+' : '-'}
          {netMonthly}
        </Text>
        {hasUnconnected && (
          <Tooltip
            multiline
            w={300}
            label={
              <Text fz={'sm'}>
                Unconnected streams are not included in net rate. Click to
                manage connections
              </Text>
            }
          >
            <Text
              fz="sm"
              className={classes.glow}
              onClick={() => setTab('Receiving')}
              style={{ cursor: 'pointer' }}
            >
              (+{unconnectedIncomingPerMonth})
            </Text>
          </Tooltip>
        )}
      </Group>
      {hasBoost && (
        <Group gap={6} mb="xs">
          <Text fz="sm" c={colors.blue[4]}>
            Boosted +{boostedPerMonth}
          </Text>
        </Group>
      )}
      <FlowProgressBar
        connected={connectedIncoming}
        notConnected={unconnectedIncoming}
        outgoing={totalOutgoingFlowRate}
        boosted={totalBoostedFlowRate}
      />

      <Group justify="space-between">
        <Text c={colors.green[7]} fz="sm">
          Incoming
        </Text>
        <Group gap={6}>
          <Text c={colors.purple[7]} fz="sm">
            {hasBoost ? 'Total Outgoing' : 'Outgoing'}
          </Text>
        </Group>
      </Group>
      <Group justify="space-between">
        <Text fz="sm">{realIncomingPerMonth}</Text>
        <Group gap={6}>
          <Text fz="sm">{displayedOutgoingPerMonth}</Text>
          <Tooltip
            w={250}
            multiline
            label={
              hasBoost
                ? `Amount includes Beamr boosts (+${boostedPerMonth}) and 2.5% Beamr team fee + 2.5% Beamr Burn fee`
                : 'Amount includes 2.5% Beamr team fee + 2.5% Beamr Burn fee'
            }
          >
            <Info size={12} />
          </Tooltip>
        </Group>
      </Group>

      <Group mt="md">
        {userSubscription?.incoming &&
          userSubscription?.incoming?.length > 0 && (
            <Group gap={'xs'}>
              <Tooltip
                w={300}
                multiline
                label={
                  <Stack p="sm">
                    <Group wrap="nowrap" align="start" gap="xs">
                      <Box w={16}>
                        <Info size={16} color={colors.gray[2]} />
                      </Box>
                      <Text fz={'sm'} c={colors.gray[2]}>
                        Only connected pool streams are included in your
                        real-time $BEAMR balance. Unconnected pool funds are
                        held in escrow.
                      </Text>
                    </Group>
                    <Group wrap="nowrap" align="start" gap="xs">
                      <Info size={16} color={colors.gray[3]} />
                      <Text fz="sm" c={colors.gray[3]}>
                        Max 256 connections per user.
                      </Text>
                    </Group>
                  </Stack>
                }
              >
                <Group
                  gap={4}
                  className={hasUnconnected ? classes.glow : undefined}
                  onClick={() => setTab('Receiving')}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Text c={hasUnconnected ? colors.gray[0] : colors.gray[3]}>
                    {hasUnconnected ? 'Unconnected streams' : 'All connected'} (
                    {amtConnected}/256)
                  </Text>
                  {hasUnconnected && (
                    <CircleAlert
                      size={14}
                      // style={{ transform: 'translateY(1px)' }}
                    />
                  )}
                </Group>
              </Tooltip>
            </Group>
          )}
        {hasOutgoingAndPool && (
          <Tooltip label="Share your outgoing beams on Farcaster">
            <ActionIcon ml="auto" onClick={() => shareSending(false)}>
              <Share size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Card>
  );
};
