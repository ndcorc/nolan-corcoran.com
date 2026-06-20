// src/app/portfolio/[slug]/page.tsx
import { redirect } from 'next/navigation';
import CaseStudyContent from '@/components/portfolio/CaseStudyContent';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';
import { urlForImage } from '@/lib/sanity/image';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';

interface CaseStudyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
    const { slug } = await params;
    const serverSanity = await createServerSanity();
    const project = await serverSanity.getProjectBySlug(slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const imageUrl = project.image
        ? urlForImage(project.image).width(1200).height(630).url()
        : siteMetadata.defaultOgImage;

    return createPageMetadata({
        title: project.title,
        description: project.description,
        path: `/portfolio/${project.slug.current}`,
        ogImage: imageUrl,
        ogImageAlt: project.title
    });
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
