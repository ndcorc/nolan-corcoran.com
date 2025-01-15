// /lib/config/robots.ts
import { MetadataRoute } from 'next';
import { siteMetadata } from './metadata';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/']
        },
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`
    };
}
