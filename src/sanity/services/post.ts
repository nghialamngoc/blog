import { Post } from '@/types/post'
import { sanityFetch } from '../lib/client'

export const postService = {
  getPostList: async (page: number = 1, perPage: number = 6, category?: string) => {
    const query = `*[_type == 'post' 
      ${category ? `&& category._ref match *[_type=='category' && value.current=='${category}'][0]._id` : ''}
    ]
    {
      title,
      shortDescription,
      'slug': slug.current,
      category-> {
        label,
        'value': value.current
      },
      mainImage,
      _createdAt
    } | order(_createdAt desc)`

    const total = await sanityFetch<number>({
      query: `count(${query})`,
    })

    const data = await sanityFetch<Post[]>({
      query: query + `[${(page - 1) * perPage}...${page * perPage}]`,
    })

    return { data, total }
  },
  getPost: async (slug: string) => {
    return await sanityFetch<Post>({
      query: `*[_type == 'post' && slug.current == $slug][0]
        {
          title,
          shortDescription,
          'slug': slug.current,
          category-> {
            label,
            'value': value.current
          },
          mainImage,
          content[]{
            ...,
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "slug": @.reference->slug
              }
            }
          },
          _createdAt
        }`,
      params: {
        slug,
      },
    })
  },
}