import { Image } from 'sanity'

export interface Post {
  _id: string
  title: string
  shortDescription: string
  category?: {
    label: string
    value: string
  }
  slug: string
  mainImage: Image
  content: any
  _createdAt: string
}
