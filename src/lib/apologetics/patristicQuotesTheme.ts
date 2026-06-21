import { PATRISTIC_QUOTES } from '@/data/apologetics/quotes/patristicQuotes';
import type { BadgeStyle } from '@/types/apologetics/patristicQuote';

const unique = (values: string[]) => [...new Set(values)].sort();

export const PATRISTIC_TOPICS = unique(PATRISTIC_QUOTES.map((q) => q.topic));
export const PATRISTIC_FATHERS = unique(PATRISTIC_QUOTES.map((q) => q.father));
export const PATRISTIC_ERAS = unique(PATRISTIC_QUOTES.map((q) => q.era));
export const PATRISTIC_BOOKS = unique(PATRISTIC_QUOTES.map((q) => q.book));
export const PATRISTIC_SECTIONS = unique(PATRISTIC_QUOTES.map((q) => q.section));
export const PATRISTIC_POSITIONS = unique(PATRISTIC_QUOTES.map((q) => q.perkinsPosition));

export const ERA_ORDER: Record<string, number> = {
    'Latin Patristic': 1,
    'Greek Patristic': 2,
    Byzantine: 3,
    Medieval: 4,
    'Post-Tridentine': 5,
    Reformation: 6
};

export const ERA_COLORS: Record<string, BadgeStyle> = {
    'Latin Patristic': { bg: 'var(--mantine-color-violet-light)', text: 'var(--mantine-color-violet-light-color)' },
    'Greek Patristic': { bg: 'var(--mantine-color-cyan-light)', text: 'var(--mantine-color-cyan-light-color)' },
    Byzantine: { bg: 'var(--mantine-color-teal-light)', text: 'var(--mantine-color-teal-light-color)' },
    Medieval: { bg: 'var(--mantine-color-orange-light)', text: 'var(--mantine-color-orange-light-color)' },
    'Post-Tridentine': { bg: 'var(--mantine-color-red-light)', text: 'var(--mantine-color-red-light-color)' },
    Reformation: { bg: 'var(--mantine-color-blue-light)', text: 'var(--mantine-color-blue-light-color)' }
};

export const POSITION_COLORS: Record<string, BadgeStyle> = {
    Reformed: { bg: 'var(--mantine-color-teal-light)', text: 'var(--mantine-color-teal-light-color)' },
    'Roman Catholic': { bg: 'var(--mantine-color-red-light)', text: 'var(--mantine-color-red-light-color)' },
    Nuanced: { bg: 'var(--mantine-color-yellow-light)', text: 'var(--mantine-color-yellow-light-color)' }
};
