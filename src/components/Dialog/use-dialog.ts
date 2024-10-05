import { useEffect } from 'react'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useLockedBody } from '@/hooks/use-locked-body'

export interface UseDialogProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  isCentered?: boolean
  isTransparent?: boolean
  blockScrollOnMount?: boolean
  closeOnOverlayClick?: boolean
  defaultOpen?: boolean
  isOpen?: boolean
  onOpen?: () => void
  onHide?: () => void
  onChange?: (isOpen: boolean) => void
}

export const useDialog = (props: UseDialogProps) => {
  const {
    isOpen: isOpenProp,
    defaultOpen,
    onHide,
    onOpen,
    onChange,
    blockScrollOnMount = true,
    closeOnOverlayClick = true,
    ...rest
  } = props

  const { setLocked } = useLockedBody(blockScrollOnMount)

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: isOpenProp,
    onChange: (value) => {
      onChange?.(value)
      value ? onOpen?.() : onHide?.()
    },
  })

  const onOverlayClick = () => {
    closeOnOverlayClick && setOpen(false)
  }

  useEffect(() => {
    setLocked(isOpen)
  }, [isOpen, setLocked])

  return {
    defaultOpen,
    isOpen,
    setOpen,
    onOverlayClick,
    ...rest,
  }
}
