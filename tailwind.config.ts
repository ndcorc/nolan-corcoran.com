/* eslint-disable @typescript-eslint/no-explicit-any */
import { breakpoints, colors } from './src/theme';
import tailwindPresetMantine from 'tailwind-preset-mantine';
import type { Config } from 'tailwindcss';

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
                z: '-1px -1px 16px 2px rgba(34, 33, 31, 0.35)',
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
