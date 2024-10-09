export const revalidate = 60

import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { Post } from '@/types/post'
import { delay } from '@/utils/delay'
import { NextApiRequest } from 'next'
import { NextRequest } from 'next/server'

export const generateRandomPosts = (count: number = 10, titlePrefix: string = ''): Post[] => {
  return Array.from({ length: count }, (): Post => {
    const randomWords = faker.lorem.words(3).split(' ')
    let title: string

    if (titlePrefix) {
      const insertPosition = Math.floor(Math.random() * (randomWords.length + 1))
      randomWords.splice(insertPosition, 0, titlePrefix)
      title = randomWords.join(' ')
    } else {
      title = randomWords.join(' ')
    }

    return {
      _id: uuidv4(),
      title,
      slug: faker.helpers.slugify(title.toLowerCase()),
      shortDescription: faker.lorem.paragraph(),
    }
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  await delay(3000)
  const posts = generateRandomPosts(10, search as string)

  return Response.json({
    data: posts,
  })
}
