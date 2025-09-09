import {
  ConvertCSSVariablesInput,
  createTheme,
  MantineTheme,
} from '@mantine/core';

const BLUE = [];
const RED = [];
const GREEN = [];

export const theme = createTheme({
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  fontFamily: 'Pretendard, sans-serif',

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  spacing: {},
  headings: { fontFamily: 'var(--font-sans)' },
  /* Put your mantine theme override here */
});
export const cssVariablesResolver = (
  theme: MantineTheme
): ConvertCSSVariablesInput => ({
  variables: { '--mantine-color-body': '#0F0E0E' },
  dark: { '--mantine-color-body': '#0F0E0E' },
  light: { '--mantine-color-body': 'pink' },
});
