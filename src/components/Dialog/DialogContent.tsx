import { forwardRef, HTMLProps } from 'react'
import { useDialogContext } from './DialogContext'
import clsx from 'clsx'

import styles from './DialogContent.module.css'

export const DialogContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function DialogContent(props, ref) {
  const { children, className, ...rest } = props
  const { size, isTransparent } = useDialogContext()

  return (
    <div
      ref={ref}
      data-testid="DialogContent"
      className={clsx(
        styles.content,
        'flex flex-col gap-12 relative w-full bg-white',
        'py-16 mx-16 rounded-[16px]',
        'md:py-24 md:gap-16',
        'lg:py-32',
        {
          [styles.sm]: size === 'sm',
          [styles.md]: [undefined, 'md'].includes(size),
          [styles.lg]: size === 'lg',
          [styles.xl]: size === 'xl',
          [styles.full]: size === 'full',
          [styles.transparent]: isTransparent,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
