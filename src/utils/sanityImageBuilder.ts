import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { Image } from 'sanity'

const builder = imageUrlBuilder(client)

export const urlFor = (source: Image) => {
  return builder.image(source)
}
