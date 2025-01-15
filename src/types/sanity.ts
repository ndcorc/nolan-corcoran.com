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
