// src/app/apologetics/layout.tsx
'use client';

import { Box, Group } from '@mantine/core';
import { ApologeticsProvider } from '@/lib/apologetics/ApologeticsContext';
import { ApologeticsSidebar } from '@/components/apologetics/layout/ApologeticsSidebar';

export default function ApologeticsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ApologeticsProvider>
            <Group
                wrap="nowrap"
                gap={0}
                align="stretch"
                className="min-h-[calc(100vh-60px)]"
                data-section="apologetics"
                style={{ marginTop: '60px' }}>
                {/* Sidebar - fixed width on desktop */}
                <Box
                    className="hidden md:block"
                    style={{
                        width: '280px',
                        minWidth: '280px',
                        height: 'calc(100vh - 60px)',
                        position: 'sticky',
                        top: '60px'
                    }}>
                    <ApologeticsSidebar />
                </Box>

                {/* Main content area */}
                <Box className="flex-1 min-w-0">{children}</Box>
            </Group>
        </ApologeticsProvider>
    );
}
