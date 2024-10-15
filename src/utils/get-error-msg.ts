import { AxiosError } from 'axios'

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Kiểm tra nếu có response từ server
    if (error.response) {
      // Kiểm tra các vị trí phổ biến cho thông báo lỗi
      const data = error.response.data
      if (typeof data === 'string') return data
      if (data.message) return data.message
      if (data.error) return data.error
      if (data.errors && Array.isArray(data.errors)) return data.errors.join(', ')

      // Nếu không tìm thấy thông báo cụ thể, trả về status text
      return `Error ${error.response.status}: ${error.response.statusText}`
    }

    // Kiểm tra nếu lỗi xảy ra trong quá trình gửi request
    if (error.request) {
      return 'No response received from the server. Please check your internet connection.'
    }

    // Nếu là lỗi khác
    return error.message || 'An unexpected error occurred'
  }

  // Nếu không phải AxiosError
  if (error instanceof Error) {
    return error.message
  }

  // Nếu error không phải là một instance của Error
  return String(error)
}
