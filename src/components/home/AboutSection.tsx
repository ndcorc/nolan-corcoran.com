// src/components/home/AboutSection.tsx
'use client';

import { Container, Text, Stack, Group, Title, Card, useMantineColorScheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBrain, IconBible, IconCode, IconBuildingChurch } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const interests = [
        {
            icon: IconBible,
            title: 'Theology',
            description: 'Passionate about studying Reformed theology and biblical exegesis.'
        },
        {
            icon: IconBrain,
            title: 'Apologetics',
            description: 'Engaging with philosophical and cultural challenges to the Christian faith.'
        },
        {
            icon: IconCode,
            title: 'Software Engineering',
            description: 'Building scalable solutions using modern cloud technologies.'
        },
        {
            icon: IconBuildingChurch,
            title: 'Christian Living',
            description: 'Exploring the practical applications of faith in everyday life.'
        }
    ];

    return (
        <section className="md:pt-20 md:pb-10 pb-6 pt-12">
            <motion.div whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 1 }}>
                <Container size="lg" className="relative px-2 md:px-4">
                    <Title order={2} size="h1" className="mb-12 text-center md:text-6xl text-4xl">
                        About Me
                    </Title>
                    <Stack className="gap-8">
                        <Group align="center" justify="center" className="gap-16">
                            {/* Left Column - Image and Quick Bio */}
                            <div className="flex-1">
                                <Stack className="sticky top-20">
                                    <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-3xl">
                                        <Image src="/img/fam.jpg" alt="Nolan Corcoran" fill className="object-cover" />
                                        <motion.div
                                            className="absolute inset-0"
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                background: isDark
                                                    ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
                                                    : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%)'
                                            }}
                                        />
                                    </div>
                                </Stack>
                            </div>

                            {/* Right Column - About Content */}
                            <div className="flex-[1.5]">
                                <Text className="mb-6 text-xl">
                                    {`Hello! My name is `}
                                    <Text size="xl" span fw={700}>
                                        Nolan Corcoran
                                    </Text>
                                    {`. I am a Christian, a husband to Maressa, and 
                                a father to one little boy and one little girl, both under two and worth every 
                                lost hour of sleep.`}
                                </Text>
                                <Text className="mb-6 text-xl">
                                    {`I am a software engineer with nearly a decade of professional experience building cloud native
                                applications and solutions. If you are interested in checking out some of my projects, see my `}
                                    <Link
                                        href="/portfolio"
                                        className="text-brand-600 hover:text-brand-700 dark:text-navy-400 dark:hover:text-navy-300 font-bold underline">
                                        portfolio
                                    </Link>
                                    {`.`}
                                </Text>
                                <Text className="mb-6 text-xl">
                                    {`
                                I also have a deep passion for theology and apologetics. I seek to bring clarity
                                and understanding to difficult theological issues that engage with today's cultural 
                                conversations. I continue to publish articles to my blog `}
                                    <Link
                                        href="/blog"
                                        className="text-brand-600 hover:text-brand-700 dark:text-navy-400 dark:hover:text-navy-300 font-bold underline">
                                        here
                                    </Link>
                                    {`.`}
                                </Text>
                            </div>
                        </Group>
                        {/* Interests/Focus Areas */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {interests.map((interest, index) => (
                                <Card
                                    key={index}
                                    className={`p-6 bg-stone-50 dark:bg-dark rounded-xl shadow-md dark:shadow-dark-lg border border-gray-200 dark:border-dark-400`}>
                                    <Stack align="flex-start" className="mb-3">
                                        <interest.icon
                                            size={36}
                                            className={isDark ? 'text-navy-400' : 'text-brand-600'}
                                        />
                                        <Title order={4} className="font-serif">
                                            {interest.title}
                                        </Title>
                                    </Stack>
                                    <Text size="sm" c="dimmed">
                                        {interest.description}
                                    </Text>
                                </Card>
                            ))}
                        </div>
                    </Stack>
                </Container>
            </motion.div>
        </section>
    );
}
