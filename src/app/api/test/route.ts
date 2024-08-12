import { categoryService } from '@/sanity/services'

export const revalidate = 60

export async function GET(request: Request) {
  // const res = await categoryService.getHomeCategories()

  return Response.json({
    test: 40,
  })
}
