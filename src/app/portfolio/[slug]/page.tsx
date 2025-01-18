// src/app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/portfolio/CaseStudyContent';
import { getProjectBySlug } from '@/lib/sanity/sanity.client';

interface CaseStudyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found'
        };
    }

    return {
        title: `${project.title} | Portfolio | Nolan Corcoran`,
        description: project.description
    };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <CaseStudyContent project={project} />;
}
