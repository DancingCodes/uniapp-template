<template>
  <AppPage :title="t('files.title')">
    <view class="files-page">
      <wd-cell-group border insert>
        <wd-cell :title="t('files.upload')">
          <template #default>
            <wd-upload v-model:file-list="fileList" accept="all" :action="uploadAction" :limit="1"
              :show-limit-num="false" :upload-method="customUpload" :success-status="[200]"
              @success="handleUploadSuccess" @fail="handleUploadFail" />
          </template>
        </wd-cell>
        <wd-cell v-if="uploadedFile" :title="t('files.uploaded')" :value="uploadedFile.name" />
      </wd-cell-group>

    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFileItem, UploadSuccessEvent, UploadErrorEvent, UploadMethod } from '@wot-ui/ui/components/wd-upload/types'
import { upload, type uploadData } from '@/api/auth'
import type { ApiResponse } from '@/utils/request'

const { t } = useI18n()
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/files/upload`
const fileList = ref<UploadFileItem[]>([])
const uploadedFile = ref<{ name: string; url: string } | null>(null)

const customUpload: UploadMethod = (file, formData, options) => {
  upload({
    name: options.name,
    file: file.file
  }).then((response) => {
    options.onSuccess(response, file, formData)
  }).catch((error) => {
    options.onError(error, file, formData)
  })
}

function handleUploadSuccess(event: UploadSuccessEvent) {
  const response = event.file.response as ApiResponse<uploadData>
  uploadedFile.value = response.data
  uni.showToast({ title: t('files.uploaded'), icon: 'success' })
}

function handleUploadFail(_event: UploadErrorEvent) {
  uni.showToast({ title: t('files.uploadFailed'), icon: 'none' })
}

</script>

<style lang="scss" scoped></style>
