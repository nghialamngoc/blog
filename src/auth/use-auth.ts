import { User } from '@/types/user'
import { useState } from 'react'

export interface UseAuthProps {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = (props: UseAuthProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  return {
    ...props,
  }
}
