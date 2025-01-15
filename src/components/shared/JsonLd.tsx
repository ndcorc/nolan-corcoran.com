// src/components/JsonLd.tsx
import { Post } from '@/types/sanity';

interface JsonLdProps {
    post: Post;
}

export default function JsonLd({ post }: JsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.mainImage ? post.mainImage.url : undefined,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            '@type': 'Person',
            name: 'Nolan Corcoran',
            url: 'https://nolan-corcoran.com/about'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Every Thought Captive',
            logo: {
                '@type': 'ImageObject',
                url: 'https://nolan-corcoran.com/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://nolan-corcoran.com/blog/${post.slug.current}`
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
