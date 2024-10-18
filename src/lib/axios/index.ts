import { API_LOGIN_PATH, API_REFRESH_TOKEN_PATH } from '@/config/constants'
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: SERVER_BASE_URL,
  withCredentials: true, // Để gửi cookies với mỗi request
})

// Interface for the refresh token response
interface RefreshTokenResponse {
  accessToken: string
}

// Type for the refresh subscriber callback
type RefreshSubscriber = () => void

// Array to store pending requests
let refreshSubscribers: RefreshSubscriber[] = []

// Function to add callbacks to the queue
const addRefreshSubscriber = (callback: RefreshSubscriber): void => {
  refreshSubscribers.push(callback)
}

// Function to call all callbacks in the queue
const onRefreshed = (): void => {
  refreshSubscribers.forEach((callback) => callback())
  refreshSubscribers = []
}

let isRefreshing: boolean = false

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config
  },
  (error: any) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const accessToken = response?.data?.accessToken
    if (response.config.url === API_LOGIN_PATH && accessToken) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return response
  },
  async (error: any) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve) => {
          addRefreshSubscriber(() => {
            resolve(axiosInstance(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // refreshToken đã được tự động gửi trong cookie
        const response = await axiosInstance.post<RefreshTokenResponse>(API_REFRESH_TOKEN_PATH)
        const { accessToken } = response.data
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
        onRefreshed()
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Handle refresh token failure (e.g., log out the user)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
