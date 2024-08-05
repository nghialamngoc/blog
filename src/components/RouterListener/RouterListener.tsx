'use client'

import NProgress from 'nprogress'
import { FC, Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const Listener: FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}

export const RouterListener: FC = () => {
  return (
    <Suspense>
      <Listener />
    </Suspense>
  )
}
