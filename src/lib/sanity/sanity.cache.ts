import { cache } from 'react';
import { createServerSanity } from './sanity.service.server';

export const getCachedPostBySlug = cache(async (slug: string) => {
    const serverSanity = await createServerSanity();
    return serverSanity.getPostBySlug(slug);
});

export const getCachedAdjacentPosts = cache(async (publishedAt: string) => {
    const serverSanity = await createServerSanity();
    return serverSanity.getAdjacentPosts(publishedAt);
});

export const getCachedBlogListingData = cache(async () => {
    const serverSanity = await createServerSanity();
    return serverSanity.getBlogListingData();
});
