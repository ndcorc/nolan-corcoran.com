// src/app/blog/page.tsx
import { BlogContent } from '@/components/blog/BlogContent';
import { createPageMetadata } from '@/lib/config/metadata';
import { getCachedBlogListingData } from '@/lib/sanity/sanity.cache';

export const metadata = createPageMetadata({
    title: 'Blog',
    description: 'Articles on theology, apologetics, culture, and cloud engineering.',
    path: '/blog',
    ogImageAlt: 'Every Thought Captive Blog'
});

export const revalidate = 3600;

export default async function BlogPage() {
    const { posts, categories, featuredPost } = await getCachedBlogListingData();

    return <BlogContent posts={posts} categories={categories} featuredPost={featuredPost} />;
}
