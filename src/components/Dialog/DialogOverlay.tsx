import { HTMLProps, forwardRef } from 'react'
import { useDialogContext } from './DialogContext'
import styles from './DialogOverlay.module.css'
import clsx from 'clsx'

export const DialogOverlay = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function DialogOverlay(props, ref) {
  const { className, ...rest } = props
  const { onOverlayClick } = useDialogContext()

  return <div ref={ref} className={clsx(styles.overlay, className)} {...rest} onClick={onOverlayClick} />
})
