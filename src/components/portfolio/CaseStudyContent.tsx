// src/components/portfolio/CaseStudyContent.tsx
'use client';

import {
    Container,
    Title,
    Text,
    Image,
    Stack,
    Group,
    Badge,
    Button,
    List,
    Divider,
    SimpleGrid,
    ThemeIcon,
    Card,
    useMantineColorScheme
} from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconExternalLink, IconLayoutDashboard } from '@tabler/icons-react';
import * as TablerIcons from '@tabler/icons-react';
import type { ProjectDetails } from '@/types/sanity';
import ArchitectureDiagram from './ArchitectureDiagram';
import * as diagrams from '@/data/diagrams';
import { urlForImage } from '@/lib/sanity/image';
import React, { useEffect, useState } from 'react';

interface CaseStudyContentProps {
    project: ProjectDetails;
}

// Animation variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

function generateResults(project: ProjectDetails) {
    return (
        <>
            {project?.results?.map((result, index) => (
                <List.Item className="list-disc" key={index}>
                    {result}
                </List.Item>
            ))}
        </>
    );
}
function getDiagramForProject(projectId: string): string | null {
    switch (projectId) {
        case 'portfolio-website':
            return diagrams.portfolioWebsiteDiagram;
        case 'multi-platform-app':
            return diagrams.multiPlatformAppDiagram;
        case 'aws-architecture':
            return diagrams.awsArchitectureDiagram;
        default:
            return null;
    }
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
    const MotionSection = motion.section;
    const architectureDiagram = getDiagramForProject(project.slug.current);
    const { colorScheme } = useMantineColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = colorScheme === 'dark';

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

    function DynamicIcon({ iconName, size = 24 }: { iconName: string; size?: number }) {
        const Icon = TablerIcons[iconName as keyof typeof TablerIcons] as React.ComponentType<{ size: number }>;
        return Icon ? <Icon size={size} /> : null;
    }

    function getTechStackIcon(stackName: string) {
        let StackIcon = IconLayoutDashboard;
        switch (stackName) {
            case 'Frontend':
                StackIcon = IconLayoutDashboard;
                break;
            case 'Backend':
                StackIcon = TablerIcons.IconApi;
                break;
            case 'Cloud/Infrastructure':
                StackIcon = TablerIcons.IconCloudComputing;
                break;
            case 'DevOps':
                StackIcon = TablerIcons.IconGitPullRequest;
                break;
            case 'Database':
                StackIcon = TablerIcons.IconDatabase;
                break;
            case 'Development Tools':
                StackIcon = TablerIcons.IconTools;
                break;
            case 'Other':
                StackIcon = TablerIcons.IconWand;
                break;
        }
        return <StackIcon size={50} stroke={2} className="text-brand-600 dark:text-navy-400" />;
    }

    return (
        <article className="py-20">
            <div className="min-h-screen">
                {/* Hero Section */}
                <Group className="md:py-32 py-12 flex md:mx-24 mx-4 items-center md:flex-nowrap">
                    <Container size="lg">
                        <motion.div
                            variants={fadeIn}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5 }}>
                            <Title className="md:text-6xl text-5xl mb-4 font-serif">{project.title}</Title>
                            <Group mb="md">
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    color={project.type === 'full-stack' ? 'blue' : 'violet'}>
                                    {project.type === 'full-stack' ? 'Full Stack' : 'Cloud Architecture'}
                                </Badge>
                                <Badge size="lg" variant="light">
                                    {project.company}
                                </Badge>
                                <Badge size="lg" variant="light">
                                    {project.period}
                                </Badge>
                            </Group>
                            <Text size="xl" c="dimmed" maw={800}>
                                {project.description}
                            </Text>

                            {links && (
                                <Group mt="xl">
                                    {links.map(
                                        (link) =>
                                            link.type !== 'case-study' && (
                                                <Button
                                                    key={link.type}
                                                    component="a"
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    variant="light"
                                                    size="md"
                                                    leftSection={
                                                        link.type === 'github' ? (
                                                            <IconBrandGithub size={20} />
                                                        ) : (
                                                            <IconExternalLink size={20} />
                                                        )
                                                    }
                                                    className="rounded-md dark:bg-navy-200/20 dark:text-[#FFF]">
                                                    {link.type === 'github' ? 'View on GitHub' : 'Live Demo'}
                                                </Button>
                                            )
                                    )}
                                </Group>
                            )}
                        </motion.div>
                    </Container>
                    <Container className="md:max-w-[40%] w-full md:mt-0 mt-8">
                        <Image
                            src={urlForImage(project.image)}
                            alt={project.title}
                            className="object-cover w-full rounded-lg shadow-z"
                        />
                    </Container>
                </Group>
                <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />

                {/* Main Content */}
                <Container size="xl" className="py-16 max-md:mx-4">
                    <Stack gap={80}>
                        {/* Architecture Diagram */}
                        <motion.section
                            variants={fadeIn}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}>
                            <Title order={2} className="mb-8 font-serif">
                                Architecture Overview
                            </Title>
                            {project.architectureDiagramImage ? (
                                <div className="bg-stone-50 rounded-lg dark:bg-dark-200 shadow-dark-z dark:shadow-dark-lg">
                                    <Image
                                        src={urlForImage(project.architectureDiagramImage)}
                                        alt={project.title}
                                        className="object-cover w-full rounded-md"
                                    />
                                </div>
                            ) : (
                                architectureDiagram && <ArchitectureDiagram diagram={architectureDiagram} />
                            )}
                        </motion.section>
                        <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />
                        {/* Tech Stack */}
                        {mounted && (
                            <MotionSection
                                variants={fadeIn}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}>
                                <Title order={2} className="mb-8 font-serif">
                                    Technologies Used
                                </Title>
                                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                                    {project?.techStack?.map((stack) => (
                                        <Card
                                            key={stack.category}
                                            shadow="md"
                                            radius="xl"
                                            className="bg-[#FFF]/40 dark:bg-dark/80 border border-gray-300 dark:border-dark-500 shadow-dark-md dark:shadow-dark-z"
                                            padding="xl">
                                            {getTechStackIcon(stack.category)}
                                            <Text className="text-3xl" mt="md">
                                                {stack.category}
                                            </Text>
                                            <Divider
                                                size="md"
                                                className="w-[15%] border-brand dark:border-navy mt-2 mb-6"
                                            />
                                            <Group>
                                                {stack.items &&
                                                    stack.items.map((item) => (
                                                        <Badge
                                                            key={item}
                                                            size="lg"
                                                            color={isDark ? 'navy' : 'brand'}
                                                            variant="dot">
                                                            {item}
                                                        </Badge>
                                                    ))}
                                            </Group>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </MotionSection>
                        )}

                        <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />

                        {/* Project Details */}
                        <MotionSection
                            variants={fadeIn}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}>
                            <Title order={2} className="mb-8 font-serif">
                                Key Features & Implementation
                            </Title>
                            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-x-16 gap-y-8">
                                {/* Left column */}
                                <Stack>
                                    <Title order={3}>
                                        Key Features
                                        <Divider size="md" className="w-[48px] border-brand dark:border-navy my-2" />
                                    </Title>
                                    <List spacing="sm">
                                        {project?.implementation?.map((feature, index) => (
                                            <List.Item key={index} className="list-disc">
                                                {feature}
                                            </List.Item>
                                        ))}
                                    </List>
                                </Stack>

                                {/* Right column */}
                                <Stack>
                                    <Title order={3}>
                                        Technical Implementation
                                        <Divider size="md" className="w-[48px] border-brand dark:border-navy my-2" />
                                    </Title>
                                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                                        {project?.solutions?.map((solution, index) => (
                                            <div key={index}>
                                                <ThemeIcon radius="md" size="xl" className="mb-2">
                                                    <DynamicIcon iconName={solution.icon} size={24} />
                                                </ThemeIcon>
                                                <Title order={4}>{solution.title}</Title>
                                                <Text className="text-black/60 dark:text-[#FFF]/50">
                                                    {solution.description}
                                                </Text>
                                            </div>
                                        ))}
                                    </SimpleGrid>
                                </Stack>
                            </div>
                        </MotionSection>

                        <Divider size="xs" className="w-[75vw] mx-auto border-gray-400 dark:border-dark-400" />

                        {/* Results & Impact */}
                        <MotionSection
                            variants={fadeIn}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}>
                            <Title order={2} className="mb-8 font-serif">
                                Results & Impact
                            </Title>
                            <List className="text-lg leading-relaxed">{generateResults(project)}</List>
                        </MotionSection>
                    </Stack>
                </Container>
            </div>
        </article>
    );
}
