import { useUserStore } from '@/stores/user'

export interface UploadParams {
  url: string
  filePath: string
  name?: string
}

export interface UploadData {
  name: string
  url: string
}

export function downloadFile(url: string) {
  return new Promise<UniApp.DownloadSuccessData>((resolve, reject) => {
    const token = uni.getStorageSync('auth-token')

    uni.downloadFile({
      url,
      header: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          if (res.statusCode === 401) {
            useUserStore().logout()
          }
          reject(res)
        }
      },
      fail: reject
    })
  })
}

export function uploadFile(params: UploadParams) {
  return new Promise<UploadData>((resolve, reject) => {
    const token = uni.getStorageSync('auth-token')

    uni.uploadFile({
      url: params.url,
      filePath: params.filePath,
      name: params.name || 'file',
      header: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      success: (res) => {
        const result = JSON.parse(res.data)
        if (result.code === 200) {
          resolve(result.data)
        } else {
          if (result.code === 401) {
            useUserStore().logout()
          }
          reject(result)
        }
      },
      fail: reject
    })
  })
}
