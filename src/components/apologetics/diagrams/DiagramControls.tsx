// src/components/apologetics/diagrams/DiagramControls.tsx
'use client';

import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { useReactFlow } from '@xyflow/react';
import { IconZoomIn, IconZoomOut, IconMaximize, IconMinimize, IconRefresh } from '@tabler/icons-react';

interface DiagramControlsProps {
    onFullscreenToggle?: () => void;
    isFullscreen?: boolean;
}

export function DiagramControls({ onFullscreenToggle, isFullscreen }: DiagramControlsProps) {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Stack gap="xs" className="absolute bottom-4 right-4 z-10">
            <Tooltip label="Zoom in" position="left">
                <ActionIcon
                    onClick={() => zoomIn()}
                    variant="default"
                    size="lg"
                    radius="md"
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                    <IconZoomIn size={18} />
                </ActionIcon>
            </Tooltip>

            <Tooltip label="Zoom out" position="left">
                <ActionIcon
                    onClick={() => zoomOut()}
                    variant="default"
                    size="lg"
                    radius="md"
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                    <IconZoomOut size={18} />
                </ActionIcon>
            </Tooltip>

            <Tooltip label="Fit to view" position="left">
                <ActionIcon
                    onClick={() => fitView({ padding: 0.2 })}
                    variant="default"
                    size="lg"
                    radius="md"
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                    <IconRefresh size={18} />
                </ActionIcon>
            </Tooltip>

            {onFullscreenToggle && (
                <Tooltip label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} position="left">
                    <ActionIcon
                        onClick={onFullscreenToggle}
                        variant="default"
                        size="lg"
                        radius="md"
                        style={{
                            backgroundColor: 'var(--mantine-color-body)'
                        }}>
                        {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
                    </ActionIcon>
                </Tooltip>
            )}
        </Stack>
    );
}
