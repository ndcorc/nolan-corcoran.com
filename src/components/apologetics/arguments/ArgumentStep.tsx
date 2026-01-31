// src/components/apologetics/arguments/ArgumentStep.tsx
'use client';

import { Box, Text, Group, Badge } from '@mantine/core';
import { TermReference } from '@/components/apologetics/common';
import type { ArgumentStep as ArgumentStepType } from '@/types/apologetics';

interface ArgumentStepProps {
    step: ArgumentStepType;
    index?: number;
    isConclusion?: boolean;
}

export function ArgumentStep({ step, index, isConclusion }: ArgumentStepProps) {
    return (
        <Box
            className="flex gap-4"
            py="md"
            style={{
                borderTop: isConclusion ? '2px solid var(--apologetics-primary)' : undefined,
                paddingTop: isConclusion ? 'var(--mantine-spacing-lg)' : undefined,
                marginTop: isConclusion ? 'var(--mantine-spacing-md)' : undefined
            }}>
            {/* Step number */}
            <Box
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: 'var(--apologetics-primary)',
                    color: 'white'
                }}>
                <Text
                    style={{ fontSize: isConclusion ? '20px' : '16px', marginBottom: isConclusion ? '6px' : undefined }}
                    fw={700}>
                    {isConclusion ? '∴' : index}
                </Text>
            </Box>

            {/* Content */}
            <Box className="flex-1">
                <Text style={{ lineHeight: 1.6, fontSize: '18px' }} fw={isConclusion ? 500 : undefined}>
                    {step.content}
                </Text>

                {/* Glossary terms referenced */}
                {step.glossaryTermIds && step.glossaryTermIds.length > 0 && (
                    <Group gap="xs" mt="xs">
                        {step.glossaryTermIds.map((termId) => (
                            <TermReference key={termId} termId={termId}>
                                <Badge
                                    size="md"
                                    variant="light"
                                    tt="capitalize"
                                    radius="xs"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '10px',
                                        color: 'var(--apologetics-badge-color)',
                                        backgroundColor: 'var(--apologetics-badge-bg)'
                                    }}>
                                    {/* Term name will be rendered by TermReference */}
                                </Badge>
                            </TermReference>
                        ))}
                    </Group>
                )}

                {/* Supporting references */}
                {step.supportingReferences && step.supportingReferences.length > 0 && (
                    <Text style={{ fontSize: '16px' }} c="dimmed" mt="xs">
                        <Text component="span" fw={500}>
                            References:{' '}
                        </Text>
                        {step.supportingReferences.join('; ')}
                    </Text>
                )}
            </Box>
        </Box>
    );
}
