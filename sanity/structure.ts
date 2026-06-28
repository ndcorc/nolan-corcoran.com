import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Patristic Quotes')
        .child(S.documentTypeList('patristicQuote').title('Patristic Quotes')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId?.() !== 'patristicQuote'
      )
    ])
