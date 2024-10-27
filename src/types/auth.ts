import { User } from './user'

export interface AuthResponse {
  user: User
  accessToken: string
}

export enum LoginType {
  email = 'email',
  google = 'google',
}
