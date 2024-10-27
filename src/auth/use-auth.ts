import { API_LOGIN_PATH, API_LOGOUT_PATH, API_USER_ME_PATH } from '@/config/constants'
import axiosInstance from '@/lib/axios'
import { AuthResponse, LoginType } from '@/types/auth'
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
        setIsLoading(true)
        const { data } = await axiosInstance.get(API_USER_ME_PATH)
        setUser(data)
      } catch (err) {
        error('initAuth error: ', err)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const logout = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.get(API_LOGOUT_PATH)
    } catch (err) {
      error('initAuth error: ', err)
    } finally {
      setUser(null)
      setIsLoading(false)
    }
  }

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post(API_LOGIN_PATH, {
        email,
        password,
        type: LoginType.email,
      })

      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  const loginWithGoogle = async (googleToken: string) => {
    try {
      const { data }: any = await axiosInstance.post(API_LOGIN_PATH, {
        type: LoginType.google,
        token: googleToken,
      })

      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    isLoading,
    logout,
    setUser,
    loginWithGoogle,
    loginWithEmail,
  }
}
