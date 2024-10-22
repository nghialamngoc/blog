import { SERVER_BASE_URL } from './env'

export const POST_PATH = '/post/'
export const DEFAULT_ITEM_PER_PAGE = 9

// API AUTH
export const API_LOGIN_PATH = SERVER_BASE_URL + '/api/auth/login'
export const API_REGISTER_PATH = SERVER_BASE_URL + '/api/auth/register'
export const API_REFRESH_TOKEN_PATH = SERVER_BASE_URL + '/api/auth/refresh-token'
export const API_LOGOUT_PATH = SERVER_BASE_URL + '/api/auth/logout'

// API USER
export const API_USER_ME_PATH = SERVER_BASE_URL + '/api/user/me'
