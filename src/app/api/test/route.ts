import { categoryService } from '@/sanity/services'

export const revalidate = 60

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET(request: Request) {
  await delay(3000)

  return Response.json({
    test: 40,
  })
}
