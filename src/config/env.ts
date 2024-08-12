export const isLocal = process.env.NODE_ENV === 'development'
export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? 'development'
