/* eslint-disable @typescript-eslint/no-explicit-any */
import tailwindPresetMantine from 'tailwind-preset-mantine';
import type { Config } from 'tailwindcss';

// Inline values to avoid Turbopack module resolution warnings
// Keep in sync with src/theme/index.ts
const breakpoints = {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em'
};

const colors = {
    brand: [
        '#FFF5F5',
        '#FFE3E3',
        '#A45252',
        '#923939',
        '#802121',
        '#6E0909',
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
    ]
};

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/theme/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    presets: [
        tailwindPresetMantine({
            mantineBreakpoints: breakpoints,
            mantineColors: colors
        })
    ],
    theme: {
        screens: {
            'xs': '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em'
        },
        extend: {
            boxShadow: {
                z: '-1px 1px 12px 2px rgba(94, 94, 91, 0.35)',
                'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.1)',
                'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
                'dark-z': '-1px -1px 16px 2px rgba(0, 0, 0, 0.35)'
            },
            listStyleType: {
                unset: 'unset'
            }
        }
    },
    plugins: [
        function ({ addUtilities }: any) {
            addUtilities({
                '.no-scroll': {
                    overflow: 'hidden',
                    height: '100vh',
                    touchAction: 'none'
                }
            });
        }
    ]
};
export default config;
