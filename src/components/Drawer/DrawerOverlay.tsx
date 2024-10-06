import { HTMLProps, forwardRef } from 'react'
import { useDrawerContext } from './DrawerContext'
import clsx from 'clsx'

export const DrawerOverlay = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function DrawerOverlay(props, ref) {
  const { className, ...rest } = props
  const { isOpen, setOpen } = useDrawerContext()

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={ref}
      className={clsx('fixed inset-0 bg-[#00000066] z-40', className)}
      onClick={() => setOpen(false)}
      {...rest}
    />
  )
})
