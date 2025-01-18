import { PortableTextBlock } from '@portabletext/types';
import { Image } from 'sanity';

export interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    color: 'theology' | 'christian-living' | 'apologetics' | 'philosophy' | 'worldview-culture';
    description?: string;
}

export interface Post {
    _id: string;
    title: string;
    subtitle?: string;
    slug: {
        current: string;
    };
    mainImage?: Image;
    body?: PortableTextBlock[];
    publishedAt: string;
    excerpt?: string;
    categories: Category[];
    featured?: boolean;
}

export interface SearchQuery {
    searchTerm: string;
}

export interface CategoryQuery {
    categoryId: string;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
}

export interface CategoryWithCount extends Category {
    postCount: number;
}

export interface BlogContentProps {
    posts: Post[] | undefined;
    categories: Category[] | undefined;
    featuredPost: Post | undefined;
}

export interface TechStackItem {
    category: string;
    items: string[];
}

export interface BaseProject {
    _id: string;
    title: string;
    description: string;
    company: string;
    period: string;
    type: 'full-stack' | 'cloud-architecture';
    image: Image;
    technologies: string[];
    techStack?: TechStackItem[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
}

// Interface for the project list query
export interface Project extends BaseProject {
    slug: {
        current: string;
        _type: 'slug';
    };
}

// Interface for the single project query
export interface ProjectDetails extends BaseProject {
    slug: {
        current: string;
        _type: 'slug';
    };
    challenges?: string[];
    solutions?: Solution[];
    implementation?: string[];
    results?: string[];
    architectureDiagram?: ArchitectureDiagram;
    architectureDiagramImage?: Image;
}

// src/types/sanity.ts
export interface ArchitectureDiagram {
    title: string;
    mermaidCode: string;
}

export interface ProjectWithDiagram {
    _id: string;
    title: string;
    id: {
        current: string;
    };
    type: 'full-stack' | 'cloud-architecture';
    architectureDiagram: ArchitectureDiagram;
}

export interface Solution {
    title: string;
    icon: string;
    description: string;
}
