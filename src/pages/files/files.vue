<template>
  <AppPage :title="t('files.title')">
    <view class="files-page">
      <wd-cell-group border insert>
        <wd-cell :title="t('files.upload')">
          <template #default>
            <wd-upload v-model:file-list="fileList" accept="all" :action="uploadAction" :limit="1"
              :show-limit-num="false" :upload-method="customUpload" @success="handleUploadSuccess"
              @fail="handleUploadFail" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFileItem, UploadSuccessEvent, UploadErrorEvent, UploadMethod } from '@wot-ui/ui/components/wd-upload/types'
import { uploadFile, type UploadData } from '@/api/file'

const { t } = useI18n()
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/files/upload`
const fileList = ref<UploadFileItem[]>([])

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
</script>

<style lang="scss" scoped></style>
