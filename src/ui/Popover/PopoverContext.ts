import { createContext } from '@/utils/context'
import { usePopover } from './use-popover'

export const [PopoverProvider, usePopoverContext] = createContext<ReturnType<typeof usePopover>>({
  name: 'PopoverContext',
})
