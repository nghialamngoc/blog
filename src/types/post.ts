import { Image } from 'sanity'
import { Category } from './category'

export interface Post {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  category?: Category
  mainImage?: Image
  summary?: string[]
  content?: any
  _createdAt?: string
}
