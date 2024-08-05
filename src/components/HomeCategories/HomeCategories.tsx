'use client'

import { FC } from 'react'
import { Category } from '@/types/category'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from '@/components/Link'
import clsx from 'clsx'

interface HomeCategoriesProps {
  categories: Category[]
  className?: string
}

export const HomeCategories: FC<HomeCategoriesProps> = ({ categories, className }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const categoryParam = searchParams.get('category')

  return (
    <div className={className}>
      {categories && (
        <div className="flex gap-16">
          {categories.map((category, index) => {
            const search = new URLSearchParams(searchParams.toString())
            search.set('category', category.value)

            return (
              <Link
                href={pathname + '?' + search.toString()}
                key={index}
                className={clsx(
                  'flex items-center justify-center min-w-[38px] h-[38px] rounded-[8px] border p-16',
                  'hover:bg-accent dark:hover:text-white ',
                  {
                    'bg-accent dark:text-white font-medium pointer-events-none':
                      categoryParam === category.value,
                  },
                )}
              >
                {category.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
