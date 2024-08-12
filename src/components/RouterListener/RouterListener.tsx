'use client'

import { FC, Suspense, useEffect } from 'react'
import NProgress from 'nprogress'
import { usePathname, useSearchParams } from 'next/navigation'
import { BUILD_ID, isLocal } from '@/config/env'
import { info } from '@/utils/safety-log'

const Listener: FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()

    if (!isLocal && BUILD_ID) {
      const date = new Date(/^\d+$/.test(BUILD_ID) ? parseInt(BUILD_ID) : BUILD_ID)
      info('✅ ✅ ✅ BUILD ID: ', date.toLocaleDateString() + ' ' + date.toLocaleTimeString())
    }
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
