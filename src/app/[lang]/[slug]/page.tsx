import { FC } from 'react'
import Container from '@/components/Container'
import PortableTextCustom from '@/components/PortableTextCustom'
import Image from 'next/image'
import Link from '@/components/Link'
import { urlFor } from '@/sanity/lib/image'
import { postService } from '@/sanity/services'
import { redirect } from 'next/navigation'
import GoBack from '@/components/GoBack'
import { idTransform } from '@/utils/string'
import clsx from 'clsx'
import SubmmaryTab from '@/components/SummaryTab'

export interface PostDetailProps {
  params: {
    slug: string
  }
}

const PostDetail: FC<PostDetailProps> = async ({ params: { slug } }) => {
  const post = await postService.getPost(slug)

  const summaryData = post.summary?.split('\n') ?? []

  if (!post) {
    redirect('/')
  }
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1000).url() : null

  return (
    <Container className="relative flex">
      <GoBack className="absolute" />

      <div className="grow">
        {post.category && (
          <div className="text-center">
            <Link className="italic" href={post.category.value}>
              {post.category.label}
            </Link>
          </div>
        )}

        <h1 className="max-w-[600px] mx-auto text-[20px] lg:text-[30px] text-center font-medium">{post.title}</h1>
        <div className="text-center italic text-[12px] mb-32">{new Date(post._createdAt).toLocaleDateString()}</div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            width={1000}
            height={600}
            priority
            className="mx-auto w-full max-w-[800px] shadow-2xl border border-gray rounded-[10px]"
          />
        )}

        <PortableTextCustom className="py-64 leading-7" content={post.content} />
      </div>

      {!!summaryData.length && <SubmmaryTab className="hidden xl:flex shrink-0" data={summaryData} />}
    </Container>
  )
}

export default PostDetail
