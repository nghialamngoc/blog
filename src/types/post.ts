import { Image } from 'sanity'
import { Category } from './category'

export interface Post {
  _id: string
  title: string
  shortDescription: string
  category?: Category
  slug: string
  mainImage: Image
  summary?: string[]
  content: any
  _createdAt: string
}
