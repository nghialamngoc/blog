'use client'

import Drawer from '@/components/Drawer'

export const HeaderMenuDrawer = () => {
  return (
    <Drawer>
      <Drawer.Trigger />
      <Drawer.Overlay />
      <Drawer.Content />
    </Drawer>
  )
}
