import { Box, Text, Title } from '@mantine/core';
import { PatristicQuotesApp } from '@/components/apologetics/quotes';
import { getCachedPatristicQuotes } from '@/lib/sanity/patristicQuotes.cache';

export const revalidate = 3600;

export default async function QuotesPage() {
    const quotes = await getCachedPatristicQuotes();

    return (
        <Box p={{ base: 'md', md: 'xl' }} maw={1200} mx="auto">
            <Title order={1} size="h2" mb="xs">
                Quotes
            </Title>
            <Text c="dimmed" mb="lg" style={{ fontSize: '18px' }}>
                Quotations from early church fathers and other primary sources, indexed from historical
                Reformed theological works.
            </Text>
            <PatristicQuotesApp quotes={quotes} />
        </Box>
    );
}
