import { i18n } from '@/locales'
import { getVersion } from '@/api/app'

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
	  // const currentVersion = plus.runtime.version || '0.0.0'
    const currentVersion = '0.0.0'
    if (compareVersion(data.version, currentVersion) <= 0) return

    const content = data.description
      ? `${t('update.newVersion')}${data.version}\n\n${data.description}`
      : `${t('update.newVersion')}${data.version}`

    function startDownload() {
      uni.showToast({ title: t('update.backgroundDownload'), icon: 'none' })

      const notification = plus.push.createMessage(
        `${t('update.downloading')} 0%`,
        'update_progress',
        { cover: true, when: new Date() }
      )

      const task = plus.downloader.createDownload(data.downloadUrl, {
        filename: '_doc/update/app.apk'
      }, (download, status) => {
        if (status === 200) {
          plus.push.createMessage(
            t('update.downloadComplete'),
            'update_complete',
            { cover: true, when: new Date() }
          )
          plus.runtime.install(download.filename!, { force: true }, () => {
            plus.runtime.restart()
          }, () => {
            uni.showToast({ title: t('update.installFailed'), icon: 'none' })
          })
        } else {
          plus.push.createMessage(
            t('update.downloadFailed'),
            'update_failed',
            { cover: true, when: new Date() }
          )
        }
      })

      task.addEventListener('statechanged', (download) => {
        if (download.downloadedSize && download.totalSize) {
          const progress = Math.round((download.downloadedSize / download.totalSize) * 100)
          plus.push.createMessage(
            `${t('update.downloading')} ${progress}%`,
            'update_progress',
            { cover: true, when: new Date() }
          )
        }
      })

      task.start()
    }

    uni.showModal({
      title: t('update.title'),
      content,
      showCancel: !data.forceUpdate,
      confirmText: t('update.confirm'),
      cancelText: t('update.cancel'),
      success: (res) => {
        if (res.confirm) startDownload()
      }
    })

    if (data.forceUpdate) startDownload()
  })
  // #endif
}
