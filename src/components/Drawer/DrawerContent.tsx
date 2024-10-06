import { HTMLProps, forwardRef } from 'react'
import { useDrawerContext } from './DrawerContext'
import clsx from 'clsx'

export const DrawerContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function DrawerContent(props, ref) {
  const { className, children, ...rest } = props
  const { isOpen } = useDrawerContext()

  return (
    <div
      ref={ref}
      className={clsx(
        'fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
