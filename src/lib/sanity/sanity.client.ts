// src/lib/sanity.client.ts
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '@/../sanity/env';
import {
    getAllPostsQuery,
    getPostBySlugQuery,
    getAllCategoriesQuery,
    getPostsByCategoryQuery,
    getFeaturedPostsQuery,
    getRelatedPostsQuery,
    getPostCountByCategoryQuery,
    searchPostsQuery,
    getAllPostsWithCountQuery,
    getFeaturedPostQuery,
    getLatestPostQuery
} from './sanity.queries';
import type {
    Post,
    Category,
    CategoryWithCount,
    PostsResponse
    //SearchQuery,
    //CategoryQuery
} from '@/types/sanity';

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn
});

export async function getAllPosts(): Promise<Post[]> {
    return await client.fetch(getAllPostsQuery);
}

export async function getAllPostsWithCount(): Promise<PostsResponse> {
    return await client.fetch(getAllPostsWithCountQuery);
}

export async function getPostBySlug(slug: string): Promise<Post> {
    return await client.fetch(getPostBySlugQuery, { slug });
}

export async function getAllCategories(): Promise<Category[]> {
    return await client.fetch(getAllCategoriesQuery);
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
    return await client.fetch(getPostsByCategoryQuery, { categoryId });
}

export async function getFeaturedPosts(): Promise<Post[]> {
    return await client.fetch(getFeaturedPostsQuery);
}

export async function getRelatedPosts(slug: string): Promise<Post[]> {
    return await client.fetch(getRelatedPostsQuery, { slug });
}

export async function getPostCountByCategory(): Promise<CategoryWithCount[]> {
    return await client.fetch(getPostCountByCategoryQuery);
}

export async function searchPosts(searchTerm: string): Promise<Post[]> {
    return await client.fetch(searchPostsQuery, { searchTerm });
}

export async function getFeaturedOrLatestPost(): Promise<Post> {
    const featuredPost = await client.fetch(getFeaturedPostQuery);
    return featuredPost || (await client.fetch(getLatestPostQuery));
}
