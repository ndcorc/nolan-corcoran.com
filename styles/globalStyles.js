import { MantineThemeOverride } from '@mantine/core';
import * as colors from './colors';

export const fonts = [
  'Newsreader, serif',
  'Montserrat, sans-serif',
  'Merriweather, sans-serif',
  'Source Sans Pro, sans-serif',
  'Simplifia, sans-serif',
  'Blogger, sans',
  'Roboto, sans-serif',
];

export const lightTheme = {
  colorScheme: 'light',
  defaultRadius: '10px',
  colors: {
    background: ['#eeeee9'],
    surface: ['#F9F8F1'],
    disabled: ['rgba(36,35,34,0.9)'],
    hint: ['#2f0000'],
    primary: colors.primaryL,
    secondary: colors.secondaryL,
    brown: colors.brown,
    deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
  },
  primaryColor: 'primary',
  defaultGradient: {
    deg: 0,
    from: colors.primaryL[4],
    to: colors.primaryL[7],
  },
  primaryShade: 6,
  fontFamily: fonts[5],
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  headings: {
    fontFamily: fonts[5],
    sizes: {
      h1: { fontSize: '3.5rem', fontWeight: 400 },
      h2: { fontSize: '2.75rem', fontWeight: 400 },
      h3: { fontSize: '2rem', fontWeight: 400 },
      h4: { fontSize: '1.5rem', fontWeight: 400 },
      h5: { fontSize: '1.2rem', fontWeight: 400 },
      h6: { fontSize: '0.75rem', fontWeight: 400 },
    },
  },
  other: {
    background: '#eeeee9',
    surface: '#F9F8F1',
    primary: colors.primaryL[6],
    secondary: colors.secondaryL[6],
    text: {
      primary: '#22211f',
      secondary: '#3e3b37',
      disabled: 'rgba(121,121,121,0.66)',
      hint: '#2f0000',
    },
    warning: '#c39247',
    info: '#95b4ce',
    success: '#97ad88',
    divider: '#595755',
    fonts,
  },
};

export const darkTheme = {
  colorScheme: 'dark',
  defaultRadius: '10px',
  colors: {
    background: ['#161618'],
    surface: ['#212123'],
    disabled: ['rgba(121,121,121,0.66)'],
    hint: ['#2f0000'],
    primary: colors.primaryD,
    secondary: colors.secondaryD,
    brown: colors.brown,
    deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
  },
  defaultGradient: {
    deg: 0,
    from: colors.primaryD[4],
    to: colors.primaryD[7],
  },
  primaryShade: 6,
  fontFamily: fonts[5],
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  headings: {
    fontFamily: fonts[5],
    sizes: {
      h1: { fontSize: '3.5rem', fontWeight: 400 },
      h2: { fontSize: '2.75rem', fontWeight: 400 },
      h3: { fontSize: '2rem', fontWeight: 400 },
      h4: { fontSize: '1.5rem', fontWeight: 400 },
      h5: { fontSize: '1.2rem', fontWeight: 400 },
      h6: { fontSize: '0.75rem', fontWeight: 400 },
    },
  },
  other: {
    background: '#161618',
    surface: '#212123',
    primary: colors.primaryD[6],
    secondary: colors.secondaryD[6],
    text: {
      primary: '#dee4ee',
      secondary: '#969ba1',
      disabled: 'rgba(121,121,121,0.66)',
      hint: '#2f0000',
    },
    warning: '#c39247',
    info: '#95b4ce',
    success: '#97ad88',
    divider: '#1C2027',
    fonts,
  },
};
