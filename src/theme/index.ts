/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/theme/index.ts

/** Custom theme */
import {
    DEFAULT_THEME,
    MantineThemeColors,
    createTheme,
    mergeMantineTheme,
    rem
} from '@mantine/core';

export const fonts = [
    'Newsreader, serif',
    'Montserrat, sans-serif',
    'Merriweather, sans-serif',
    'Source Sans Pro, sans-serif',
    'Simplifia, sans-serif',
    'Blogger, sans',
    'Roboto, sans-serif',
    'Lato, sans-serif',
    'IBM Plex Sans, sans-serif',
    'IBM Plex Serif, serif'
];

export const colors: MantineThemeColors = {
    ...DEFAULT_THEME.colors,
    brand: [
        '#FFF5F5',
        '#FFE3E3',
        '#A45252',
        '#923939',
        '#802121',
        '#6E0909', // Primary
        '#5C0000',
        '#4A0000',
        '#380000',
        '#260000'
    ],
    navy: [
        '#0092BD',
        '#008FB9',
        '#008BB3',
        '#0088B0',
        '#0084AC',
        '#007C9F',
        '#027595',
        '#086E8B',
        '#0C6883',
        '#0E627B'
    ],
    dark: [
        '#bdc0c6', // 0 → dark-50
        '#9da0aa', // 1 → dark-100
        '#7c808d', // 2 → dark-200
        '#636773', // 3 → dark-300
        '#303239', // 4 → dark-400  hover / elevated surfaces
        '#222428', // 5 → dark-500  card backgrounds
        '#1a1b1e', // 6 → dark-600  page / body background
        '#141517', // 7 → dark-700
        '#0f1011', // 8 → dark-800
        '#0a0b0c', // 9 → dark-900
    ]    
};

export const breakpoints = {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em'
};

export const theme = mergeMantineTheme(
    DEFAULT_THEME,
    createTheme({
        fontFamily: fonts[5],
        fontFamilyMonospace: 'Cormorant Garamond, serif',
        breakpoints,
        primaryColor: 'brand',
        colors,
        white: '#EDEDE8',
        black: '#121212',
        primaryShade: 6,
        shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            lg: '5px 5px 3px rgba(0, 0, 0, .25)'
        },
        fontSizes: {
            xs: rem(10),
            sm: rem(11),
            md: rem(14),
            lg: rem(16),
            xl: rem(20),
          },
        headings: {
            fontFamily: fonts[5],
            sizes: {
                h1: { fontSize: rem(42.5) },
                h2: { fontSize: rem(32.5) },
                h3: { fontSize: rem(27.5) },
                h4: { fontSize: rem(22.5) },
                h5: { fontSize: rem(20) },
                h6: { fontSize: rem(17.5) },
            }
        },
        radius: {
            xs: rem(2),
            sm: rem(4),
            md: rem(8),
            lg: rem(16),
            xl: rem(32)
        }
    })
);
