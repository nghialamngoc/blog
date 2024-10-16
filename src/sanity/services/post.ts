import { Post } from '@/types/post'
import { sanityFetch } from '../lib/client'
import { info } from '@/utils/safety-log'
import { DEFAULT_ITEM_PER_PAGE } from '@/config/constants'

export const postService = {
  getPostList: async (ids: string[], page: number = 1, perPage: number = DEFAULT_ITEM_PER_PAGE, category?: string) => {
    const query = `*[_type == 'post'
      && category._ref in ${JSON.stringify(ids)}
      ${category ? `&& category._ref match *[_type=='category' && value.current=='${category}'][0]._id` : ''}
    ]
    {
      title,
      shortDescription,
      'slug': slug.current,
      category-> {
        label,
        'value': value.current,
        'href': href.current,
        parent
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
    const result = await sanityFetch<Post>({
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
          summary,
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

    const summary =
      result?.content?.reduce((prev: any, current: any) => {
        if ((current.style === 'h2' || current.style === 'h3') && !!current.children?.[0]?.text) {
          prev.push(`${current.style === 'h2' ? '- ' : '+ '}${current.children?.[0]?.text}`)
        }
        return prev
      }, []) ?? []

    info(`getPost ${slug}:`, { ...result, summary })

    return { ...result, summary }
  },
}
