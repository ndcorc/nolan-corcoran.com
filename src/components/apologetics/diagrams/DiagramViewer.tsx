// src/components/apologetics/diagrams/DiagramViewer.tsx
'use client';

import { useCallback, useState, useEffect } from 'react';
import { ReactFlow, Background, BackgroundVariant, useNodesState, useEdgesState, type NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@mantine/core';

import { DiagramNode } from './DiagramNode';
import { DiagramEdge } from './DiagramEdge';
import { DiagramControls } from './DiagramControls';
import { DiagramDetailPanel } from './DiagramDetailPanel';
import type { DiagramDefinition, DiagramNodeData, DetailPanel } from '@/types/apologetics';

interface DiagramViewerProps {
    diagram: DiagramDefinition;
}

const nodeTypes = {
    concept: DiagramNode,
    scripture: DiagramNode,
    connector: DiagramNode,
    group: DiagramNode,
    default: DiagramNode
};

const edgeTypes = {
    default: DiagramEdge,
    dependency: DiagramEdge,
    contrast: DiagramEdge,
    derivation: DiagramEdge
};

export function DiagramViewer({ diagram }: DiagramViewerProps) {
    const [nodes, , onNodesChange] = useNodesState(diagram.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(diagram.edges);
    const [selectedPanel, setSelectedPanel] = useState<DetailPanel | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle node click
    const onNodeClick: NodeMouseHandler = useCallback(
        (_event, node) => {
            const nodeData = node.data as DiagramNodeData;

            // If node has a detail panel, show it
            if (nodeData.detailPanelId && diagram.detailPanels?.[nodeData.detailPanelId]) {
                setSelectedPanel(diagram.detailPanels[nodeData.detailPanelId]);
            }
        },
        [diagram.detailPanels]
    );

    // Highlight connected edges on node hover
    const onNodeMouseEnter: NodeMouseHandler = useCallback(
        (_event, node) => {
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.source === node.id || edge.target === node.id) {
                        return { ...edge, selected: true };
                    }
                    return edge;
                })
            );
        },
        [setEdges]
    );

    const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
        setEdges((eds) => eds.map((edge) => ({ ...edge, selected: false })));
    }, [setEdges]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <Box
            className="relative overflow-hidden"
            style={{
                backgroundColor: 'var(--mantine-color-body)',
                border: '1px solid var(--mantine-color-default-border)',
                borderRadius: isFullscreen ? 0 : 'var(--mantine-radius-md)',
                height: isFullscreen ? '100vh' : isMobile ? '400px' : '600px',
                ...(isFullscreen
                    ? {
                          position: 'fixed',
                          inset: 0,
                          zIndex: 100
                      }
                    : {})
            }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
                nodeTypes={nodeTypes as never}
                edgeTypes={edgeTypes as never}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.5}
                maxZoom={2}
                attributionPosition="bottom-left"
                proOptions={{ hideAttribution: true }}>
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="var(--mantine-color-dimmed)"
                />
                <DiagramControls onFullscreenToggle={toggleFullscreen} isFullscreen={isFullscreen} />
            </ReactFlow>

            {/* Detail panel */}
            {selectedPanel && (
                <DiagramDetailPanel panel={selectedPanel} onClose={() => setSelectedPanel(null)} isMobile={isMobile} />
            )}
        </Box>
    );
}
