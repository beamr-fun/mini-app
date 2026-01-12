import { Progress, useMantineTheme } from '@mantine/core';
import classes from '../../styles/effects.module.css';

type FlowProgressBarProps = {
  connected: bigint;
  notConnected: bigint;
  outgoing: bigint;
};

export const FlowProgressBar = ({
  connected,
  notConnected,
  outgoing,
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
  const connectedPct = (Number(connected) / totalNum) * 100;
  const notConnectedPct = (Number(notConnected) / totalNum) * 100;
  const outgoingPct = (Number(outgoing) / totalNum) * 100;

  return (
    <Progress.Root mb="xs" bg={colors.dark[5]}>
      <Progress.Section color={colors.green[7]} value={connectedPct} />
      <Progress.Section
        color={colors.green[7]}
        value={notConnectedPct}
        striped
        className={classes.glow}
      />
      <Progress.Section color={colors.purple[7]} value={outgoingPct} />
    </Progress.Root>
  );
};
