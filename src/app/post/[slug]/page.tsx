import { FC } from 'react'
import Container from '@/components/Container'
import PortableTextCustom from '@/components/PortableTextCustom'
import Image from 'next/image'
import Link from '@/components/Link'
import { urlFor } from '@/sanity/lib/image'
import { postService } from '@/sanity/services'
import { redirect } from 'next/navigation'
import GoBack from '@/components/GoBack'
import SubmmaryTab from '@/components/SummaryTab'
import { POST_PATH } from '@/config/constants'

export interface PostDetailProps {
  params: {
    slug: string
  }
}

const PostDetail: FC<PostDetailProps> = async ({ params: { slug } }) => {
  const post = await postService.getPost(slug)

  if (!post) {
    redirect('/')
  }
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1000).url() : null

  return (
    <Container className="relative flex">
      <GoBack className="absolute" href={POST_PATH} />

      <div className="grow">
        {post.category && (
          <div className="text-center">
            <Link className="text-black" href={post.category.value}>
              {post.category.label}
            </Link>
          </div>
        )}

        <h1 className="max-w-[800px] mx-auto text-20 lg:text-32 text-center font-bold">{post.title}</h1>
        <div className="text-center italic text-12 mb-32">{new Date(post._createdAt).toLocaleDateString()}</div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            width={1000}
            height={600}
            priority
            className="mx-auto w-full max-w-[800px] shadow-2xl border-1 border-gray rounded-[10px]"
          />
        )}

        <PortableTextCustom className="lg:py-32 leading-7" content={post.content} />
      </div>

      {!!post.summary?.length && <SubmmaryTab className="hidden xl:flex shrink-0" data={post.summary} />}
    </Container>
  )
}

export default PostDetail
