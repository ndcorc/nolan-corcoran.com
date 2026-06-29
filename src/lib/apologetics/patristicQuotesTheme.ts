import type { BadgeStyle } from '@/types/apologetics/patristicQuote';

export const ERA_ORDER: Record<string, number> = {
    'Apostolic Father': 0,
    'Latin Patristic': 1,
    'Greek Patristic': 2,
    Byzantine: 3,
    Medieval: 4,
    'Post-Tridentine': 5,
    Reformation: 6
};

export const ERA_COLORS: Record<string, BadgeStyle> = {
    'Apostolic Father': { bg: 'var(--mantine-color-indigo-light)', text: 'var(--mantine-color-indigo-light-color)' },
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
