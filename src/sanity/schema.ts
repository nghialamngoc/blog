import { type SchemaTypeDefinition } from 'sanity'
import { PostSantitySchema } from './schemas/post'
import { CategorySantitySchema } from './schemas/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [PostSantitySchema, CategorySantitySchema],
}
