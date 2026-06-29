import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import category from './category';
import project from './project';
import twoColumnBlock from './blocks/twoColumnBlock';
import quote from './quote';
import patristicQuote from './patristicQuote';
import {
    patristicTopic,
    patristicSubtopic,
    patristicEra,
    patristicFather,
    patristicSource,
    patristicWork,
    patristicPosition
} from './patristicVocabulary';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        project,
        post,
        category,
        quote,
        patristicQuote,
        patristicTopic,
        patristicSubtopic,
        patristicEra,
        patristicFather,
        patristicSource,
        patristicWork,
        patristicPosition,
        twoColumnBlock
    ]
};
