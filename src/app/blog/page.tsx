// src/app/blog/page.tsx
import { BlogContent } from '@/components/blog/BlogContent';
import Loading from '@/components/shared/Loading';
import { createPageMetadata } from '@/lib/config/metadata';
import { Suspense } from 'react';

export const metadata = createPageMetadata({
    title: 'Blog',
    description: 'Articles on theology, apologetics, culture, and cloud engineering.',
    path: '/blog',
    ogImageAlt: 'Every Thought Captive Blog'
});

export default function BlogPage() {
    return (
        <Suspense fallback={<Loading />}>
            <BlogContent />
        </Suspense>
    );
}
