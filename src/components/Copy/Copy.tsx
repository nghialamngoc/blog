'use client'

import { CopyIcon } from 'lucide-react'

export const Copy = ({ data }: { data: string }) => {
  return (
    <CopyIcon
      width={20}
      height={20}
      className="cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(data)
      }}
    />
  )
}
