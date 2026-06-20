/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import BlogPost from '@/components/blog/BlogPost';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';
import { urlForImage } from '@/lib/sanity/image';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import { client } from '@/../sanity/lib/client'; // Import the regular client
import { Post } from '@/types/sanity';
import { Suspense } from 'react';
import Loading from '../loading';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const serverSanity = await createServerSanity();
    const post = await serverSanity.getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const imageUrl = post.mainImage
        ? urlForImage(post.mainImage).width(1200).height(630).url()
        : siteMetadata.defaultOgImage;

    return createPageMetadata({
        title: post.title,
        description: post.excerpt ?? '',
        path: `/blog/${post.slug.current}`,
        ogImage: imageUrl,
        ogImageAlt: post.title,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: ['Nolan Corcoran'],
        tags: post.categories.map((cat) => cat.title)
    });
}

// Generate static paths at build time
export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "post"]{ slug }`);

    return posts.map((post: Post) => ({
        slug: post.slug.current
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const serverSanity = await createServerSanity();
    const post = await serverSanity.getPostBySlug(slug);
    const adjacentPosts = post ? await serverSanity.getAdjacentPosts(post.publishedAt) : null;

    if (!post) {
        redirect('/not-found');
    }

    return (
        <Suspense fallback={<Loading />}>
            <BlogPost post={post} previousPost={adjacentPosts?.previous} nextPost={adjacentPosts?.next} />
        </Suspense>
    );
}
