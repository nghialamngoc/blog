'use client'

import { TopNavigationCategory } from '@/types/category'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { FC } from 'react'
import Link from '../../ui/Link'
import { HeaderLogo } from './HeaderLogo'
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTrigger } from '@/components/Drawer'
import { HeaderUser } from './HeaderUser'

export interface HeaderMenuDrawerProps {
  categories: TopNavigationCategory[]
  className?: string
}

export const HeaderMenuDrawer: FC<HeaderMenuDrawerProps> = ({ className, categories }) => {
  return (
    <div className={clsx('md:hidden', className)}>
      <Drawer>
        <DrawerTrigger />
        <DrawerOverlay />
        <DrawerContent className="w-full max-w-[340px]">
          <DrawerHeader>
            <div className="flex grow justify-between mr-2">
              <HeaderLogo />
              <HeaderUser />
            </div>
          </DrawerHeader>

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
                            className="flex text-14 justify-between items-center text-black"
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
        </DrawerContent>
      </Drawer>
    </div>
  )
}
