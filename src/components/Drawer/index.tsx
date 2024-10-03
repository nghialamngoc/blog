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

  return <div className={clsx('fixed inset-0 bg-black opacity-90 z-40', className)} onClick={onClose} />
}

interface ContentProps {
  className?: string
  children?: ReactNode
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  const { isOpen, onClose } = useContext(DrawerContext)

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 h-full min-w-[360px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      <button className="absolute top-16 right-8 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <XIcon className="w-32 h-32" />
      </button>
      <div className="p-4">{children}</div>
    </div>
  )
}

interface TriggerProps {
  className?: string
}

const Trigger: React.FC<TriggerProps> = ({ className }) => {
  const { onOpen } = useContext(DrawerContext)

  return <MenuIcon className={clsx('w-32 h-32 shrink-0 cursor-pointer', className)} onClick={onOpen} />
}

Drawer.Overlay = Overlay
Drawer.Content = Content
Drawer.Trigger = Trigger

export default Drawer
