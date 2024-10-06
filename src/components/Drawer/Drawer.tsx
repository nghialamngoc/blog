import { FC, PropsWithChildren } from 'react'
import { DrawerProvider } from './DrawerContext'
import { UserDrawerProps, useDrawer } from './use-drawer'

export type DrawerProps = PropsWithChildren<UserDrawerProps>

export const Drawer: FC<DrawerProps> = (props) => {
  const { children, ...rest } = props

  const context = useDrawer(rest)

  return <DrawerProvider value={context}>{children}</DrawerProvider>
}
