import { Text } from '@sanity/ui';
import type { ReactNode } from 'react';

type BlockStyleComponentProps = {
    children: ReactNode;
};

export function BlockquoteStyle({ children }: BlockStyleComponentProps) {
    return (
        <Text
            as="blockquote"
            size={2}
            muted
            style={{
                borderLeft: '3px solid var(--card-border-color)',
                paddingLeft: '1em',
                margin: '0.5em 0'
            }}>
            {children}
        </Text>
    );
}
