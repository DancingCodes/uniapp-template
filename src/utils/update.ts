import { i18n } from '@/locales'
import { getVersion } from '@/api/app'
import { downloadFile } from '@/api/file'

function t(key: string) {
  return i18n.global.t(key)
}

function compareVersion(v1: string, v2: string): number {
  const a = v1.split('.').map(Number)
  const b = v2.split('.').map(Number)
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    const n1 = a[i] || 0
    const n2 = b[i] || 0
    if (n1 > n2) return 1
    if (n1 < n2) return -1
  }
  return 0
}

export function checkUpdate() {
  // #ifdef MP
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: t('update.title'),
          content: t('update.mpReady'),
          showCancel: false,
          success: () => updateManager.applyUpdate()
        })
      })
      updateManager.onUpdateFailed(() => {
        uni.showToast({ title: t('update.failed'), icon: 'none' })
      })
    }
  })
  // #endif

  // #ifdef APP-PLUS
  getVersion().then((data) => {
    const currentVersion = plus.runtime.version || '0.0.0'
    if (compareVersion(data.version, currentVersion) <= 0) return

    const content = data.description
      ? `${t('update.newVersion')}${data.version}\n\n${data.description}`
      : `${t('update.newVersion')}${data.version}`

    uni.showModal({
      title: t('update.title'),
      content,
      showCancel: !data.forceUpdate,
      confirmText: t('update.confirm'),
      cancelText: t('update.cancel'),
      success: (res) => {
        if (res.confirm) {
          uni.showLoading({ title: t('update.downloading'), mask: true })
          downloadFile(data.downloadUrl).then((filePath) => {
            uni.hideLoading()
            plus.runtime.install(filePath, { force: true }, () => {
              plus.runtime.restart()
            }, () => {
              uni.showToast({ title: t('update.installFailed'), icon: 'none' })
            })
          }).catch(() => {
            uni.hideLoading()
            uni.showToast({ title: t('update.downloadFailed'), icon: 'none' })
          })
        }
      }
    })
  })
  // #endif
}
