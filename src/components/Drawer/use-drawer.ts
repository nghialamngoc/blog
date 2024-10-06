import { useControllableState } from '@/hooks/use-controllable-state'

export interface UserDrawerProps {
  defaultOpen?: boolean
  isOpen?: boolean
  onOpen?: () => void
  onHide?: () => void
  onChange?: (isOpen: boolean) => void
}

export const useDrawer = (props: UserDrawerProps) => {
  const { isOpen: isOpenProp, defaultOpen, onHide, onOpen, onChange, ...rest } = props

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: isOpenProp,
    onChange: (value) => {
      onChange?.(value)
      value ? onOpen?.() : onHide?.()
    },
  })

  return {
    defaultOpen,
    isOpen,
    setOpen,
    ...rest,
  }
}
