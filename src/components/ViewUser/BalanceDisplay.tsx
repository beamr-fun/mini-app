import { Card, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { BeamrNav } from '../svg/BeamrNav';
import { DancingText } from '../DancingText';
import { FlowProgressBar } from '../User/FlowProgressBar';
import { flowratePerSecondToMonth, formatUnitBalance } from '../../utils/common';
import { UserTransformed } from '../../transforms/user';
import classes from '../../styles/effects.module.css';
import {
  getBeamFlowRate,
  getOutgoingBeamFlowRate,
  getOutgoingBoostFlowRate,
} from './flowRates';

export const BalanceDisplay = ({
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
