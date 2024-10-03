'use client'

import Drawer from '@/components/Drawer'
import { TopNavigationCategory } from '@/types/category'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { FC } from 'react'
import Link from '../Link'
import { HeaderLogo } from './HeaderLogo'

export interface HeaderMenuDrawerProps {
  categories: TopNavigationCategory[]
  className?: string
}

export const HeaderMenuDrawer: FC<HeaderMenuDrawerProps> = ({ className, categories }) => {
  return (
    <div className={clsx('md:hidden', className)}>
      <Drawer>
        <Drawer.Trigger />
        <Drawer.Overlay />
        <Drawer.Content className="w-[280px]">
          <Drawer.ContentHeader>
            <HeaderLogo />
          </Drawer.ContentHeader>

          <div>
            {categories.map(({ label, href, children }, index) => {
              return (
                <div key={index} className="p-16 border-b-1">
                  <Link className="text-[18px] text-black" href={href}>
                    {label}
                  </Link>

                  {children && (
                    <div className="flex flex-col gap-14 mt-12">
                      {children.map((child, i) => {
                        return (
                          <Link
                            className="flex text-[14px] justify-between items-center text-black"
                            key={`${index}-${i}`}
                            href={child.href}
                          >
                            {child.label}
                            <ArrowRight className="w-16 h-16" />
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}
