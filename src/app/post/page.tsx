import { FC } from 'react'
import Image from 'next/image'
import Link from '@/ui/Link'
import Container from '@/ui/Container'
import { urlFor } from '@/sanity/lib/image'
import { RouterPagination } from '@/components/Pagination/RouterPagination'
import { categoryService, postService } from '@/sanity/services'
import SubNav from '@/components/SubNav'
import { DEFAULT_ITEM_PER_PAGE } from '@/config/constants'

interface PostProps {
  searchParams: {
    page?: number
    perPage?: number
    category?: string
  }
}

const Post: FC<PostProps> = async ({ searchParams: { page, perPage = DEFAULT_ITEM_PER_PAGE, category } }) => {
  const categories = await categoryService.getCategoriesByParent('Post')
  const ids = categories.map((x) => x._id)

  const { data: posts, total } = await postService.getPostList(ids, page, perPage, category)

  return (
    <>
      {categories && <SubNav categories={categories} />}
      <Container>
        <div className="my-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {!!posts.length
            ? posts.map((post, index) => {
                const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1000).url() : null

                return (
                  <div key={index} className="rounded-[16px] border-1">
                    {imageUrl && (
                      <Image
                        className="w-full h-[200px] rounded-t-[16px] object-contain"
                        src={imageUrl}
                        alt=""
                        width={800}
                        height={800}
                        priority
                      />
                    )}

                    <div className="flex flex-col p-16 gap-4">
                      <div className="italic text-14">
                        {post._createdAt && new Date(post._createdAt).toLocaleDateString()} - {post?.category?.label}
                      </div>

                      <Link href={post.slug}>
                        <h2 className="text-20 dark:text-white font-medium text-black">{post.title}</h2>
                      </Link>

                      <h3 className="text-14">{post.shortDescription}</h3>
                    </div>
                  </div>
                )
              })
            : 'Hiện chưa có bài viết nào.'}
        </div>

        <RouterPagination className="mt-32" total={total} perPage={perPage} />
      </Container>
    </>
  )
}

export default Post
