import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'
import { QueryParams } from 'sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  revalidate = 30,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}
