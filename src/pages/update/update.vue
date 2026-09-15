<template>
  <AppPage :title="t('update.title')">
    <view class="update-page">
      <view class="update-page__info">
        <text class="update-page__version">{{ t('update.newVersion') }}{{ version }}</text>
        <text class="update-page__desc">{{ description }}</text>
      </view>

      <view class="update-page__progress">
        <wd-progress :percentage="progress" :status="progressStatus" />
        <text class="update-page__status">{{ statusText }}</text>
      </view>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const version = ref('')
const description = ref('')
const downloadUrl = ref('')
const forceUpdate = ref(false)
const progress = ref(0)
const status = ref<'downloading' | 'success' | 'failed'>('downloading')

const progressStatus = computed(() => {
  if (status.value === 'success') return 'success'
  if (status.value === 'failed') return 'danger'
  return undefined
})

const statusText = computed(() => {
  if (status.value === 'success') return t('update.downloadComplete')
  if (status.value === 'failed') return t('update.downloadFailed')
  return `${t('update.downloading')} ${progress.value}%`
})

onLoad((query) => {
  version.value = query?.version || ''
  description.value = decodeURIComponent(query?.description || '')
  downloadUrl.value = decodeURIComponent(query?.url || '')
  forceUpdate.value = query?.force === 'true'

  startDownload()
})

function startDownload() {
  // #ifdef APP-PLUS
  const task = plus.downloader.createDownload(downloadUrl.value, {
    filename: '_doc/update/app.apk'
  }, (download, statusCode) => {
    if (statusCode === 200) {
      status.value = 'success'
      progress.value = 100
      plus.runtime.install(download.filename!, { force: true }, () => {
        plus.runtime.restart()
      }, () => {
        uni.showToast({ title: t('update.installFailed'), icon: 'none' })
      })
    } else {
      status.value = 'failed'
    }
  })

  task.addEventListener('statechanged', (download) => {
    if (download.downloadedSize && download.totalSize) {
      progress.value = Math.round((download.downloadedSize / download.totalSize) * 100)
    }
  })

  task.start()
  // #endif
}
</script>

<style lang="scss" scoped>
.update-page {
  padding: 40rpx 32rpx;

  &__info {
    margin-bottom: 60rpx;
  }

  &__version {
    display: block;
    font-size: 36rpx;
    font-weight: 600;
    color: var(--wot-text-main);
    margin-bottom: 20rpx;
  }

  &__desc {
    display: block;
    font-size: 28rpx;
    color: var(--wot-text-secondary);
    white-space: pre-wrap;
  }

  &__progress {
    margin-top: 40rpx;
  }

  &__status {
    display: block;
    margin-top: 16rpx;
    font-size: 26rpx;
    color: var(--wot-text-secondary);
    text-align: center;
  }
}
</style>
