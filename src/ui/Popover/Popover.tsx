import { useFloatingParentNodeId, FloatingTree } from '@floating-ui/react'
import { FC, PropsWithChildren } from 'react'
import { PopoverProvider } from './PopoverContext'
import { UsePopoverProps, usePopover } from './use-popover'

export const Popover: FC<PropsWithChildren<UsePopoverProps>> = (props) => {
  const { children, ...rest } = props
  const popover = usePopover(rest)

  const parentId = useFloatingParentNodeId()

  return (
    <PopoverProvider value={popover}>
      {parentId === null ? <FloatingTree>{children}</FloatingTree> : children}
    </PopoverProvider>
  )
}

export default Popover
