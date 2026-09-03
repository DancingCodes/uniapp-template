export function downloadFile(url: string) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank')
    return Promise.resolve(url)
  }

  return new Promise<string>((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (result) => {
        if (result.statusCode < 200 || result.statusCode >= 300) {
          reject(new Error(`Download failed with status ${result.statusCode}`))
          return
        }

        uni.openDocument({
          filePath: result.tempFilePath,
          showMenu: true,
          success: () => resolve(result.tempFilePath),
          fail: reject
        })
      },
      fail: reject
    })
  })
}
