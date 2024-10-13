import dynamic from 'next/dynamic'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

const ButtonV1 = dynamic(() => import('./ButtonV1'))

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  onClick?: () => void
  design?: 'v1' | 'v2'
}

export const Button: FC<ButtonProps> = ({ design, ...rest }) => {
  switch (design) {
    case 'v1':
      return <ButtonV1 {...rest} />

    default:
      return <ButtonV1 {...rest} />
  }

  return null
}

Button.displayName = 'Button'
