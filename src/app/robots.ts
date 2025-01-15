import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/studio/', '/api/']
        },
        sitemap: 'https://nolan-corcoran.com/sitemap.xml'
    };
}
