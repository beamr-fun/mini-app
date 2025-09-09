import {
  ConvertCSSVariablesInput,
  createTheme,
  MantineTheme,
} from '@mantine/core';

const GRAY = [
  '#F2F2F2',
  '#E3E3E3',
  '#C8C8C8',
  '#AEADAD',
  '#949494',
  '#7B7B7B',
  '#636363',
  '#363636',
  '#222121',
  '#0F0E0E',
];
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
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
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
