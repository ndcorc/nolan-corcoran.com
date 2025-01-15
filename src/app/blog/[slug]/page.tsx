// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog/BlogPost';
import { urlForImage } from '@/lib/sanity/image';
import { getAllPosts, getPostBySlug } from '@/lib/sanity/sanity.client';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found'
        };
    }

    // Get the post's main image URL if it exists
    const imageUrl = post.mainImage
        ? urlForImage(post.mainImage).width(1200).height(630).url()
        : 'https://nolan-corcoran.com/og-image.jpg'; // fallback image

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} | Every Thought Captive`,
            description: post.excerpt,
            url: `https://nolan-corcoran.com/blog/${post.slug.current}`,
            siteName: 'Every Thought Captive',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime: post.publishedAt,
            authors: ['Nolan Corcoran'],
            tags: post.categories.map((cat) => cat.title)
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl]
        }
    };
}

// Generate static paths at build time
export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        slug: post.slug.current
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogPost post={post} />;
}
