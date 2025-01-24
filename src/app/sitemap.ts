// src/app/sitemap.ts
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nolan-corcoran.com';

    const serverSanity = await createServerSanity();
    // Get all blog posts
    const posts = await serverSanity.getAllPosts();

    // Create blog post URLs
    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }));

    const projects = await serverSanity.getAllProjects();
    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug.current}`,
        lastModified: new Date(project.period),
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }));

    // Add static routes
    const routes = ['', '/#about', '/#contact', '/blog', '/portfolio'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8
    }));

    return [...routes, ...blogUrls, ...projectUrls];
}
