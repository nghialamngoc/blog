import { sanityFetch } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { Post } from '@/types/post'
import Image from 'next/image'

const PostPage = async () => {
  const posts = await sanityFetch<Post[]>({
    query: `*[_type == 'post']
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
    } | order(_createdAt desc)`,
  })

  return (
    <div>
      Post Page
      {posts.map((post, index) => {
        const imageUrl = post.mainImage ? urlForImage(post.mainImage) : null

        return (
          <div key={index}>
            {imageUrl && <Image src={imageUrl} alt="" width={300} height={300} />}
            {post.title}
            {post.shortDescription}

            <div>{JSON.stringify(post.category)}</div>
            <div>{new Date(post._createdAt).toLocaleDateString()}</div>
          </div>
        )
      })}
    </div>
  )
}

export default PostPage
