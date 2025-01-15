import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';
import { type Image } from 'sanity';

const builder = imageUrlBuilder(client);

export function urlForImage(source: Image) {
    return builder.image(source).auto('format').fit('max');
}
