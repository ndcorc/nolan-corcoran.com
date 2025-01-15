// src/app/blog/page.tsx
import type { Metadata } from 'next';
import { BlogContent } from '@/components/blog/BlogContent';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Articles on theology, apologetics, culture, and cloud engineering.',
    openGraph: {
        title: 'Blog | Every Thought Captive',
        description: 'Articles on theology, apologetics, culture, and cloud engineering.',
        url: 'https://nolan-corcoran.com/blog',
        siteName: 'Every Thought Captive',
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Every Thought Captive',
        description: 'Articles on theology, apologetics, culture, and cloud engineering.'
    }
};

export default function BlogPage() {
    return <BlogContent />;
}
