// src/components/home/HeroSection.tsx
'use client';

import { Container, Title, Text, Stack, useMantineColorScheme, BackgroundImage, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GradientButton } from '../shared/GradientButton';

export default function HeroSection() {
    const { colorScheme } = useMantineColorScheme();

    const isDark = colorScheme === 'dark';

    return (
        <section>
            <BackgroundImage src={isDark ? '/img/bgDark.png' : '/img/bgIMG.png'}>
                <Container fluid className="relative z-10">
                    <div className="flex flex-col xl:flex-row min-h-screen px-0 xl:px-16 py-20">
                        {/* Left Content */}
                        <motion.div
                            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col flex-[0.5] justify-start items-end xl:my-20 xl:mx-8 mt-4 mb-0 m-auto">
                            <Stack
                                justify="center"
                                mb="2rem"
                                gap={12}
                                className="w-full flex justify-end items-end flex-col">
                                {/* Greeting Card */}
                                <div className="bg-stone-50 dark:bg-gray-800 rounded-2xl shadow-sm border p-[16px_40px]">
                                    <Group>
                                        <span className="text-4xl 2xl:text-6xl">👋</span>
                                        <Stack gap={0} ml={20}>
                                            <Text size="xs" className="uppercase tracking-wide w-full leading-normal">
                                                Hello, I am
                                            </Text>
                                            <Title order={2} className="mt-0 mb-0 -ml-0.5 font-bold">
                                                Nolan
                                            </Title>
                                        </Stack>
                                    </Group>
                                </div>

                                {/* Topics Card */}
                                <div className="bg-stone-50 dark:bg-gray-800 rounded-2xl shadow-sm border p-[16px_40px]">
                                    <Stack align="flex-end" gap={0}>
                                        {['Theology and Apologetics', 'Culture and Politics', 'Cloud Engineering'].map(
                                            (text) => (
                                                <Text key={text} size="xs" tt="uppercase" className="text-right">
                                                    {text}
                                                </Text>
                                            )
                                        )}
                                    </Stack>
                                </div>
                                {/* Button */}
                                <GradientButton href={`/blog`} className="no-underline justify-end flex" />
                            </Stack>
                        </motion.div>

                        {/* Right Content - Profile Image */}
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, delayChildren: 0.5 }}
                            className="flex-1 flex max-h-[80%] justify-end items-start relative xl:m-8 m-2">
                            <Image
                                src="/img/placeholder-profile.png"
                                alt="profile"
                                width={1500}
                                height={1500}
                                className="object-cover -mt-8 z-10 w-full"
                                priority
                            />
                            <motion.img
                                whileInView={{ scale: [0, 1] }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                src="/icons/circle.svg"
                                alt="circle"
                                className="absolute inset-0 z-0 w-full h-[90%]"
                            />
                        </motion.div>
                    </div>
                </Container>
            </BackgroundImage>
        </section>
    );
}
