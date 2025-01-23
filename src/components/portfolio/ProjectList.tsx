// src/components/portfolio/ProjectsList.tsx
'use client';

import { Container, SimpleGrid, Card, Image, Text, Title, Group, Badge, Button } from '@mantine/core';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { urlForImage } from '@/lib/sanity/image';
import type { Project } from '@/types/sanity';

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <Container size="lg" className="py-20">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {projects.map((project) => (
                    <Card
                        key={project._id}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        className="hover:-translate-y-1 transition-transform duration-200">
                        {project.image && (
                            <Card.Section>
                                <Image src={urlForImage(project.image).url()} height={160} alt={project.title} />
                            </Card.Section>
                        )}

                        <Title order={3} className="mt-4 mb-2">
                            {project.title}
                        </Title>

                        <Text size="sm" color="dimmed" className="mb-4">
                            {project.description}
                        </Text>

                        <Group className="mb-4">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="light">
                                    {tech}
                                </Badge>
                            ))}
                        </Group>

                        <Group>
                            {project.githubUrl && (
                                <Button
                                    component="a"
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="light"
                                    size="sm"
                                    leftSection={<IconBrandGithub size={16} />}>
                                    GitHub
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button
                                    component="a"
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="light"
                                    size="sm"
                                    leftSection={<IconExternalLink size={16} />}>
                                    Live Demo
                                </Button>
                            )}
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
