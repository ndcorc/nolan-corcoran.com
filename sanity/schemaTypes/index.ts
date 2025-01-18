import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import category from './category';
import project from './project';
import caseStudy from './caseStudy';
import architectureDiagram from './architectureDiagram';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, caseStudy, architectureDiagram, post, category]
};
