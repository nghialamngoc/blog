'use client'

import clsx from 'clsx'
import { FC } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getPages } from './get-pages'
import Link from 'next/link'

const parsePage = (page: string | null) => {
  if (page) {
    const parsed = Number(page)

    if (!isNaN(parsed) && parsed > 0) {
      return parsed
    }
  }
  return 1
}

export interface RouterPaginationProps {
  perPage: number
  total: number
  className?: string
}

export const RouterPagination: FC<RouterPaginationProps> = ({ perPage, total, className }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parsePage(searchParams.get('page'))

  const pages = getPages({
    page,
    total: Math.ceil(total / perPage),
  })

  if (pages.length > 1) {
    return (
      <div className={clsx('flex items-center justify-center gap-8', className)}>
        {pages.map((p, index) => {
          const key = p + '-' + index

          if (p !== 'dots') {
            const search = new URLSearchParams(searchParams.toString())
            search.set('page', p.toString())

            return (
              <Link
                key={key}
                href={pathname + '?' + search.toString()}
                rel={page + 1 === p ? 'next' : page - 1 === p ? 'prev' : undefined}
                className={clsx(
                  'flex items-center justify-center min-w-[38px] h-[38px] rounded-[8px] border',
                  'hover:bg-accent dark:hover:text-white ',
                  'active:bg-accent dark:active:text-white',
                  {
                    'bg-accent dark:text-white pointer-events-none': p === page,
                  },
                )}
              >
                {p}
              </Link>
            )
          }

          return (
            <div key={key} className="px-6">
              ...
            </div>
          )
        })}
      </div>
    )
  }

  return null
}
