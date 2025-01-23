'use client';

import { Container, Title, Text, Button } from '@mantine/core';
import { IconFileDownload } from '@tabler/icons-react';

export default function PortfolioHero() {
    return (
        <div className="pt-20 pb-10">
            <Container size="lg" className="flex flex-col gap-8">
                <div className="text-center">
                    <Title order={1} className="md:text-6xl text-4xl mb-6 font-serif">
                        Cloud Engineering & Development
                    </Title>
                    <Text className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Building robust cloud solutions and modern web applications with a focus on scalability,
                        performance, and user experience.
                    </Text>
                </div>
                {/* Resume Button */}
                <div className="flex justify-center mb-12">
                    <Button
                        component="a"
                        href="/resume.pdf"
                        download="nolan-corcoran-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        leftSection={<IconFileDownload size={20} />}
                        size="lg"
                        radius="md"
                        className={`
                            text-[#FFF] hover:text-brand-500 dark:text-white dark:hover:text-navy-500
                            inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 
                            bg-gradient-to-b from-brand-600 to-brand-300 hover:bg-none hover:border hover:border-brand-500 hover:bg-transparent
                            dark:bg-gradient-to-b dark:from-navy-800 dark:to-navy-50 dark:hover:bg-none dark:hover:border dark:hover:border-navy-500 dark:hover:bg-transparent
                        `}
                        aria-label="Download Resume (PDF)">
                        Download Resume (PDF)
                    </Button>
                </div>
            </Container>
        </div>
    );
}
