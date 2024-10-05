import { createContext } from '@/utils/context'
import { useDialog } from './use-dialog'

export const [DialogProvider, useDialogContext] = createContext<ReturnType<typeof useDialog>>({
  name: 'DialogContext',
})
