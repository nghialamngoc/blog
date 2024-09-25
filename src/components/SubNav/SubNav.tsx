'use client'

import { Category } from '@/types/category'
import { FC, useCallback, useEffect, useRef } from 'react'
import Link from '../Link'

export interface SubNavProps {
  categories: Category[]
}

export const SubNav: FC<SubNavProps> = ({ categories }) => {
  const el = useRef<HTMLDivElement>(null)

  const isScrollingUp = useCallback(
    (() => {
      let lastScrollTop = window.scrollY || document.documentElement.scrollTop

      return function isScrollingUp() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop
        let isScrollingUp = scrollTop < lastScrollTop
        lastScrollTop = scrollTop
        return isScrollingUp
      }
    })(),
    [],
  )

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      const isUp = isScrollingUp()

      // 77 (height of Header) / 56 (height of subNav)
      if (scrollTop > 77 + 56 && isUp) {
        console.log('hể')

        el.current?.classList.add('sticky')
        el.current?.classList.add('top-0')
      } else {
        el.current?.classList.remove('sticky')
        el.current?.classList.remove('top-0')
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <div className="flex px-32 py-16 gap-32 bg-grayLight" ref={el}>
      {categories.map((x, index) => {
        return (
          <Link key={index} href={x.href} className="text-black">
            {x.label}
          </Link>
        )
      })}
    </div>
  )
}
