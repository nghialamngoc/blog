import { createContext } from '@/utils/context'
import { useDrawer } from './use-drawer'

export const [DrawerProvider, useDrawerContext] = createContext<ReturnType<typeof useDrawer>>({
  name: 'DrawerContext',
})
