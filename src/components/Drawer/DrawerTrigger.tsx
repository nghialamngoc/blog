import clsx from 'clsx'
import { MenuIcon } from 'lucide-react'
import { HTMLAttributes, forwardRef } from 'react'
import { useDrawerContext } from './DrawerContext'

export const DrawerTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(
  function DrawerTrigger(props, ref) {
    const { className, children, ...rest } = props
    const { setOpen } = useDrawerContext()

    return (
      <div ref={ref} className={clsx('flex cursor-pointer', className)} onClick={() => setOpen(true)} {...rest}>
        <MenuIcon className="w-28 h-28 shrink-0" />
      </div>
    )
  },
)
