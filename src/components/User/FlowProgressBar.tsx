import { Progress, useMantineTheme } from '@mantine/core';
import classes from '../../styles/effects.module.css';
import React from 'react';

type FlowProgressBarProps = {
  connected: bigint;
  notConnected: bigint;
  outgoing: bigint;
};

export const FlowProgressBar = ({}: {}) => {
  const { colors } = useMantineTheme();

  return (
    <Progress.Root mb="xs" bg={colors.dark[5]}>
      <Progress.Section color={colors.green[7]} value={23} />
      <Progress.Section
        color={colors.green[7]}
        value={23}
        striped
        className={classes.glow}
      />
    </Progress.Root>
  );
};
