// /lib/config/sitemap.ts
import { MetadataRoute } from 'next';
import { siteMetadata } from './metadata';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteMetadata.siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: `${siteMetadata.siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${siteMetadata.siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9
        }
        // Add more routes
    ];
}
