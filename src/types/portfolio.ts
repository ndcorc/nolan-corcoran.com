export type TechStack = {
    category: string;
    items: string[];
};

export type ProjectLink = {
    type: 'github' | 'demo' | 'case-study';
    url: string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    company: string;
    period: string;
    type: 'full-stack' | 'cloud-architecture';
    image?: string;
    techStack: TechStack[];
    links?: ProjectLink[];
    archImage?: string;
    featured: boolean;
};
