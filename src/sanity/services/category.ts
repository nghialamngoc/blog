import { Category, TopNavigationCategory } from '@/types/category'
import { sanityFetch } from '../lib/client'

export const categoryService = {
  getHomeCategories: async () => {
    return await sanityFetch<Category[]>({
      query: `*[_type=="category"] {
        _id,
        label,
        'value': value.current,
        parent
      }`,
    })
  },

  getTopNavigationCategories: async () => {
    const result = await sanityFetch<Category[]>({
      query: `*[_type=="category"] {
        _id,
        label,
        'value': value.current,
        order,
        parent
      } | order(order asc)`,
    })

    return result.reduce((prev, current) => {
      if (current.parent) {
        const index = prev.findIndex((x) => x.label === current.parent)
        index >= 0
          ? prev[index].children?.push(current)
          : prev.push({
              _id: Date.now().toString(),
              label: current.parent,
              value: current.parent.toLowerCase(),
              children: [current],
              order: current.order,
            })
      } else {
        prev.push(current)
      }

      return prev
    }, [] as TopNavigationCategory[])
  },
}
