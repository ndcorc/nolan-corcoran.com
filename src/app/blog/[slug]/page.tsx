/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import BlogPost from '@/components/blog/BlogPost';
import JsonLd from '@/components/shared/JsonLd';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';
import { urlForImage } from '@/lib/sanity/image';
import { getCachedAdjacentPosts, getCachedPostBySlug } from '@/lib/sanity/sanity.cache';
import { client } from '@/../sanity/lib/client';
import { Post } from '@/types/sanity';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getCachedPostBySlug(slug);

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

export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "post"]{ slug }`);

    return posts.map((post: Post) => ({
        slug: post.slug.current
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getCachedPostBySlug(slug);

    if (!post) {
        redirect('/not-found');
    }

    const adjacentPosts = await getCachedAdjacentPosts(post.publishedAt);
    const url = `${siteMetadata.siteUrl}/blog/${post.slug.current}`;

    return (
        <>
            <JsonLd post={post} />
            <BlogPost
                post={post}
                previousPost={adjacentPosts?.previous}
                nextPost={adjacentPosts?.next}
                url={url}
            />
        </>
    );
}
