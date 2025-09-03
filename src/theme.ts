import { createTheme } from '@mantine/core';

const BLUE = [];
const RED = [];
const GREEN = [];

export const theme = createTheme({
  /* Put your mantine theme override here */
});
export const cssVariablesResolver = (theme: any) => ({
  variables: { '--mantine-color-body': '#0F0E0E' },
  dark: { '--mantine-color-body': '#0F0E0E' },
  light: { '--mantine-color-body': 'pink' },
});
