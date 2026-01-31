import type { Node, Edge } from '@xyflow/react';

export type DiagramNodeType = 'concept' | 'scripture' | 'connector' | 'group';
export type DiagramEdgeType = 'default' | 'dependency' | 'contrast' | 'derivation';
export type DiagramNodeCategory =
  | 'metaphysical'
  | 'logical'
  | 'epistemological'
  | 'semantic'
  | 'moral'
  | 'social'
  | 'historical'
  | 'central'
  | 'default';

export interface DiagramNodeData extends Record<string, unknown> {
  label: string;
  glossaryTermId?: string;
  description?: string;
  detailPanelId?: string;
  nodeType?: DiagramNodeType;
  nodeCategory?: DiagramNodeCategory;
}

export interface DetailPanel {
  id: string;
  title: string;
  content: string;
  glossaryTermIds?: string[];
  scriptureReferences?: string[];
}

export type DiagramNode = Node<DiagramNodeData>;

export interface DiagramDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  nodes: DiagramNode[];
  edges: Edge[];
  detailPanels?: Record<string, DetailPanel>;
}

export interface DiagramMeta {
  id: string;
  title: string;
  description: string;
  category: string;
}
