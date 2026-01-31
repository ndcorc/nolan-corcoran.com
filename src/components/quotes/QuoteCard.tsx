// src/components/quotes/QuoteCard.tsx
'use client';

import { Card, Text } from '@mantine/core';
import { Quote } from '@/types/sanity';
import { motion } from 'framer-motion';

interface QuoteCardProps {
    quote: Quote;
    onClick: () => void;
}

export default function QuoteCard({ quote, onClick }: QuoteCardProps) {
    const citation = `${quote.author}${quote.source ? `, ${quote.source}` : ''}`;

    return (
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="h-full flex flex-col cursor-pointer transition-shadow hover:shadow-md border border-solid dark:border-dark-400 bg-stone-50 dark:bg-dark-600"
                onClick={onClick}>
                <div className="flex-grow overflow-hidden">
                    <Text className="text-lg italic mb-4 line-clamp-6" title={quote.text}>
                        &ldquo;{quote.text}&rdquo;
                    </Text>
                </div>

                <Text className="text-md font-medium text-gray-700 dark:text-gray-300">— {citation}</Text>
            </Card>
        </motion.div>
    );
}
