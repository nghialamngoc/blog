import { FC, HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Container: FC<HTMLProps<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('max-w-[1220px] mx-auto p-[16px]', className)} {...props}>
      {children}
    </div>
  )
}
