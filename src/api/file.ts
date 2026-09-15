import { useUserStore } from '@/stores/user'
import { i18n } from '@/locales'

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
  return new Promise<string>((resolve, reject) => {
    const token = uni.getStorageSync('auth-token')

    uni.downloadFile({
      url,
      header: {
        'Accept-Language': i18n.global.locale.value,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // #ifdef H5
          const a = document.createElement('a')
          a.href = res.tempFilePath
          a.download = res.tempFilePath.split('/').pop() || 'download'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          resolve(res.tempFilePath)
          // #endif
          // #ifdef MP
          uni.openDocument({
            filePath: res.tempFilePath,
            showMenu: true,
            success: () => resolve(res.tempFilePath),
            fail: () => reject(new Error('openDocument failed'))
          })
          // #endif
          // #ifdef APP-PLUS
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: (saved) => {
              uni.openDocument({ filePath: saved.savedFilePath, showMenu: true })
              resolve(saved.savedFilePath)
            },
            fail: () => reject(new Error('saveFile failed'))
          })
          // #endif
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
        'Accept-Language': i18n.global.locale.value,
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
