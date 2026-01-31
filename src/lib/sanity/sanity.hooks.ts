// src/lib/sanity/sanity.hooks.ts
import { useQuery } from '@tanstack/react-query';
import { clientSanity } from './sanity.service.client';
import type {
    Post,
    Category,
    CategoryWithCount,
    PostsResponse,
    Project,
    ProjectWithDiagram,
    ProjectDetails,
    QuoteFilterOptions,
    Quote
} from '@/types/sanity';

// Posts Hooks
export function usePosts() {
    return useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: () => clientSanity.getAllPosts()
    });
}

export function usePostsWithCount() {
    return useQuery<PostsResponse, Error>({
        queryKey: ['posts-with-count'],
        queryFn: () => clientSanity.getAllPostsWithCount()
    });
}

export function usePost(slug: string) {
    return useQuery<Post, Error>({
        queryKey: ['post', slug],
        queryFn: () => clientSanity.getPostBySlug(slug),
        enabled: !!slug
    });
}

export function useCategories() {
    return useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: () => clientSanity.getAllCategories()
    });
}

export function usePostsByCategory(categoryId: string | null) {
    return useQuery<Post[], Error>({
        queryKey: ['posts-by-category', categoryId],
        queryFn: () => clientSanity.getPostsByCategory(categoryId!),
        enabled: !!categoryId
    });
}

export function useFeaturedPosts() {
    return useQuery<Post[], Error>({
        queryKey: ['featured-posts'],
        queryFn: () => clientSanity.getFeaturedPosts()
    });
}

export function useRelatedPosts(slug: string) {
    return useQuery<Post[], Error>({
        queryKey: ['related-posts', slug],
        queryFn: () => clientSanity.getRelatedPosts(slug),
        enabled: !!slug
    });
}

export function usePostCountByCategory() {
    return useQuery<CategoryWithCount[], Error>({
        queryKey: ['post-count-by-category'],
        queryFn: () => clientSanity.getPostCountByCategory()
    });
}

export function useSearchPosts(searchTerm: string) {
    return useQuery<Post[], Error>({
        queryKey: ['search-posts', searchTerm],
        queryFn: () => clientSanity.searchPosts(searchTerm),
        enabled: !!searchTerm
    });
}

export function useFeaturedOrLatestPost() {
    return useQuery<Post, Error>({
        queryKey: ['featured-or-latest-post'],
        queryFn: () => clientSanity.getFeaturedOrLatestPost()
    });
}

// Projects Hooks
export function useProjects() {
    return useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: () => clientSanity.getAllProjects()
    });
}

export function useProject(slug: string) {
    return useQuery<ProjectDetails, Error>({
        queryKey: ['project', slug],
        queryFn: () => clientSanity.getProjectBySlug(slug),
        enabled: !!slug
    });
}

export function useFeaturedProjects() {
    return useQuery<Project[], Error>({
        queryKey: ['featured-projects'],
        queryFn: () => clientSanity.getFeaturedProjects()
    });
}

export function useProjectsByType(type: 'full-stack' | 'cloud-architecture') {
    return useQuery<Project[], Error>({
        queryKey: ['projects-by-type', type],
        queryFn: () => clientSanity.getProjectsByType(type),
        enabled: !!type
    });
}

export function useProjectCount() {
    return useQuery<number, Error>({
        queryKey: ['project-count'],
        queryFn: () => clientSanity.getProjectCount()
    });
}

export function usePaginatedProjects(start: number = 0, end: number = 9, type?: 'full-stack' | 'cloud-architecture') {
    return useQuery<Project[], Error>({
        queryKey: ['paginated-projects', start, end, type],
        queryFn: () => clientSanity.getPaginatedProjects(start, end, type)
    });
}

export function useSearchProjects(searchTerm: string) {
    return useQuery<Project[], Error>({
        queryKey: ['search-projects', searchTerm],
        queryFn: () => clientSanity.searchProjects(searchTerm),
        enabled: !!searchTerm
    });
}

export function useRelatedProjects(currentId: string, technologies: string[], limit: number = 3) {
    return useQuery<Project[], Error>({
        queryKey: ['related-projects', currentId, technologies, limit],
        queryFn: () => clientSanity.getRelatedProjects(currentId, technologies, limit),
        enabled: !!currentId && technologies.length > 0
    });
}

export function useProjectStats() {
    return useQuery({
        queryKey: ['project-stats'],
        queryFn: () => clientSanity.getProjectStats()
    });
}

// Diagrams Hooks
export function useDiagrams() {
    return useQuery<ProjectWithDiagram[], Error>({
        queryKey: ['diagrams'],
        queryFn: () => clientSanity.getAllDiagrams()
    });
}

export function useDiagramByProjectId(id: string) {
    return useQuery<ProjectWithDiagram | null, Error>({
        queryKey: ['diagram', id],
        queryFn: () => clientSanity.getDiagramByProjectId(id),
        enabled: !!id
    });
}

export function useDiagramsByProjectType(type: 'full-stack' | 'cloud-architecture') {
    return useQuery<ProjectWithDiagram[], Error>({
        queryKey: ['diagrams-by-type', type],
        queryFn: () => clientSanity.getDiagramsByProjectType(type),
        enabled: !!type
    });
}

export function useQuotes() {
    return useQuery<Quote[], Error>({
        queryKey: ['quotes'],
        queryFn: () => clientSanity.getAllQuotes()
    });
}

export function useFilteredQuotes(filters: {
    author?: string;
    source?: string;
    topic?: string;
    subtopic?: string;
    tag?: string;
    searchTerm?: string;
}) {
    const filterKeys = Object.entries(filters)
        .filter(([, value]) => !!value)
        .map(([key]) => key);

    return useQuery<Quote[], Error>({
        queryKey: ['filtered-quotes', ...filterKeys.map((key) => filters[key as keyof typeof filters])],
        queryFn: () => clientSanity.getFilteredQuotes(filters)
    });
}

export function useQuoteFilterOptions() {
    return useQuery<QuoteFilterOptions, Error>({
        queryKey: ['quote-filter-options'],
        queryFn: () => clientSanity.getQuoteFilterOptions()
    });
}
