const baseURL = import.meta.env.VITE_API_BASE_URL

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type RequestData = UniNamespace.RequestOptions['data']

export interface ApiResponse<T> {
  code: number
  data: T
  message?: string
}

export function request<T>(url: string, method: Method, data?: RequestData) {
  return new Promise<ApiResponse<T>>((resolve, reject) => {
    uni.request({
      url: `${baseURL}${url}`,
      method,
      data,
      success: (response) => {
        const result = response.data as ApiResponse<T>
        if (result.code === 200) {
          resolve(result)
        } else {
          reject(response)
        }
      },
      fail: reject
    })
  })
}
