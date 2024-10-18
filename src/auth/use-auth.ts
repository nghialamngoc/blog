import { API_USER_ME_PATH } from '@/config/constants'
import axiosInstance from '@/lib/axios'
import { User } from '@/types/user'
import { error } from '@/utils/safety-log'
import { useEffect, useState } from 'react'

export interface UseAuthProps {}

export const useAuth = (props: UseAuthProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData: User = await axiosInstance.get(API_USER_ME_PATH)
        setUser(userData)
      } catch (err) {
        error('initAuth error: ', err)
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const logout = () => {
    // call api logout
    setUser(null)
  }

  return {
    user,
    isLoading,
    logout,
    setUser,
  }
}
