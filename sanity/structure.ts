import type { StructureResolver } from 'sanity/structure';
import { PATRISTIC_QUOTE_TYPES } from './schemaTypes/patristicVocabulary';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Patristic Quotes')
                .child(
                    S.list()
                        .title('Patristic Quotes')
                        .items([
                            S.listItem()
                                .title('Quotes')
                                .child(
                                    S.documentTypeList('patristicQuote').title('Patristic Quotes')
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Topic')
                                .child(S.documentTypeList('patristicTopic').title('Topics')),
                            S.listItem()
                                .title('Subtopics')
                                .child(S.documentTypeList('patristicSubtopic').title('Subtopics')),
                            S.listItem()
                                .title('Era')
                                .child(S.documentTypeList('patristicEra').title('Eras')),
                            S.listItem()
                                .title('Father')
                                .child(S.documentTypeList('patristicFather').title('Fathers')),
                            S.listItem()
                                .title('Source')
                                .child(S.documentTypeList('patristicSource').title('Sources')),
                            S.listItem()
                                .title('Work')
                                .child(S.documentTypeList('patristicWork').title('Works')),
                            S.listItem()
                                .title('Position')
                                .child(S.documentTypeList('patristicPosition').title('Positions'))
                        ])
                ),
            ...S.documentTypeListItems().filter(
                (item) => !PATRISTIC_QUOTE_TYPES.includes(item.getId?.() as (typeof PATRISTIC_QUOTE_TYPES)[number])
            )
        ]);
