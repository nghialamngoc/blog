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
  summary: string
  content: any
  _createdAt: string
}
