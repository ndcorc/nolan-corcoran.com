// src/components/JsonLd.tsx
import { urlForImage } from '@/lib/sanity/image';
import { Post } from '@/types/sanity';

interface JsonLdProps {
    post: Post;
}

export default function JsonLd({ post }: JsonLdProps) {
    const imageUrl = post.mainImage ? urlForImage(post.mainImage).url() : undefined;

    // Organization schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Every Thought Captive',
        url: 'https://nolan-corcoran.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://nolan-corcoran.com/icon.ico'
        },
        sameAs: [
            'https://twitter.com/nolancorcoran',
            'https://www.instagram.com/nolan.corcoran'
            // Add other social profiles
        ],
        founder: {
            '@type': 'Person',
            name: 'Nolan Corcoran'
        }
    };

    // Create the blog post schema
    const blogPostSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
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
                url: 'https://nolan-corcoran.com/icon.ico'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://nolan-corcoran.com/blog/${post.slug.current}`
        }
    };

    // Create the breadcrumb schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nolan-corcoran.com'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://nolan-corcoran.com/blog'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://nolan-corcoran.com/blog/${post.slug.current}`
            }
        ]
    };

    // Combine both schemas into an array
    const schemas = [organizationSchema, blogPostSchema, breadcrumbSchema];

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}
