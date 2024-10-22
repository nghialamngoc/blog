import { useMergeRefs } from '@floating-ui/react'
import { HTMLProps, ReactNode, forwardRef, isValidElement, cloneElement } from 'react'
import { usePopoverContext } from './PopoverContext'

export interface PopoverTriggerProps extends HTMLProps<HTMLElement> {
  children?: ReactNode
  asChild?: boolean
}

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, asChild = false, ...props },
  propRef,
) {
  const context = usePopoverContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-open': context.open,
      }),
    )
  }

  return (
    <button ref={ref} type="button" data-open={context.open} {...context.getReferenceProps(props)}>
      {children}
    </button>
  )
})

export default PopoverTrigger
