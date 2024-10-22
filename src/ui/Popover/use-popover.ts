import { useControllableState } from '@/hooks/use-controllable-state'
import { useEventListener } from '@/hooks/use-event-listener'
import {
  Placement,
  arrow as arrowMiddleware,
  autoUpdate,
  flip as flipMiddleware,
  offset as offsetMiddleware,
  safePolygon,
  shift as shiftMiddleware,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react'
import { useMemo, useRef } from 'react'

export interface UsePopoverProps {
  defaultOpen?: boolean
  placement?: Placement
  trigger?: 'hover' | 'click'
  arrow?: boolean
  offset?: Parameters<typeof offsetMiddleware>[0]
  flip?: boolean | Parameters<typeof flipMiddleware>[0]
  shift?: boolean | Parameters<typeof shiftMiddleware>[0]
  maxWidth?: number | string
  matchWidth?: boolean
  closeOnClick?: boolean
  focusOnOpen?: boolean
  isDisabled?: boolean
  isOpen?: boolean
  onChange?: (isOpen: boolean) => void
}

export const usePopover = (props: UsePopoverProps) => {
  const {
    defaultOpen = false,
    placement = 'bottom',
    trigger = 'click',
    arrow = true,
    maxWidth,
    matchWidth,
    flip = true,
    offset,
    shift = {
      padding: 5,
    },
    closeOnClick = true,
    focusOnOpen = true,
    isDisabled,
    isOpen,
    onChange,
  } = props

  const [open, setOpen] = useControllableState({ defaultValue: defaultOpen, value: isOpen, onChange })

  const arrowRef = useRef<HTMLDivElement | null>(null)
  // Subscribe this component to the <FloatingTree />
  const nodeId = useFloatingNodeId()

  const middleware = [
    offsetMiddleware(offset ?? (arrow ? 10 : 0)),
    flip
      ? flipMiddleware({
          fallbackAxisSideDirection: 'end',
          crossAxis: shift === false,
        })
      : null,
    shift
      ? shiftMiddleware({
          ...(typeof shift === 'boolean' ? {} : shift),
        })
      : null,
    arrowMiddleware({
      element: arrowRef,
    }),
  ]

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: middleware.filter(Boolean),
    whileElementsMounted: autoUpdate,
    nodeId,
  })

  const context = data.context

  const click = useClick(context, {
    toggle: true,
    enabled: !isDisabled && trigger === 'click',
  })

  const hover = useHover(context, {
    handleClose: safePolygon(),
    enabled: !isDisabled && trigger === 'hover',
  })

  const dismiss = useDismiss(context)

  const role = useRole(context)

  const interactions = useInteractions([click, hover, dismiss, role])

  const transition = useTransitionStyles(context, {
    initial: {
      transform: 'scale(0.8)',
      opacity: 0,
    },
    common: {
      transform: 'scale(1)',
      opacity: 1,
    },
    duration: 100,
  })

  useEventListener('resize', () => {
    setOpen(false)
  })

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      arrowRef,
      arrow,
      closeOnClick,
      focusOnOpen,
      transition,
    }),
    [open, setOpen, interactions, data, arrow, closeOnClick, focusOnOpen, transition],
  )
}
