// postcss.config.mjs
const config = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '30em', // 576px — Mobile
                'mantine-breakpoint-sm': '48em', // 768px — Tablet (Vertical)
                'mantine-breakpoint-md': '64em', // 992px — Tablet (Horizontal) + Laptop (13 in)
                'mantine-breakpoint-lg': '74em', // 1200px — Laptop (14 in)
                'mantine-breakpoint-xl': '90em' // 1408px — Laptop (16 in) + Desktop
            }
        },
        autoprefixer: {},
        'tailwindcss/nesting': {},
        tailwindcss: {}
    }
};

export default config;
