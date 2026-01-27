import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';

import classes from '../styles/layout.module.css';

export const Glass = (
  props: BoxProps & { children: ReactNode; onClick?: (args: any) => any }
) => {
  return <Box {...props} className={classes.glass} />;
};
