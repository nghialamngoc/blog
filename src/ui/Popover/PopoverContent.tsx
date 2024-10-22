import { useMergeRefs, FloatingPortal } from '@floating-ui/react'
import { HTMLProps, forwardRef, CSSProperties } from 'react'
import { usePopoverContext } from './PopoverContext'
import styles from './Popover.module.css'
import clsx from 'clsx'

const placementMapping = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

export interface PopoverContentProps extends HTMLProps<HTMLDivElement> {
  arrowStyle?: CSSProperties
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(props, propRef) {
  const { style, className, children, arrowStyle, onClick, ...rest } = props

  const {
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    open,
    refs,
    placement,
    closeOnClick,
    arrow,
    arrowRef,
    strategy,
    x,
    y,
    setOpen,
    getFloatingProps,
    transition,
  } = usePopoverContext()

  const ref = useMergeRefs([refs.setFloating, propRef])

  const arrowPlacement = placementMapping[placement.split('-')[0] as keyof typeof placementMapping]

  const render = () => {
    if (transition.isMounted) {
      return (
        <div
          ref={ref}
          className={clsx(styles.popoverContent, className)}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            ...style,
          }}
          {...getFloatingProps(rest)}
          onClick={(e) => {
            onClick?.(e)
            closeOnClick && setOpen(false)
          }}
        >
          <div style={transition.styles} className={styles.popoverContentTransition}>
            {arrow && (
              <div
                ref={arrowRef}
                style={{
                  left: arrowX !== null ? arrowX + 'px' : '',
                  top: arrowY !== null ? arrowY + 'px' : '',
                  right: '',
                  bottom: '',
                  ...arrowStyle,
                }}
                className={styles.popoverArrow}
                data-placement={arrowPlacement}
              />
            )}
            {children}
          </div>
        </div>
      )
    }
    return null
  }

  return <FloatingPortal>{render()}</FloatingPortal>
})

export default PopoverContent
