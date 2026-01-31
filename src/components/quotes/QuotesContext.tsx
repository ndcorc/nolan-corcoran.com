// src/components/quotes/QuotesContent.tsx
'use client';

import { useState } from 'react';
import { AppShellMain, Container, Title, Text, SimpleGrid, TextInput, Select, Group, Button } from '@mantine/core';
import { useQuotes, useQuoteFilterOptions } from '@/lib/sanity/sanity.hooks';
import { Quote } from '@/types/sanity';
import { IconSearch, IconFilterX } from '@tabler/icons-react';
import QuoteCard from './QuoteCard';
import QuoteModal from './QuoteModal';

export default function QuotesContent() {
    // State for filters
    const [searchTerm, setSearchTerm] = useState('');
    const [author, setAuthor] = useState<string | null>(null);
    const [source, setSource] = useState<string | null>(null);
    const [topic, setTopic] = useState<string | null>(null);
    const [subtopic, setSubtopic] = useState<string | null>(null);
    const [tag, setTag] = useState<string | null>(null);

    // State for the modal
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch quotes
    const { data: quotes } = useQuotes();
    const { data: filterOptions } = useQuoteFilterOptions();

    // Filtered quotes
    const filteredQuotes = quotes?.filter((quote) => {
        const searchMatch =
            !searchTerm ||
            quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (quote.source && quote.source.toLowerCase().includes(searchTerm.toLowerCase()));

        const authorMatch = !author || quote.author === author;
        const sourceMatch = !source || quote.source === source;
        const topicMatch = !topic || quote.topic === topic;
        const subtopicMatch = !subtopic || quote.subtopic === subtopic;
        const tagMatch = !tag || (quote.tags && quote.tags.includes(tag));

        return searchMatch && authorMatch && sourceMatch && topicMatch && subtopicMatch && tagMatch;
    });

    // Handle opening modal
    const handleQuoteClick = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsModalOpen(true);
    };

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setAuthor(null);
        setSource(null);
        setTopic(null);
        setSubtopic(null);
        setTag(null);
    };

    // Prepare select data
    const authorOptions = filterOptions?.authors.map((a) => ({ value: a, label: a })) || [];
    const sourceOptions = filterOptions?.sources.filter(Boolean).map((s) => ({ value: s, label: s })) || [];
    const topicOptions = filterOptions?.topics.filter(Boolean).map((t) => ({ value: t, label: t })) || [];
    const subtopicOptions = filterOptions?.subtopics.filter(Boolean).map((s) => ({ value: s, label: s })) || [];
    const tagOptions = filterOptions?.tags.filter(Boolean).map((t) => ({ value: t, label: t })) || [];

    return (
        <AppShellMain className="pb-32">
            <Container size="lg" className="py-16">
                <Title order={1} className="text-center mb-8 font-serif">
                    Quotes
                </Title>
                <Text className="text-center mb-12 max-w-2xl mx-auto">
                    A collection of thought-provoking quotes from theologians, philosophers, and Christian thinkers.
                </Text>

                {/* Search and Filter Section */}
                <div className="mb-12">
                    <TextInput
                        placeholder="Search quotes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        leftSection={<IconSearch size={16} />}
                        className="mb-4"
                    />

                    <Group className="flex-wrap">
                        <Select
                            placeholder="Filter by Author"
                            data={authorOptions}
                            value={author}
                            onChange={setAuthor}
                            clearable
                            className="flex-1 min-w-[200px]"
                        />
                        <Select
                            placeholder="Filter by Source"
                            data={sourceOptions}
                            value={source}
                            onChange={setSource}
                            clearable
                            className="flex-1 min-w-[200px]"
                        />
                        <Select
                            placeholder="Filter by Topic"
                            data={topicOptions}
                            value={topic}
                            onChange={setTopic}
                            clearable
                            className="flex-1 min-w-[200px]"
                        />
                        <Select
                            placeholder="Filter by Subtopic"
                            data={subtopicOptions}
                            value={subtopic}
                            onChange={setSubtopic}
                            clearable
                            className="flex-1 min-w-[200px]"
                        />
                        <Select
                            placeholder="Filter by Tag"
                            data={tagOptions}
                            value={tag}
                            onChange={setTag}
                            clearable
                            className="flex-1 min-w-[200px]"
                        />
                        <Button variant="outline" leftSection={<IconFilterX size={16} />} onClick={resetFilters}>
                            Clear Filters
                        </Button>
                    </Group>
                </div>

                {/* Results count */}
                <Text className="mb-4 text-gray-600 dark:text-gray-400">
                    Showing {filteredQuotes?.length || 0} quotes
                </Text>

                {/* Quotes Grid */}
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                    {filteredQuotes?.map((quote) => (
                        <QuoteCard key={quote._id} quote={quote} onClick={() => handleQuoteClick(quote)} />
                    ))}
                </SimpleGrid>

                {/* Quote Modal */}
                {selectedQuote && (
                    <QuoteModal quote={selectedQuote} opened={isModalOpen} onClose={() => setIsModalOpen(false)} />
                )}
            </Container>
        </AppShellMain>
    );
}
