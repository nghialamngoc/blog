import { HTMLAttributes, forwardRef } from 'react'
import { useDrawerContext } from './DrawerContext'
import { XIcon } from 'lucide-react'
import clsx from 'clsx'

export const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(function DrawerHeader(props, ref) {
  const { className, children, ...rest } = props
  const { setOpen } = useDrawerContext()

  return (
    <div ref={ref} className={clsx('flex items-center p-16 justify-between border-b-1', className)} {...rest}>
      {children}
      <button onClick={() => setOpen(false)}>
        <XIcon className="w-30 h-30" color="grey" />
      </button>
    </div>
  )
})
