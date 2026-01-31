import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import category from './category';
import project from './project';
import twoColumnBlock from './blocks/twoColumnBlock';
import quote from './quote';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [project, post, category, quote, twoColumnBlock]
};
