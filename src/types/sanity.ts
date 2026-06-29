// src/lib/types/sanity.ts
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

export interface BlogListingData {
    posts: Post[];
    categories: Category[];
    featuredPost: Post | null;
}

export interface BlogContentProps {
    posts: Post[];
    categories: Category[];
    featuredPost: Post | null;
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

export interface Quote {
    _id: string;
    text: string;
    author: string;
    source?: string;
    topic?: string;
    subtopic?: string;
    tags?: string[];
    slug?: {
        current: string;
    };
}

export interface QuoteFilterOptions {
    authors: string[];
    sources: string[];
    topics: string[];
    subtopics: string[];
    tags: string[];
}

export interface SanityPatristicQuote {
    _id: string;
    legacyId: string;
    slug: {
        current: string;
    };
    father: string;
    died: string;
    diedSort: number;
    era: string;
    sourceWork: string;
    sourceRef: string;
    quoteText: string;
    topic: string;
    subtopics?: string[];
    /** @deprecated Legacy field — mapped to subtopics when present */
    subtopic?: string;
    position: 'Reformed' | 'Roman Catholic' | 'Nuanced' | '';
    book: string;
    section: string;
    notes: string;
}

export interface PatristicQuoteSlug {
    slug: {
        current: string;
    };
    _updatedAt: string;
}
