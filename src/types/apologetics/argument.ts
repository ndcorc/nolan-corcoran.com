export interface ArgumentStep {
  id: string;
  content: string;
  supportingReferences?: string[];
  glossaryTermIds?: string[];
}

export interface Objection {
  id: string;
  title: string;
  content: string;
  response: string;
}

export interface ArgumentDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  relatedDiagramId?: string;
  premises: ArgumentStep[];
  conclusion: ArgumentStep;
  objections?: Objection[];
  relatedArguments?: string[];
}

export interface ArgumentMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  relatedDiagramId?: string;
}
