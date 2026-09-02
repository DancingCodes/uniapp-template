import { useUserStore } from '@/stores/user'
import { mockRequest } from '@/mock'

const TOKEN_KEY = 'auth-token'

const baseURL = import.meta.env.VITE_API_BASE_URL
const requestMode = import.meta.env.VITE_API_MODE
const useMock = requestMode === 'mock'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type RequestData = UniNamespace.RequestOptions['data']

export interface ApiResponse<T> {
  code: number
  data: T
  message?: string
}

export function request<T>(url: string, method: Method, data?: RequestData) {
  if (useMock) {
    const token = uni.getStorageSync(TOKEN_KEY)

    return mockRequest<T>(url, method, data, token).then((result) => {
      console.info(`[mock] ${method} ${url}`, {
        request: data,
        response: result
      })

      if (result.code === 200) return result.data

      if (result.code === 401) {
        useUserStore().clearAuth()
        uni.reLaunch({ url: '/pages/login/login' })
      }

      uni.showToast({
        title: result.message,
        icon: 'none'
      })
      return Promise.reject(result)
    })
  }

  return new Promise<T>((resolve, reject) => {
    const token = uni.getStorageSync(TOKEN_KEY)

    uni.request({
      url: `${baseURL}${url}`,
      method,
      data,
      header: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      success: (response) => {
        const result = response.data as ApiResponse<T>
        if (result.code === 200) {
          resolve(result.data)
        } else {
          if (result.code === 401) {
            useUserStore().clearAuth()
            uni.reLaunch({ url: '/pages/login/login' })
          }

          uni.showToast({
            title: result.message,
            icon: 'none'
          })
          reject(response)
        }
      },
      fail: reject
    })
  })
}
