import PortableTextCustom from '@/components/PortableTextCustom'
import { sanityFetch } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { Post } from '@/types/post'
import { urlFor } from '@/utils/sanityImageBuilder'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Refractor } from 'react-refractor'

export interface PostDetailProps {
  params: {
    slug: string
  }
}

const PostDetail: FC<PostDetailProps> = async ({ params: { slug } }) => {
  const post = await sanityFetch<Post>({
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

  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(300).height(300).url() : null

  return (
    <div>
      Post Detail
      <div>
        {imageUrl && <Image src={imageUrl} alt="" width={300} height={300} priority />}
        {post.title}
        {post.shortDescription}

        <div>{JSON.stringify(post.category)}</div>
        <div>{new Date(post._createdAt).toLocaleDateString()}</div>

        <PortableTextCustom content={post.content} />
      </div>
    </div>
  )
}

export default PostDetail
