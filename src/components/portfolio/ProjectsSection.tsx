'use client';

import { Container, Title, Text, SimpleGrid, SegmentedControl, Group } from '@mantine/core';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import type { Project as ProjectItem } from '@/types/sanity';

interface ProjectsSectionProps {
    projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [filter, setFilter] = useState<'all' | 'full-stack' | 'cloud-architecture'>('all');

    const filteredProjects = projects.filter((project) => (filter === 'all' ? true : project.type === filter));

    return (
        <section className="py-10">
            <Container fluid className="mx-16">
                <div className="text-center mb-12">
                    <Title order={2} className="font-serif mb-4">
                        Featured Projects
                    </Title>
                    <Text size="lg" c="dimmed" className="max-w-2xl mx-auto">
                        A showcase of my full-stack applications and cloud architecture solutions, demonstrating
                        expertise in modern web development and cloud technologies.
                    </Text>
                </div>

                <Group justify="center" className="mb-8">
                    <SegmentedControl
                        value={filter}
                        onChange={(value) => setFilter(value as 'all' | 'full-stack' | 'cloud-architecture')}
                        data={[
                            { label: 'All Projects', value: 'all' },
                            { label: 'Full Stack', value: 'full-stack' },
                            { label: 'Cloud Architecture', value: 'cloud-architecture' }
                        ]}
                    />
                </Group>

                <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md" verticalSpacing="xl" className="max-w-full">
                    {filteredProjects.map((project, index) => (
                        <div key={project.slug.current} className="h-auto">
                            <ProjectCard key={project.slug.current} project={project} index={index} />
                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </section>
    );
}
