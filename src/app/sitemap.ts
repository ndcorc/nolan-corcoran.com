import { getAllPosts } from '@/lib/sanity/sanity.client';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nolan-corcoran.com';

    // Get all blog posts
    const posts = await getAllPosts();

    // Create blog post URLs
    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }));

    // Add static routes
    const routes = ['', '/#about', '/#contact', '/blog'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8
    }));

    return [...routes, ...blogUrls];
}
