export const isLocal = process.env.NODE_ENV === 'development'
export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? 'development'
export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY ?? ''
export const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
