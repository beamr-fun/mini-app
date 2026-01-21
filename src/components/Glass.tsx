import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';

import classes from '../styles/layout.module.css';

export const Glass = (props: BoxProps & { children: ReactNode }) => {
  return <Box {...props} className={classes.glass} />;
};
