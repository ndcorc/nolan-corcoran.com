// src/lib/sanity/image.ts
import { client } from '@/../sanity/lib/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { type Image } from 'sanity';

const builder = createImageUrlBuilder(client);

export function urlForImage(source: Image) {
    return builder.image(source).auto('format').fit('max');
}
