/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.sanity.io' },
            { hostname: 'nolan-corcoran.com' },
            { hostname: 'api.reftagger.com' },
            { hostname: 'reftagger.bibliacdn.com' }
        ],
        formats: ['image/avif', 'image/webp']
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks']
    },
    turbopack: {
        rules: {
            // Your custom rules
        }
    },
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true
            }
        ];
    },

    // Configure headers for security
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
