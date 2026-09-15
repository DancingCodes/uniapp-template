<template>
  <AppPage :title="t('files.title')">
    <view class="files-page">
      <wd-cell-group border insert>
        <wd-cell :title="t('files.upload')" layout="vertical">
          <template #default>
            <wd-upload v-model:file-list="fileList" accept="image" :action="uploadAction" :limit="1"
              :show-limit-num="false" :upload-method="customUpload" @success="handleUploadSuccess"
              @fail="handleUploadFail" />
          </template>
        </wd-cell>
        <wd-cell :title="t('files.uploadMultiple')" layout="vertical">
          <template #default>
            <wd-upload v-model:file-list="multiFileList" accept="image" :action="uploadAction" :limit="9" multiple
              :upload-method="customUpload" @success="handleUploadSuccess" @fail="handleUploadFail" />
          </template>
        </wd-cell>
      </wd-cell-group>

      <wd-cell-group border insert>
        <wd-cell :title="t('files.download')" is-link @click="handleDownload" />
      </wd-cell-group>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFileItem, UploadSuccessEvent, UploadErrorEvent, UploadMethod } from '@wot-ui/ui/components/wd-upload/types'
import { uploadFile, downloadFile, type UploadData } from '@/api/file'

const { t } = useI18n()
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/files/upload`
const fileList = ref<UploadFileItem[]>([])
const multiFileList = ref<UploadFileItem[]>([])

const customUpload: UploadMethod = (file, formData, options) => {
  uploadFile({
    url: uploadAction,
    filePath: file.url
  }).then((data) => {
    options.onSuccess({ data: JSON.stringify(data) } as UniApp.UploadFileSuccessCallbackResult, file, formData)
  }).catch((error) => {
    options.onError(error, file, formData)
  })
}

function handleUploadSuccess(event: UploadSuccessEvent) {
  console.log('Upload success:', event)
  uni.showToast({ title: t('files.uploaded'), icon: 'success' })
}

function handleUploadFail(_event: UploadErrorEvent) {
  uni.showToast({ title: t('files.uploadFailed'), icon: 'none' })
}

const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/files/download`

function handleDownload() {
  downloadFile(downloadUrl).then((res) => {
    uni.openDocument({
      filePath: res.tempFilePath,
      showMenu: true,
      fail: () => {
        uni.saveFile({
          tempFilePath: res.tempFilePath,
          success: () => uni.showToast({ title: t('files.downloaded'), icon: 'success' }),
          fail: () => uni.showToast({ title: t('files.downloadFailed'), icon: 'none' })
        })
      }
    })
    uni.showToast({ title: t('files.downloaded'), icon: 'success' })
  }).catch(() => {
    uni.showToast({ title: t('files.downloadFailed'), icon: 'none' })
  })
}
</script>