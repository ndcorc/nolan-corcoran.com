import { Group, Badge } from '@mantine/core';
import { ERA_COLORS, POSITION_COLORS } from '@/lib/apologetics/patristicQuotesTheme';
import type { PatristicQuoteStats } from '@/types/apologetics/patristicQuote';

interface QuoteStatsProps {
    stats: PatristicQuoteStats;
}

export function QuoteStats({ stats }: QuoteStatsProps) {
    return (
        <Group gap="xs" mt="md">
            {Object.entries(stats.byPosition).map(([position, count]) => {
                const colors = POSITION_COLORS[position] || {};
                return (
                    <Badge
                        key={position}
                        size="lg"
                        variant="light"
                        style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            border: colors.border ? `1px solid ${colors.border}` : undefined
                        }}>
                        <strong>{count}</strong>{' '}
                        {position === 'Nuanced' ? 'nuanced cases' : `used against ${position} position`}
                    </Badge>
                );
            })}
            {Object.entries(stats.byEra).map(([era, count]) => {
                const colors = ERA_COLORS[era] || {};
                return (
                    <Badge
                        key={era}
                        size="lg"
                        variant="light"
                        style={{ backgroundColor: colors.bg, color: colors.text }}>
                        <strong>{count}</strong> {era}
                    </Badge>
                );
            })}
        </Group>
    );
}
