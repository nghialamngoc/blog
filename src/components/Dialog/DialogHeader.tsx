import { HTMLAttributes, forwardRef } from 'react'
import { useDialogContext } from './DialogContext'
import clsx from 'clsx'

export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(function DialogHeader(props, ref) {
  const { className, children, ...rest } = props
  const { size } = useDialogContext()

  return (
    <header
      ref={ref}
      className={clsx(
        'px-16 px-md-24 px-lg-32',
        {
          'px-lg-48': size === 'lg',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </header>
  )
})
