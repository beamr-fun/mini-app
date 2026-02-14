import { Progress, useMantineTheme } from '@mantine/core';
import classes from '../../styles/effects.module.css';

type FlowProgressBarProps = {
  connected: bigint;
  notConnected: bigint;
  outgoing: bigint;
  boosted?: bigint;
};

export const FlowProgressBar = ({
  connected,
  notConnected,
  outgoing,
  boosted = 0n,
}: FlowProgressBarProps) => {
  const { colors } = useMantineTheme();

  const total = connected + notConnected + outgoing;

  if (total === 0n) {
    return (
      <Progress.Root mb="xs" bg={colors.dark[5]}>
        <Progress.Section color={colors.dark[5]} value={100} />
      </Progress.Root>
    );
  }

  const totalNum = Number(total);
  const safeBoosted = boosted > 0n ? boosted : 0n;
  // Outgoing totals in the balance card are creator-side only; map boost into
  // that outgoing width proportionally so it remains visible without taking over.
  const visualBoosted =
    outgoing > 0n && safeBoosted > 0n
      ? (outgoing * safeBoosted) / (outgoing + safeBoosted)
      : 0n;
  const baseOutgoing = outgoing - visualBoosted;
  const connectedPct = (Number(connected) / totalNum) * 100;
  const notConnectedPct = (Number(notConnected) / totalNum) * 100;
  const baseOutgoingPct = (Number(baseOutgoing) / totalNum) * 100;
  const boostedOutgoingPct = (Number(visualBoosted) / totalNum) * 100;

  return (
    <Progress.Root mb="xs" bg={colors.dark[5]}>
      <Progress.Section color={colors.green[7]} value={connectedPct} />
      <Progress.Section
        color={colors.green[7]}
        value={notConnectedPct}
        striped
        className={classes.glow}
      />
      {baseOutgoing > 0n && (
        <Progress.Section color={colors.purple[7]} value={baseOutgoingPct} />
      )}
      {visualBoosted > 0n && (
        <Progress.Section color={colors.blue[5]} value={boostedOutgoingPct} />
      )}
    </Progress.Root>
  );
};
