'use client'

import { idTransform } from '@/utils/string'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

export interface SubmmaryTab {
  className?: string
  data: string[]
}

export const SubmmaryTab: FC<SubmmaryTab> = ({ data, className }) => {
  const [activeIds, setActiveIds] = useState<string[]>([])

  useEffect(() => {
    const scrollEvent = () => {
      const newActiveIds = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const title = item.startsWith('-') || item.startsWith('+') ? item.slice(2) : item
        const id = idTransform(title)
        const el = document.getElementById(id)

        if (el) {
          const rect = el.getBoundingClientRect()
          const clientTop = rect.top

          if (clientTop - 80 <= 0) {
            newActiveIds.push(id)
          }
        }
      }

      setActiveIds(newActiveIds)
    }

    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])

  return (
    <div
      className={clsx('flex text-14 flex-col gap-8 w-[320px] p-16 sticky top-[80px] h-fit border-l-2 ml-16', className)}
    >
      <div className="mb-8 font-medium text-20">On this page</div>
      {data.map((x, index) => {
        const title = x.startsWith('-') || x.startsWith('+') ? x.slice(2) : x
        const id = idTransform(title)
        const isNest = x.startsWith('+')

        return (
          <Link
            className={clsx('w-fit hover:text-link', isNest && 'pl-16', activeIds.includes(id) && 'text-link')}
            href={`#${id}`}
            key={index}
          >
            {title}
          </Link>
        )
      })}
    </div>
  )
}
