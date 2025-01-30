// src/app/robots.ts
import { siteMetadata } from '@/lib/config/metadata';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/studio/', '/api/']
        },
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`
    };
}
