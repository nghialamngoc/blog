import { FC, PropsWithChildren } from 'react'

import { AuthProvider } from './AuthContext'
import { UseAuthProps, useAuth } from './use-auth'

export type AuthProps = PropsWithChildren<UseAuthProps>

export const Auth: FC<AuthProps> = (props) => {
  const { children, ...rest } = props

  const context = useAuth(rest)

  return <AuthProvider value={context}>{children}</AuthProvider>
}
