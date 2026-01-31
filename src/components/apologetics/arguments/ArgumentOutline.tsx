// src/components/apologetics/arguments/ArgumentOutline.tsx
'use client';

import { Box, Text, Stack, UnstyledButton } from '@mantine/core';
import type { ArgumentDefinition } from '@/types/apologetics';

interface ArgumentOutlineProps {
    argument: ArgumentDefinition;
    activeStepId?: string;
    onStepClick?: (stepId: string) => void;
}

export function ArgumentOutline({ argument, activeStepId, onStepClick }: ArgumentOutlineProps) {
    const getButtonStyle = (isActive: boolean) => ({
        backgroundColor: isActive ? 'var(--mantine-color-default-hover)' : undefined,
        color: isActive ? 'var(--apologetics-primary)' : undefined,
        borderRadius: 'var(--mantine-radius-sm)',
        padding: '4px 8px'
    });

    return (
        <Box component="nav">
            <Text size="xs" tt="uppercase" c="dimmed" fw={500} mb="xs">
                Outline
            </Text>

            <Stack gap={4}>
                {/* Premises */}
                <Box>
                    <Text size="xs" c="dimmed" mb={4}>
                        Premises
                    </Text>
                    <Stack gap={2}>
                        {argument.premises.map((premise, index) => (
                            <UnstyledButton
                                key={premise.id}
                                onClick={() => onStepClick?.(premise.id)}
                                className="w-full text-left"
                                style={getButtonStyle(activeStepId === premise.id)}>
                                <Text size="sm" truncate>
                                    {index + 1}. {premise.content.slice(0, 40)}...
                                </Text>
                            </UnstyledButton>
                        ))}
                    </Stack>
                </Box>

                {/* Conclusion */}
                <Box pt="xs" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                    <Text size="xs" c="dimmed" mb={4}>
                        Conclusion
                    </Text>
                    <UnstyledButton
                        onClick={() => onStepClick?.(argument.conclusion.id)}
                        className="w-full text-left"
                        style={getButtonStyle(activeStepId === argument.conclusion.id)}>
                        <Text size="sm" truncate fw={700}>
                            ∴ {argument.conclusion.content.slice(0, 40)}...
                        </Text>
                    </UnstyledButton>
                </Box>

                {/* Objections */}
                {argument.objections && argument.objections.length > 0 && (
                    <Box pt="xs" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                        <Text size="xs" c="dimmed">
                            Objections ({argument.objections.length})
                        </Text>
                    </Box>
                )}
            </Stack>
        </Box>
    );
}
