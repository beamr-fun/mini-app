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
import { useMemo } from 'react';
import { flowratePerSecondToMonth } from '../../utils/common';
import { BeamrNav } from '../svg/BeamrNav';
import { DancingText } from '../DancingText';
import { IconTransfer } from '../svg/IconTransfer';
import { CircleAlert, Info } from 'lucide-react';
import classes from '../../styles/effects.module.css';
import { usePoolAccount } from '../../hooks/usePoolAccount';
import { FlowProgressBar } from './FlowProgressBar';

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
  } = useUser();

  const { userPoolAddress } = usePoolAccount();

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
      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);
      total += beamFlowRate;
    });

    if (collectionFlowRate) {
      total += collectionFlowRate;
    }

    return total;
  }, [userSubscription?.outgoing, collectionFlowRate]);

  const hasUnconnected = amtUnconnected > 0;

  const realIncomingPerMonth = connectedIncoming
    ? flowratePerSecondToMonth(connectedIncoming)
    : 0n;

  const unconnectedIncomingPerMonth = unconnectedIncoming
    ? flowratePerSecondToMonth(unconnectedIncoming)
    : 0n;

  const realOutgoingPerMonth = totalOutgoingFlowRate
    ? flowratePerSecondToMonth(totalOutgoingFlowRate)
    : 0n;

  const moreIncomingThanOutgoing = connectedIncoming >= totalOutgoingFlowRate;

  const netFlowRate = moreIncomingThanOutgoing
    ? connectedIncoming - totalOutgoingFlowRate
    : totalOutgoingFlowRate - connectedIncoming;

  const netMonthly = flowratePerSecondToMonth(netFlowRate);

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
      <Group gap={4} mb={'sm'}>
        <Text
          fz="sm"
          c={moreIncomingThanOutgoing ? colors.green[7] : colors.purple[7]}
        >
          Net Rate {moreIncomingThanOutgoing ? '+' : '-'}
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
      <FlowProgressBar
        connected={connectedIncoming}
        notConnected={unconnectedIncoming}
        outgoing={totalOutgoingFlowRate}
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
        <Text fz="sm">{realIncomingPerMonth}</Text>
        <Group gap={6}>
          <Text fz="sm">{realOutgoingPerMonth}</Text>
          <Tooltip
            w={250}
            multiline
            label="Amount includes 2.5% Beamr team fee + 2.5% Beamr Burn fee"
          >
            <Info size={12} />
          </Tooltip>
        </Group>
      </Group>
      {userSubscription?.incoming && userSubscription?.incoming?.length > 0 && (
        <Group gap={'xs'} mt="md">
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
                    Only connected pool streams are included in your real-time
                    $BEAMR balance. Unconnected pool funds are held in escrow.
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
          {/* <Tooltip
            w={250}
            multiline
            label={`Max 256 connections per user. You are connected to ${amtUnconnected} beams.`}
          >
            <Group gap={4}>
              <Zap
                size={16}
                color={colors.gray[3]}
                style={{
                  transform: 'translateY(-1px)',
                }}
              />
            </Group>
          </Tooltip> */}
        </Group>
      )}
    </Card>
  );
};
