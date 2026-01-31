// src/components/quotes/QuoteModal.tsx
'use client';

import { Modal, Text, Group, Badge, Title, Divider } from '@mantine/core';
import { Quote } from '@/types/sanity';

interface QuoteModalProps {
    quote: Quote;
    opened: boolean;
    onClose: () => void;
}

export default function QuoteModal({ quote, opened, onClose }: QuoteModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Title order={3}>Quote by {quote.author}</Title>}
            size="lg"
            padding="xl"
            centered
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3
            }}>
            <Text className="text-xl italic mb-6 leading-relaxed">&ldquo;{quote.text}&rdquo;</Text>

            <Group mb={2}>
                <Text fw={600}>Author:</Text>
                <Text>{quote.author}</Text>
            </Group>

            {quote.source && (
                <Group mb={2}>
                    <Text fw={600}>Source:</Text>
                    <Text>{quote.source}</Text>
                </Group>
            )}

            {quote.topic && (
                <Group mb={2}>
                    <Text fw={600}>Topic:</Text>
                    <Text>{quote.topic}</Text>
                </Group>
            )}

            {quote.subtopic && (
                <Group mb={2}>
                    <Text fw={600}>Subtopic:</Text>
                    <Text>{quote.subtopic}</Text>
                </Group>
            )}

            {quote.tags && quote.tags.length > 0 && (
                <>
                    <Divider my="md" />
                    <Group>
                        <Text fw={600}>Tags:</Text>
                        <Group gap="xs">
                            {quote.tags.map((tag) => (
                                <Badge key={tag} variant="light">
                                    {tag}
                                </Badge>
                            ))}
                        </Group>
                    </Group>
                </>
            )}
        </Modal>
    );
}
