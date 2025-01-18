// src/lib/sanity.client.ts
import { createClient, groq } from 'next-sanity';
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
    getLatestPostQuery,
    getAllProjectsQuery,
    getFeaturedProjectsQuery,
    getProjectsByTypeQuery,
    getAllDiagramsQuery,
    getDiagramByProjectIdQuery,
    getProjectBySlugQuery
} from './sanity.queries';
import type {
    Post,
    Category,
    CategoryWithCount,
    PostsResponse,
    Project,
    ProjectWithDiagram,
    ProjectDetails
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

export async function getAllProjects(): Promise<Project[]> {
    return client.fetch(getAllProjectsQuery);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetails> {
    return client.fetch(getProjectBySlugQuery, { slug });
}

export async function getFeaturedProjects(): Promise<Project[]> {
    return client.fetch(getFeaturedProjectsQuery);
}

export async function getProjectsByType(type: 'full-stack' | 'cloud-architecture'): Promise<Project[]> {
    return client.fetch(getProjectsByTypeQuery, { type });
}

// Pagination
export async function getProjectCount(): Promise<number> {
    const query = groq`count(*[_type == "project"])`;
    return client.fetch(query);
}

export async function getPaginatedProjects(
    start: number = 0,
    end: number = 9,
    type?: 'full-stack' | 'cloud-architecture'
): Promise<Project[]> {
    const query = type
        ? `*[_type == "project" && type == $type] | order(featured desc, _createdAt desc) [${start}...${end}]`
        : `*[_type == "project"] | order(featured desc, _createdAt desc) [${start}...${end}]`;

    return client.fetch(query, { type });
}

// Search
export async function searchProjects(searchTerm: string): Promise<Project[]> {
    const query = groq`
    *[_type == "project" && (
      title match $searchTerm ||
      description match $searchTerm ||
      company match $searchTerm ||
      technologies[] match $searchTerm
    )] | order(featured desc, _createdAt desc) {
      _id,
      title,
      id,
      description,
      company,
      period,
      type,
      image,
      technologies,
      techStack,
      githubUrl,
      liveUrl,
      featured
    }
  `;

    return client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

// Related Projects
export async function getRelatedProjects(
    currentId: string,
    technologies: string[],
    limit: number = 3
): Promise<Project[]> {
    const query = groq`
    *[_type == "project" 
      && id.current != $currentId 
      && count((technologies[])[@ in $technologies]) > 0
    ] | order(count((technologies[])[@ in $technologies]) desc) [0...$limit] {
      _id,
      title,
      id,
      description,
      type,
      image,
      technologies,
      featured
    }
  `;

    return client.fetch(query, {
        currentId,
        technologies,
        limit
    });
}

// Project Statistics
export async function getProjectStats() {
    const query = groq`{
    "total": count(*[_type == "project"]),
    "fullStack": count(*[_type == "project" && type == "full-stack"]),
    "cloudArchitecture": count(*[_type == "project" && type == "cloud-architecture"]),
    "featured": count(*[_type == "project" && featured == true]),
    "technologies": *[_type == "project"].technologies[]
  }`;

    return client.fetch(query);
}

// Architecture Diagrams
export async function getAllDiagrams(): Promise<ProjectWithDiagram[]> {
    return client.fetch(getAllDiagramsQuery);
}

export async function getDiagramByProjectId(id: string): Promise<ProjectWithDiagram | null> {
    return client.fetch(getDiagramByProjectIdQuery, { id });
}

export async function getDiagramsByProjectType(
    type: 'full-stack' | 'cloud-architecture'
): Promise<ProjectWithDiagram[]> {
    const query = groq`
    *[_type == "project" && defined(architectureDiagram) && type == $type] {
      _id,
      title,
      id,
      type,
      architectureDiagram {
        title,
        mermaidCode
      }
    }
  `;
    return client.fetch(query, { type });
}
