// src/app/portfolio/[slug]/page.tsx
import { redirect } from 'next/navigation';
import CaseStudyContent from '@/components/portfolio/CaseStudyContent';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';

interface CaseStudyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const serverSanity = await createServerSanity();
    const project = await serverSanity.getProjectBySlug(slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: `${project.title} | Portfolio | Nolan Corcoran`,
        description: project.description
    };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params;
    const serverSanity = await createServerSanity();
    const project = await serverSanity.getProjectBySlug(slug);

    if (!project) {
        redirect('/not-found');
    }

    return (
        <Suspense fallback={<Loading />}>
            <CaseStudyContent project={project} />
        </Suspense>
    );
}
