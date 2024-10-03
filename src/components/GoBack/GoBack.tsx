'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const GoBack = ({ className, href }: { className?: string; href?: string }) => {
  const router = useRouter()

  return (
    <ArrowLeft
      className={twMerge('cursor-pointer', className)}
      onClick={() => (href ? router.push(href) : router.back())}
    />
  )
}
