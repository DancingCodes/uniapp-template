import { request } from '@/utils/request'
import type { UserInfo } from '@/stores/user'

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  password: string
}

export interface LoginData {
  token: string
  user?: UserInfo
}

export function login(data: LoginParams) {
  return request<LoginData>('/auth/login', 'POST', data)
}

export function register(data: RegisterParams) {
  return request<LoginData>('/auth/register', 'POST', data)
}

export function getUserInfo() {
  return request<UserInfo>('/auth/me', 'GET')
}
