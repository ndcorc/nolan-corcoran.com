// src/components/portfolio/TechStack.tsx
'use client';

import { Container, Title, SimpleGrid, Card, Group, Text } from '@mantine/core';
import {
    IconBrandReact,
    IconBrandNextjs,
    IconBrandTypescript,
    IconBrandAws,
    IconBrandPython,
    IconDatabase,
    IconCloudComputing,
    IconBrandDocker
} from '@tabler/icons-react';

const techCategories = [
    {
        title: 'Frontend Development',
        items: [
            { name: 'React', icon: IconBrandReact },
            { name: 'Next.js', icon: IconBrandNextjs },
            { name: 'TypeScript', icon: IconBrandTypescript },
            { name: 'TailwindCSS', icon: IconBrandNextjs },
            { name: 'Mantine UI', icon: IconBrandReact }
        ]
    },
    {
        title: 'Backend & Infrastructure',
        items: [
            { name: 'AWS', icon: IconBrandAws },
            { name: 'Python', icon: IconBrandPython },
            { name: 'Node.js', icon: IconBrandNextjs },
            { name: 'PostgreSQL', icon: IconDatabase },
            { name: 'MongoDB', icon: IconDatabase }
        ]
    },
    {
        title: 'DevOps & Cloud',
        items: [
            { name: 'Docker', icon: IconBrandDocker },
            { name: 'Kubernetes', icon: IconCloudComputing },
            { name: 'CI/CD', icon: IconCloudComputing },
            { name: 'AWS Services', icon: IconBrandAws },
            { name: 'Infrastructure as Code', icon: IconCloudComputing }
        ]
    }
];

export default function TechStack() {
    return (
        <div className="py-10">
            <Container size="lg">
                <Title order={3} className="text-center mb-12 font-serif">
                    Technical Skills
                </Title>

                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                    {techCategories.map((category) => (
                        <Card
                            key={category.title}
                            withBorder
                            radius="md"
                            className="bg-stone-50 dark:bg-dark rounded-xl shadow-md dark:shadow-dark-lg"
                            padding="xl">
                            <Title order={3} className="mb-6 text-center font-serif">
                                {category.title}
                            </Title>

                            <div className="space-y-4">
                                {category.items.map((tech) => (
                                    <Group key={tech.name} align="center" className="gap-3">
                                        <tech.icon size={24} className="text-[#6E0909] dark:text-[#38BDF8]" />
                                        <Text size="lg">{tech.name}</Text>
                                    </Group>
                                ))}
                            </div>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    );
}
