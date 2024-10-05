import { forwardRef, HTMLProps } from 'react'
import { useDialogContext } from './DialogContext'
import clsx from 'clsx'

export const DialogBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function DialogBody(props, ref) {
  const { children, className, ...rest } = props
  const { size } = useDialogContext()

  return (
    <div
      ref={ref}
      data-testid="DialogBody"
      className={clsx(
        'py-8 pr-8 pl-16 mr-8 overflow-auto',
        'md:pl-24 md:pr-12 md:mr-12',
        'lg:pl-32 lg:pr-16 lg:mr-16',
        {
          'pl-24 pr-12 mr-12': size === 'sm',
          'lg:pl-48 lg:pr-32 lg:mr-16': size === 'lg',
          'px-0 py-0 mx-0 my-0': size === 'full',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
