import { NextRequest, NextResponse } from 'next/server'
import { i18n } from './config/i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // if (request.nextUrl.pathname.startsWith('/api')) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }// Check if there is any supported locale in the pathname

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio).*)'],
}
