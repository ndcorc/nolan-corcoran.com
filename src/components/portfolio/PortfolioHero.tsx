'use client';

import { Container, Title, Text } from '@mantine/core';

export default function PortfolioHero() {
    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-900">
            <Container size="lg">
                <div className="text-center">
                    <Title order={1} className="text-4xl mb-6 font-serif">
                        Cloud Engineering & Development
                    </Title>
                    <Text className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Building robust cloud solutions and modern web applications with a focus on scalability,
                        performance, and user experience.
                    </Text>
                </div>
            </Container>
        </div>
    );
}
