'use client'

import { isModifiedEvent } from '@/utils/url'
import { addBasePath } from 'next/dist/client/add-base-path'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

function shouldTriggerStartEvent(href: string, clickEvent?: React.MouseEvent) {
  const current = window.location
  const target = new URL(addBasePath(href), location.href)

  if (clickEvent && isModifiedEvent(clickEvent)) {
    return false // modified events: fallback to browser behaviour
  }
  if (current.origin !== target.origin) {
    return false // external URL
  }
  if (current.pathname === target.pathname && current.search === target.search) {
    return false // same URL
  }

  return true
}

NProgress.configure({
  showSpinner: false,
})

export type LinkProps = ComponentProps<typeof NextLink> & {
  activeClassName?: string
  exact?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch = false, className, exact, onClick, ...props },
  forwardedRef,
) {
  const path = usePathname()

  const isActive = exact ? path === href?.toString() : path.startsWith(href?.toString())

  return (
    <NextLink
      ref={forwardedRef}
      href={href}
      prefetch={prefetch}
      className={twMerge('text-gray hover:text-black', isActive ? 'text-black font-medium' : null, className)}
      onClick={(e) => {
        if (shouldTriggerStartEvent(href.toString(), e)) NProgress.start()
        if (onClick) onClick(e)
      }}
      {...props}
    />
  )
})
