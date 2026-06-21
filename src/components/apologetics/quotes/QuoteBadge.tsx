import { Badge } from '@mantine/core';
import type { BadgeStyle } from '@/types/apologetics/patristicQuote';

interface QuoteBadgeProps {
    label: string;
    style?: BadgeStyle;
}

export function QuoteBadge({ label, style }: QuoteBadgeProps) {
    if (!style) return null;

    return (
        <Badge
            size="sm"
            variant="light"
            className="patristic-quote-card__meta-badge"
            style={{
                backgroundColor: style.bg,
                color: style.text,
                border: style.border ? `1px solid ${style.border}` : undefined
            }}>
            {label}
        </Badge>
    );
}
