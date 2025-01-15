/* eslint-disable @typescript-eslint/no-explicit-any */

import { urlForImage } from '../sanity/image';

// src/config/metadata.ts
export const siteMetadata = {
    title: 'Every Thought Captive',
    description: `The Christian life isn't always easy, but it's always good.`,
    siteUrl: 'https://nolan-corcoran.com',
    siteName: 'Every Thought Captive',
    twitterHandle: '@nolan.corcoran',
    defaultOgImage: '/img/og-default.jpg'
};

export type MetadataProps = {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
};

export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        author: {
            '@type': 'Person',
            name: 'Nolan Corcoran',
            url: siteMetadata.siteUrl
        }
    };
}

export function generateBlogPostSchema(post: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            '@type': 'Person',
            name: 'Nolan Corcoran',
            url: siteMetadata.siteUrl
        },
        image: post.mainImage ? urlForImage(post.mainImage).url() : siteMetadata.defaultOgImage,
        url: `${siteMetadata.siteUrl}/blog/${post.slug.current}`
    };
}
