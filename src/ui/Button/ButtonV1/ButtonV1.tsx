import clsx from 'clsx'
import { forwardRef } from 'react'
import { ButtonProps } from '../Button'
import styles from './ButtonV1.module.css'

export const ButtonV1 = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading, onClick, ...rest }, ref) => {
    const styleProps = {
      className: clsx(styles.root, 'hover:bg-grayLight shadow-md', className),
      'data-loading': isLoading,
    }
    return (
      <button ref={ref} {...styleProps} onClick={onClick} {...rest}>
        <span>{children}</span>
      </button>
    )
  },
)
