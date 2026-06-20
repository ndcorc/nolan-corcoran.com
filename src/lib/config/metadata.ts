/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { urlForImage } from '../sanity/image';

export const siteMetadata = {
    title: 'Every Thought Captive',
    description: 'Exploring theology, apologetics, culture, and cloud engineering.',
    siteUrl: 'https://nolan-corcoran.com',
    siteName: 'Every Thought Captive',
    twitterHandle: '@nolancorcoran',
    defaultOgImage: '/og-image.jpg',
    apologeticsOgImage: '/og-apologetics.png'
};

type CreatePageMetadataOptions = {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
    ogImageAlt?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
    absoluteTitle?: string;
};

export function createPageMetadata({
    title,
    description,
    path,
    ogImage = siteMetadata.defaultOgImage,
    ogImageAlt = siteMetadata.siteName,
    type = 'website',
    noIndex = false,
    publishedTime,
    authors,
    tags,
    absoluteTitle
}: CreatePageMetadataOptions): Metadata {
    const ogTitle = absoluteTitle ?? `${title} | ${siteMetadata.siteName}`;

    const metadata: Metadata = {
        title: absoluteTitle ? { absolute: absoluteTitle } : title,
        description,
        alternates: {
            canonical: path
        },
        openGraph: {
            title: ogTitle,
            description,
            url: `${siteMetadata.siteUrl}${path}`,
            siteName: siteMetadata.siteName,
            locale: 'en_US',
            type,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogImageAlt
                }
            ],
            ...(type === 'article' && publishedTime ? { publishedTime } : {}),
            ...(type === 'article' && authors ? { authors } : {}),
            ...(type === 'article' && tags ? { tags } : {})
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description,
            images: [ogImage],
            creator: siteMetadata.twitterHandle
        }
    };

    if (noIndex) {
        metadata.robots = { index: false, follow: false };
    }

    return metadata;
}

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
        image: post.mainImage ? urlForImage(post.mainImage).url() : `${siteMetadata.siteUrl}${siteMetadata.defaultOgImage}`,
        url: `${siteMetadata.siteUrl}/blog/${post.slug.current}`
    };
}
