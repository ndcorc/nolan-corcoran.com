// src/components/portfolio/ProjectCard.tsx
'use client';

import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    Title,
    Stack,
    CardProps,
    Collapse,
    ActionIcon,
    Divider
} from '@mantine/core';
import {
    IconBrandGithub,
    IconExternalLink,
    IconFileText,
    IconLayoutBottombarCollapse,
    IconLayoutBottombarCollapseFilled
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import type { Project } from '@/types/sanity';
import { useDisclosure } from '@mantine/hooks';
import { urlForImage } from '@/lib/sanity/image';

const MotionCard = motion<CardProps>(Card);

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const getIcon = (type: string) => {
        switch (type) {
            case 'github':
                return <IconBrandGithub size={16} />;
            case 'demo':
                return <IconExternalLink size={16} />;
            case 'case-study':
                return <IconFileText size={16} />;
            default:
                return null;
        }
    };

    const getLinkProps = (link: { type: string; url?: string }) => {
        // For internal case study links
        if (link.type === 'case-study') {
            return {
                href: link.url,
                target: undefined,
                rel: undefined
            };
        }
        // For external links (GitHub, demo, etc.)
        return {
            href: link.url,
            target: '_blank',
            rel: 'noopener noreferrer'
        };
    };

    const links = [
        {
            type: 'demo',
            url: project.liveUrl
        },
        {
            type: 'github',
            url: project.githubUrl
        },
        {
            type: 'case-study',
            url: `/portfolio/${project.slug.current}`
        }
    ];

    return (
        <MotionCard
            id="project-card"
            className="hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md rounded-xl border border-solid dark:border-dark-400 bg-stone-50 dark:bg-dark dark:shadow-dark-lg min-h-[575px] h-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}>
            {project.image && (
                <Card.Section className="min-w-full">
                    <Image
                        src={urlForImage(project.image)}
                        alt={project.title}
                        className="object-cover min-w-full w-full max-h-48 block"
                    />
                </Card.Section>
            )}

            <Stack mt="md" id="project-content" className="flex-grow flex flex-col">
                <div>
                    <Title order={3} size="h4">
                        {project.title}
                    </Title>
                    <Badge
                        variant="light"
                        color={project.type === 'full-stack' ? 'blue' : 'violet'}
                        className="shadow-md dark:shadow-dark-md">
                        {project.type === 'full-stack' ? 'Full Stack' : 'Cloud Architecture'}
                    </Badge>
                    <Text size="sm" c="dimmed" mt={4}>
                        {project.company} • {project.period}
                    </Text>
                </div>

                <Text size="sm" lineClamp={3}>
                    {project.description}
                </Text>

                {/* Links */}
                {links && (
                    <Group mt="md">
                        {links.map((link) => (
                            <Button
                                key={link.type}
                                component="a"
                                {...getLinkProps(link)}
                                variant="light"
                                size="sm"
                                leftSection={getIcon(link.type)}
                                className="rounded-md dark:bg-navy-200/20 dark:text-[#FFF]">
                                {link.type === 'github'
                                    ? 'GitHub'
                                    : link.type === 'demo'
                                      ? 'Live Demo'
                                      : 'View Details'}
                            </Button>
                        ))}
                    </Group>
                )}
                <Divider size="xs" className="w-[50%] mx-auto mt-auto border-gray-400 dark:border-dark-300" />
                {/* Tech Stack */}
                <Stack justify="flex-end" className="flex flex-col">
                    <Group justify="space-between" className="pr-2">
                        <Title order={4}>Tech Stack</Title>
                        <ActionIcon variant="transparent" onClick={toggle}>
                            {opened ? (
                                <IconLayoutBottombarCollapseFilled className="text-dark dark:text-stone-50" />
                            ) : (
                                <IconLayoutBottombarCollapse className="text-dark dark:text-stone-50" />
                            )}
                        </ActionIcon>
                    </Group>
                    <Collapse in={opened}>
                        <Stack>
                            {project?.techStack?.map((stack) => (
                                <div key={stack.category}>
                                    <Text size="sm" fw={500} mb={2}>
                                        {stack.category}:
                                    </Text>
                                    <Group gap="xs">
                                        {stack.items.map((item) => (
                                            <Badge
                                                key={item}
                                                size="sm"
                                                variant="dot"
                                                className="shadow-md dark:shadow-dark-sm">
                                                {item}
                                            </Badge>
                                        ))}
                                    </Group>
                                </div>
                            ))}
                        </Stack>
                    </Collapse>
                </Stack>
            </Stack>
        </MotionCard>
    );
}
