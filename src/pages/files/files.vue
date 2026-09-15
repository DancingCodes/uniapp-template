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

    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFileItem, UploadSuccessEvent, UploadErrorEvent } from '@wot-ui/ui/components/wd-upload/types'

const { t } = useI18n()
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/files/upload`
const fileList = ref<UploadFileItem[]>([])
const uploadedFile = ref<{ name: string; url: string } | null>(null)

function handleUploadSuccess(event: UploadSuccessEvent) {
  const response = typeof event.file.response === 'string' ? JSON.parse(event.file.response) : event.file.response
  uploadedFile.value = response?.data || { name: event.file.name || t('files.uploaded'), url: event.file.url }
  uni.showToast({ title: t('files.uploaded'), icon: 'success' })
}

function handleUploadFail(_event: UploadErrorEvent) {
  uni.showToast({ title: t('files.uploadFailed'), icon: 'none' })
}

</script>

<style lang="scss" scoped></style>
