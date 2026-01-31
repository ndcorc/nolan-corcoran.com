// src/components/apologetics/diagrams/DiagramDetailPanel.tsx
'use client';

import { Box, Text, Group, CloseButton, Stack } from '@mantine/core';
import { TermReference } from '@/components/apologetics/common';
import type { DetailPanel } from '@/types/apologetics';

interface DiagramDetailPanelProps {
    panel: DetailPanel;
    onClose: () => void;
    isMobile?: boolean;
}

export function DiagramDetailPanel({ panel, onClose, isMobile }: DiagramDetailPanelProps) {
    return (
        <Box
            className="overflow-y-auto"
            style={{
                backgroundColor: 'var(--mantine-color-body)',
                borderColor: 'var(--mantine-color-default-border)',
                ...(isMobile
                    ? {
                          position: 'fixed',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          maxHeight: '50vh',
                          borderTop: '1px solid',
                          borderTopLeftRadius: 'var(--mantine-radius-lg)',
                          borderTopRightRadius: 'var(--mantine-radius-lg)',
                          zIndex: 50
                      }
                    : {
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '320px',
                          height: '100%',
                          borderLeft: '1px solid'
                      })
            }}>
            {/* Handle for mobile */}
            {isMobile && (
                <Box className="flex justify-center py-2">
                    <Box
                        style={{
                            width: '48px',
                            height: '4px',
                            backgroundColor: 'var(--mantine-color-default-border)',
                            borderRadius: 'var(--mantine-radius-xl)'
                        }}
                    />
                </Box>
            )}

            {/* Header */}
            <Group
                justify="space-between"
                p="md"
                style={{
                    borderBottom: '1px solid var(--mantine-color-default-border)'
                }}>
                <Text fw={600}>{panel.title}</Text>
                <CloseButton onClick={onClose} />
            </Group>

            {/* Content */}
            <Box p="md">
                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                    {panel.content}
                </Text>

                {/* Related glossary terms */}
                {panel.glossaryTermIds && panel.glossaryTermIds.length > 0 && (
                    <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                        <Text size="sm" fw={500} c="dimmed" mb="xs">
                            Related Terms
                        </Text>
                        <Group gap="xs">
                            {panel.glossaryTermIds.map((termId) => (
                                <TermReference key={termId} termId={termId} />
                            ))}
                        </Group>
                    </Box>
                )}

                {/* Scripture references */}
                {panel.scriptureReferences && panel.scriptureReferences.length > 0 && (
                    <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                        <Text size="sm" fw={500} c="dimmed" mb="xs">
                            Scripture References
                        </Text>
                        <Stack gap={4}>
                            {panel.scriptureReferences.map((ref, i) => (
                                <Text key={i} size="sm" c="dimmed">
                                    {ref}
                                </Text>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
