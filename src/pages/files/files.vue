<template>
  <AppPage :title="t('files.title')">
    <view class="files-page">
      <wd-cell-group border insert>
        <wd-cell :title="t('files.upload')">
          <template #default>
            <wd-upload v-model:file-list="fileList" accept="all" :action="uploadAction" :limit="1" :show-limit-num="false" @success="handleUploadSuccess" @fail="handleUploadFail" />
          </template>
        </wd-cell>
        <wd-cell v-if="uploadedFile" :title="t('files.uploaded')" :value="uploadedFile.name" />
      </wd-cell-group>

      <view class="files-page__actions">
        <wd-button block plain icon="download" :loading="downloading" @click="handleDownload">
          {{ t('files.download') }}
        </wd-button>
      </view>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { downloadFile } from '@/utils/download'
import type { UploadFileItem, UploadSuccessEvent, UploadErrorEvent } from '@wot-ui/ui/components/wd-upload/types'

const { t } = useI18n()
const sampleDownloadUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/files/upload`
const fileList = ref<UploadFileItem[]>([])
const uploadedFile = ref<{ name: string; url: string } | null>(null)
const downloading = ref(false)

function handleUploadSuccess(event: UploadSuccessEvent) {
  const response = typeof event.file.response === 'string' ? JSON.parse(event.file.response) : event.file.response
  uploadedFile.value = response?.data || { name: event.file.name || t('files.uploaded'), url: event.file.url }
  uni.showToast({ title: t('files.uploaded'), icon: 'success' })
}

function handleUploadFail(_event: UploadErrorEvent) {
  uni.showToast({ title: t('files.uploadFailed'), icon: 'none' })
}

async function handleDownload() {
  downloading.value = true
  const [error] = await to(downloadFile(sampleDownloadUrl))
  downloading.value = false
  if (error) {
    uni.showToast({ title: t('files.downloadFailed'), icon: 'none' })
    return
  }
  uni.showToast({ title: t('files.downloaded'), icon: 'success' })
}

</script>

<style lang="scss" scoped>
.files-page__actions {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 32rpx;
}
</style>
