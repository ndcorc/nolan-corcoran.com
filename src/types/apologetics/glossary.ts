export interface GlossaryEntry {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  fullDescription?: string;
  parentId?: string;
  relatedTerms?: string[];
  scriptureReferences?: string[];
  category?: string;
}

export interface GlossaryMap {
  [id: string]: GlossaryEntry;
}

export interface GlossaryCategory {
  name: string;
  entries: GlossaryEntry[];
}
