'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'
import clsx from 'clsx'
import { MenuIcon, XIcon } from 'lucide-react'

interface DrawerContextType {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
})

interface DrawerProps {
  children: ReactNode
}

const Drawer: React.FC<DrawerProps> & {
  Overlay: React.FC<OverlayProps>
  Content: React.FC<ContentProps>
  Trigger: React.FC<TriggerProps>
  ContentHeader: React.FC<ContentHeaderProps>
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</DrawerContext.Provider>
}

interface OverlayProps {
  className?: string
}

const Overlay: React.FC<OverlayProps> = ({ className }) => {
  const { isOpen, onClose } = useContext(DrawerContext)

  if (!isOpen) return null

  return <div className={clsx('fixed inset-0 bg-[#00000066] z-40', className)} onClick={onClose} />
}

interface ContentProps {
  className?: string
  children?: ReactNode
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  const { isOpen } = useContext(DrawerContext)

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface ContentHeaderProps {
  className?: string
  children?: ReactNode
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ className, children }) => {
  const { onClose } = useContext(DrawerContext)

  return (
    <div className={clsx('flex items-center p-16 justify-between border-b-1', className)}>
      {children}
      <button onClick={onClose}>
        <XIcon className="w-30 h-30" color="grey" />
      </button>
    </div>
  )
}

interface TriggerProps {
  className?: string
}

const Trigger: React.FC<TriggerProps> = ({ className }) => {
  const { onOpen } = useContext(DrawerContext)

  return <MenuIcon className={clsx('w-28 h-28 shrink-0 cursor-pointer', className)} onClick={onOpen} />
}

Drawer.Overlay = Overlay
Drawer.Content = Content
Drawer.Trigger = Trigger
Drawer.ContentHeader = ContentHeader

export default Drawer
