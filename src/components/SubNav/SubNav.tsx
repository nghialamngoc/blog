'use client'

import { Category } from '@/types/category'
import { FC, useCallback, useEffect, useRef } from 'react'
import Link from '../../ui/Link'

import styles from './SubNav.module.css'
import { isClient } from '@/utils/common'

export interface SubNavProps {
  categories: Category[]
}

export const SubNav: FC<SubNavProps> = ({ categories }) => {
  const el = useRef<HTMLDivElement>(null)

  const isScrollingUp = useCallback(
    (() => {
      let lastScrollTop = isClient ? window.scrollY || document.documentElement.scrollTop : 0

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

      // 77 (height of Header)
      if (scrollTop > 77 && isUp) {
        el.current?.classList.add(styles.root)
      } else {
        el.current?.classList.remove(styles.root)
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <div className={'hidden md:flex px-16 py-16 lg:px-32 gap-32 bg-grayLight'} ref={el}>
      {categories.map((x, index) => {
        return (
          <Link key={index} href={x.href} className="text-black text-14">
            {x.label}
          </Link>
        )
      })}
    </div>
  )
}
