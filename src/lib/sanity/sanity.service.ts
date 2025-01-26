// src/lib/sanity/sanity.service.ts
import type {
    Post,
    Category,
    CategoryWithCount,
    PostsResponse,
    Project,
    ProjectWithDiagram,
    ProjectDetails
} from '@/types/sanity';
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
    getProjectBySlugQuery,
    getProjectCountQuery,
    getPaginatedProjectsQuery,
    getPaginatedProjectsByTypeQuery,
    searchProjectsQuery,
    getRelatedProjectsQuery,
    getProjectStatsQuery,
    getDiagramsByProjectTypeQuery,
    getAdjacentPostsQuery,
    getFeedPostsQuery
} from './sanity.queries';
import { QueryParams } from 'next-sanity';

type FetcherResponse<T> = Promise<T | { data: T }>;
export type Fetcher = <T>(options: {
    query: string;
    params?: QueryParams | Promise<QueryParams>;
}) => FetcherResponse<T>;

export class SanityService {
    constructor(
        private fetcher: Fetcher,
        private isServerFetch: boolean
    ) {}

    private async extractData<T>(response: FetcherResponse<T>): Promise<T> {
        const result = await response;
        if (result && typeof result === 'object' && 'data' in result) {
            return result.data;
        }
        return result as T;
    }

    async getAllPosts(): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
                query: getAllPostsQuery
            })
        );
    }

    async getAllPostsWithCount(): Promise<PostsResponse> {
        return this.extractData(
            this.fetcher({
                query: getAllPostsWithCountQuery
            })
        );
    }

    async getPostBySlug(slug: string): Promise<Post> {
        return this.extractData(
            this.fetcher({
                query: getPostBySlugQuery,
                params: { slug }
            })
        );
    }

    async getAllCategories(): Promise<Category[]> {
        return this.extractData(
            this.fetcher({
                query: getAllCategoriesQuery
            })
        );
    }

    async getPostsByCategory(categoryId: string): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
                query: getPostsByCategoryQuery,
                params: { categoryId }
            })
        );
    }

    async getFeaturedPosts(): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
                query: getFeaturedPostsQuery
            })
        );
    }

    async getRelatedPosts(slug: string): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
                query: getRelatedPostsQuery,
                params: { slug }
            })
        );
    }

    async getPostCountByCategory(): Promise<CategoryWithCount[]> {
        return this.extractData(
            this.fetcher({
                query: getPostCountByCategoryQuery
            })
        );
    }

    async searchPosts(searchTerm: string): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
                query: searchPostsQuery,
                params: { searchTerm }
            })
        );
    }

    async getFeaturedOrLatestPost(): Promise<Post> {
        const featuredPost: Post = await this.extractData(
            this.fetcher({
                query: getFeaturedPostQuery
            })
        );
        if (featuredPost) return featuredPost;

        return this.extractData(
            this.fetcher({
                query: getLatestPostQuery
            })
        );
    }

    async getAdjacentPosts(publishedAt: string): Promise<{ previous?: Post; next?: Post }> {
        return this.extractData(
          this.fetcher({
            query: getAdjacentPostsQuery,
            params: { publishedAt }
          })
        );
      }

    async getFeedPosts(): Promise<Post[]> {
        return this.extractData(
            this.fetcher({
            query: getFeedPostsQuery
            })
        );
    }

    async getAllProjects(): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: getAllProjectsQuery
            })
        );
    }

    async getProjectBySlug(slug: string): Promise<ProjectDetails> {
        return this.extractData(
            this.fetcher({
                query: getProjectBySlugQuery,
                params: { slug }
            })
        );
    }

    async getFeaturedProjects(): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: getFeaturedProjectsQuery
            })
        );
    }

    async getProjectsByType(type: 'full-stack' | 'cloud-architecture'): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: getProjectsByTypeQuery,
                params: { type }
            })
        );
    }

    async getProjectCount(): Promise<number> {
        return this.extractData(
            this.fetcher({
                query: getProjectCountQuery
            })
        );
    }

    async getPaginatedProjects(
        start: number = 0,
        end: number = 9,
        type?: 'full-stack' | 'cloud-architecture'
    ): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: type ? getPaginatedProjectsByTypeQuery : getPaginatedProjectsQuery,
                params: { start, end, type }
            })
        );
    }

    async searchProjects(searchTerm: string): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: searchProjectsQuery,
                params: { searchTerm: `*${searchTerm}*` }
            })
        );
    }

    async getRelatedProjects(currentId: string, technologies: string[], limit: number = 3): Promise<Project[]> {
        return this.extractData(
            this.fetcher({
                query: getRelatedProjectsQuery,
                params: { currentId, technologies, limit }
            })
        );
    }

    async getProjectStats() {
        return this.extractData(
            this.fetcher({
                query: getProjectStatsQuery
            })
        );
    }

    async getAllDiagrams(): Promise<ProjectWithDiagram[]> {
        return this.extractData(
            this.fetcher({
                query: getAllDiagramsQuery
            })
        );
    }

    async getDiagramByProjectId(id: string): Promise<ProjectWithDiagram | null> {
        return this.extractData(
            this.fetcher({
                query: getDiagramByProjectIdQuery,
                params: { id }
            })
        );
    }

    async getDiagramsByProjectType(type: 'full-stack' | 'cloud-architecture'): Promise<ProjectWithDiagram[]> {
        return this.extractData(
            this.fetcher({
                query: getDiagramsByProjectTypeQuery,
                params: { type }
            })
        );
    }
}
