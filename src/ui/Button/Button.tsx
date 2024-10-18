import dynamic from 'next/dynamic'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

const ButtonV1 = dynamic(() => import('./ButtonV1'), {
  loading: () => null,
  ssr: false,
})

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  onClick?: () => void
  design?: 'v1' | 'v2'
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({ design, ...rest }) => {
  let El = ButtonV1

  switch (design) {
    case 'v1':
      El = ButtonV1
  }

  return <El {...rest} />
}

Button.displayName = 'Button'
