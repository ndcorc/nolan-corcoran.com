/* eslint-disable @typescript-eslint/no-explicit-any */
/** Custom theme */
import {
    DEFAULT_THEME,
    type MantineBreakpointsValues,
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
    'Roboto, sans-serif'
];

export const colors: MantineThemeColors = {
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
    ...DEFAULT_THEME.colors
};
//const colors: MantineThemeColors = DEFAULT_THEME.colors;
export const breakpoints: MantineBreakpointsValues = DEFAULT_THEME.breakpoints;

export const theme = mergeMantineTheme(
    DEFAULT_THEME,
    createTheme({
        fontFamily: fonts[5],
        fontFamilyMonospace: 'Cormorant Garamond, serif',
        breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em'
        },
        primaryColor: 'brand',
        colors,
        white: '#EDEDE8',
        black: '#121212',
        primaryShade: 6,
        shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)'
        },
        headings: {
            fontFamily: fonts[5],
            sizes: {
                h1: { fontSize: '3.5rem', fontWeight: '400' },
                h2: { fontSize: '2.75rem', fontWeight: '400' },
                h3: { fontSize: '2rem', fontWeight: '400' },
                h4: { fontSize: '1.5rem', fontWeight: '400' },
                h5: { fontSize: '1rem', fontWeight: '400' },
                h6: { fontSize: '0.75rem', fontWeight: '400' }
            }
        },
        radius: {
            xs: rem(2),
            sm: rem(4),
            md: rem(8),
            lg: rem(16),
            xl: rem(32)
        },
        components: {
            ActionIcon: {
                defaultProps: {
                    color: 'green'
                }
            }
        }
    })
);
