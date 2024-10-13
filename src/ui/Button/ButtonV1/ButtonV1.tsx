import { FC } from 'react'
import { ButtonProps } from '../Button'
import clsx from 'clsx'

export const ButtonV1: FC<ButtonProps> = ({ children, className, onClick, ...rest }) => {
  return (
    <button
      className={clsx('text-14 font-medium hover:bg-grayLight px-12 py-6 rounded-lg shadow-md', className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
