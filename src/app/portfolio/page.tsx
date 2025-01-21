// src/app/portfolio/page.tsx
import type { Metadata } from 'next';
import { AppShellMain, Divider } from '@mantine/core';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import TechStack from '@/components/portfolio/TechStack';
import ProjectSection from '@/components/portfolio/ProjectsSection';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Cloud engineering and development projects by Nolan Corcoran'
};

export default async function PortfolioPage() {
    const serverSanity = await createServerSanity();
    const projects = await serverSanity.getAllProjects();

    return (
        <AppShellMain className="pb-32">
            <PortfolioHero />
            <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />
            <TechStack />
            <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />
            <ProjectSection projects={projects} />
        </AppShellMain>
    );
}
