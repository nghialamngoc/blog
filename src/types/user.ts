export interface User {
  id: string
  email: string
  userName: string
  role?: 'admin' | 'user'
  avatar?: string
}
