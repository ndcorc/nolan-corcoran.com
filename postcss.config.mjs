// postcss.config.mjs
const config = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '30em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '64em',
                'mantine-breakpoint-lg': '74em',
                'mantine-breakpoint-xl': '90em'
            }
        },
        autoprefixer: {},
        'tailwindcss/nesting': {},
        tailwindcss: {}
    }
};

export default config;
