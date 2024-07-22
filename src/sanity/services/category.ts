import { Category } from '@/types/category'
import { sanityFetch } from '../lib/client'

export const categoryService = {
  getHomeCategories: async () => {
    return await sanityFetch<Category[]>({
      query: `*[_type=="category"] {
        _id,
        label,
        'value': value.current
      }`,
    })
  },
}
