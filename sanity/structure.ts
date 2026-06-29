import type { StructureResolver } from 'sanity/structure';
import { apiVersion } from './env';
import { PATRISTIC_QUOTE_TYPES } from './schemaTypes/patristicVocabulary';

function subtopicQuotesList(S: Parameters<StructureResolver>[0], subtopicId: string) {
    return S.documentList()
        .title('Quotes')
        .schemaType('patristicQuote')
        .filter('_type == "patristicQuote" && references($subtopicId)')
        .params({ subtopicId })
        .defaultOrdering([{ field: 'legacyId', direction: 'asc' }]);
}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
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
                                .child(
                                    S.documentTypeList('patristicSubtopic')
                                        .title('Subtopics')
                                        .child(async (subtopicId) => {
                                            const client = context.getClient({ apiVersion });
                                            const title = await client.fetch<string | null>(
                                                `*[_id == $id][0].title`,
                                                { id: subtopicId }
                                            );

                                            return S.list()
                                                .title(title ?? 'Subtopic')
                                                .items([
                                                    S.listItem()
                                                        .title('Quotes')
                                                        .child(subtopicQuotesList(S, subtopicId)),
                                                    S.listItem()
                                                        .title('Edit Subtopic')
                                                        .child(
                                                            S.document()
                                                                .schemaType('patristicSubtopic')
                                                                .documentId(subtopicId)
                                                        )
                                                ]);
                                        })
                                ),
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
