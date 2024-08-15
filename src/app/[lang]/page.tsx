import { FC } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import Container from '@/components/Container'
import { urlFor } from '@/sanity/lib/image'
import { RouterPagination } from '@/components/Pagination/RouterPagination'
import { categoryService, postService } from '@/sanity/services'
import { HomeCategories } from '@/components/HomeCategories/HomeCategories'

interface HomeProps {
  searchParams: {
    page?: number
    perPage?: number
    category?: string
  }
}

const Home: FC<HomeProps> = async ({ searchParams: { page, perPage = 6, category } }) => {
  const { data: posts, total } = await postService.getPostList(page, perPage, category)
  const categories = await categoryService.getHomeCategories()

  return (
    <Container>
      <HomeCategories className="mb-32" categories={categories} />

      <div className="grid md:grid-cols-2 gap-16">
        {!!posts.length
          ? posts.map((post, index) => {
              const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1000).url() : null

              return (
                <div key={index} className="rounded-[16px] border">
                  {imageUrl && (
                    <Image
                      className="w-full h-[300px] rounded-t-[16px] object-contain"
                      src={imageUrl}
                      alt=""
                      width={800}
                      height={800}
                    />
                  )}

                  <Link href={post.slug} className="flex flex-col p-16 gap-4">
                    <div className="italic text-[14px]">
                      {new Date(post._createdAt).toLocaleDateString()} - {post?.category?.label}
                    </div>

                    <h2 className="text-[20px] dark:text-white font-medium">{post.title}</h2>
                    <h3 className="text-[14px]">{post.shortDescription}</h3>
                  </Link>
                </div>
              )
            })
          : 'Hiện chưa có bài viết nào.'}
      </div>

      <RouterPagination className="mt-32" total={total} perPage={perPage} />
    </Container>
  )
}

export default Home
