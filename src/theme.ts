import {
  ConvertCSSVariablesInput,
  createTheme,
  MantineTheme,
} from '@mantine/core';
import typographyClasses from './styles/typography.module.css';

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
] as const;

const BLUE = [
  '#F2FDFF',
  '#E6FAFF',
  '#BFF1FF',
  '#99E7FF',
  '#4DCCFF',
  '#00ABFF',
  '#0091E6',
  '#005299',
  '#003773',
  '#00204A',
] as const;

const DIM = [
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
  GRAY[4],
] as const;

const BRIGHT = [
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
  GRAY[0],
] as const;

const RED = [
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
  '#F45744',
] as const;
const GREEN = [
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
  '#63B18A',
] as const;

const PURPLE = [
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
  '6D68C4',
] as const;

export const theme = createTheme({
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  colors: {
    gray: GRAY,
    dim: DIM,
    bright: BRIGHT,
    blue: BLUE,
    red: RED,
    green: GREEN,
    purple: PURPLE,
  },
  fontFamily: 'Pretendard, sans-serif',
  components: {
    Text: {
      classNames: { root: typographyClasses.text },
    },
  },
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
  variables: {
    '--mantine-color-body': 'var(--mantine-color-gray-9)',
    '--mantine-color-text': 'var(--mantine-color-gray-1)',
    '--mantine-color-dimmed': 'var(--mantine-color-gray-4)',
  },
  dark: {
    '--mantine-color-body': 'var(--mantine-color-gray-9)',
    '--mantine-color-text': 'var(--mantine-color-gray-1)',
    '--mantine-color-dimmed': 'var(--mantine-color-gray-4)',
  },
  light: {
    '--mantine-color-body': 'var(--mantine-color-gray-0)',
    '--mantine-color-text': 'var(--mantine-color-gray-8)',
    '--mantine-color-dimmed': 'var(--mantine-color-gray-5)',
  },
});
