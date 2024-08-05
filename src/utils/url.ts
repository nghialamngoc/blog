import queryString from 'query-string'
import { compile } from 'path-to-regexp'

export const isAbsoluteUrl = (url: string) => new RegExp('^(?:[a-z+]+:)?//', 'i').test(url)

// https://github.com/vercel/next.js/blob/400ccf7b1c802c94127d8d8e0d5e9bdf9aab270c/packages/next/src/client/link.tsx#L169
export const isModifiedEvent = (event: React.MouseEvent) => {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement
  const target = eventTarget.getAttribute('target')
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.button === 1)
  )
}

export const combineURLs = (baseURL: string, relativeURL: string) => {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export const toPath = (
  pathname: string,
  options?: {
    params?: object
    query?: object
    hash?: string
    baseUrl?: string | true
  },
) => {
  const { params, query, baseUrl } = options ?? {}

  const basePath = typeof baseUrl === 'string' ? baseUrl : process.env.BASE_URL!
  const search = query && Object.keys(query).length > 0 ? '?' + queryString.stringify(query) : ''
  const hash = options?.hash?.startsWith('#')
    ? options.hash
    : options?.hash
      ? '#' + options?.hash
      : ''

  try {
    const toUrl = compile(pathname, {
      validate: false,
    })

    const relativeURL = toUrl(params) + search + hash
    return baseUrl ? combineURLs(basePath, relativeURL) : relativeURL
  } catch (error) {
    const relativeURL = pathname + search + hash
    return baseUrl ? combineURLs(basePath, relativeURL) : relativeURL
  }
}
