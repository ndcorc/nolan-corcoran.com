// src/app/portfolio/page.tsx
import type { Metadata } from 'next';
import { AppShellMain } from '@mantine/core';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProjectList from '@/components/portfolio/ProjectList';
import { getProjects } from '@/lib/sanity/sanity.client';
import TechStack from '@/components/portfolio/TechStack';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Cloud engineering and development projects by Nolan Corcoran'
};

export default async function PortfolioPage() {
    const projects = await getProjects();

    return (
        <AppShellMain>
            <PortfolioHero />
            <TechStack />
            <ProjectList projects={projects} />
        </AppShellMain>
    );
}
