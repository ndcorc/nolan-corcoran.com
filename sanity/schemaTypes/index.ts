import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import category from './category';
import project from './project';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, post, category]
};
