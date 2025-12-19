import {
  ActionIcon,
  Card,
  Group,
  Progress,
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
import { CircleAlert, TrendingUp, Zap } from 'lucide-react';
import classes from '../styles/effects.module.css';

export const BalanceDisplay = ({
  openSwap,
  setTab,
}: {
  openSwap: () => void;
  setTab: (tab: string) => void;
}) => {
  const { colors } = useMantineTheme();
  const { userSubscription, userBalance, userBalanceFetchedAt } = useUser();

  const totalIncomingFlowRate = useMemo(() => {
    if (!userSubscription?.incoming) {
      return 0n;
    }

    if (userSubscription.incoming.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.incoming.forEach((item) => {
      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);
      total += beamFlowRate;
    });

    return total;
  }, [userSubscription?.incoming]);

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

    return total;
  }, [userSubscription?.outgoing]);

  const amtConnected = useMemo(() => {
    if (!userSubscription) {
      return 0;
    }

    let total = 0;

    userSubscription.incoming.forEach((item) => {
      if (item.isReceiverConnected) {
        total += 1;
      }
    });
    return total;
  }, [userSubscription]);

  const hasUnconnected =
    amtConnected < (userSubscription?.incoming.length || 0);

  const totalIncomingPerMonth = totalIncomingFlowRate
    ? flowratePerSecondToMonth(totalIncomingFlowRate)
    : 0n;

  const totalOutgoingPerMonth = totalOutgoingFlowRate
    ? flowratePerSecondToMonth(totalOutgoingFlowRate)
    : 0n;

  const moreIncomingThanOutgoing =
    totalIncomingFlowRate >= totalOutgoingFlowRate;

  const netFlowRate = moreIncomingThanOutgoing
    ? totalIncomingFlowRate - totalOutgoingFlowRate
    : totalOutgoingFlowRate - totalIncomingFlowRate;

  const percentageOfIncoming =
    totalIncomingFlowRate && totalOutgoingFlowRate
      ? Number(
          (totalIncomingFlowRate * 10000n) /
            (totalIncomingFlowRate + totalOutgoingFlowRate)
        ) / 100
      : 0;

  const netMonthly = flowratePerSecondToMonth(netFlowRate);

  return (
    <Card mb="md">
      <Group gap={2} c={colors.gray[3]} mb={'md'}>
        <BeamrNav size={18} />
        <Text mr={6}>Beamr</Text>
        <DancingText
          userBalance={userBalance || 0n}
          fetchedAt={userBalanceFetchedAt || new Date()}
          flowRate={totalIncomingFlowRate - totalOutgoingFlowRate}
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
      <Group
        c={moreIncomingThanOutgoing ? colors.green[7] : colors.purple[7]}
        gap={4}
        mb={'sm'}
      >
        <TrendingUp size={18} />
        <Text fz="sm">
          Net Rate {moreIncomingThanOutgoing ? '+' : '-'}
          {netMonthly}
        </Text>
      </Group>
      <Progress
        mb="xs"
        color={colors.green[7]}
        bg={colors.purple[7]}
        value={percentageOfIncoming}
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
        <Text fz="sm">{totalIncomingPerMonth}</Text>
        <Text fz="sm">{totalOutgoingPerMonth}</Text>
      </Group>
      <Group gap={'xs'} mt="md" justify="space-between">
        <Tooltip
          w={300}
          multiline
          label="Connect to Beams in order to stream to your wallet."
        >
          <Group
            gap={4}
            className={hasUnconnected ? classes.glow : undefined}
            onClick={() => setTab('Receiving')}
            style={{
              cursor: 'pointer',
            }}
          >
            {hasUnconnected && (
              <CircleAlert
                size={14}
                style={{ transform: 'translateY(-1px)' }}
              />
            )}
            <Text
              fz="sm"
              td="underline"
              c={hasUnconnected ? colors.gray[0] : colors.gray[3]}
            >
              {hasUnconnected ? 'Unconnected streams.' : 'All connected'}
            </Text>
          </Group>
        </Tooltip>
        <Tooltip
          w={250}
          multiline
          label={`Max 250 connections per user. You are connected to ${amtConnected} beams.`}
        >
          <Group gap={4}>
            <Text fz="sm">{amtConnected}/250</Text>
            <Zap
              size={16}
              color={colors.gray[3]}
              style={{
                transform: 'translateY(-1px)',
              }}
            />
          </Group>
        </Tooltip>
      </Group>
    </Card>
  );
};
