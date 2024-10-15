import { createContext } from '@/utils/context'
import { useAuth } from './use-auth'

export const [AuthProvider, useAuthContext] = createContext<ReturnType<typeof useAuth>>({
  name: 'AuthContext',
})
