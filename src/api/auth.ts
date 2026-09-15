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

export interface uploadParams {
  name: string
  file: File
}

export interface uploadData {
  name: string
  url: string
}

export function login(data: LoginParams) {
  return request<LoginData>('/auth/login', 'POST', data)
}

export function register(data: RegisterParams) {
  return request<LoginData>('/auth/register', 'POST', data)
}

export function upload(data: uploadParams) {
  return request<uploadData>('/files/upload', 'POST', data, {
    'Content-Type': 'multipart/form-data'
  })
}