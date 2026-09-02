<template>
  <AppPage show-tabbar>
    <wd-cell-group border>
      <wd-cell :title="t('settings.darkMode')" :label="t('settings.darkModeDescription')" center>
        <template #default>
          <wd-switch v-model="isDark" size="36rpx" />
        </template>
      </wd-cell>
      <wd-cell :title="t('settings.language')" :value="currentLocaleLabel" is-link @click="openLanguagePicker" />
    </wd-cell-group>
    <wd-select-picker ref="languagePicker" v-model="selectedLocale" type="radio" :columns="localeOptions"
      :title="t('settings.languageDialogTitle')" @confirm="handleLocaleConfirm" />
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/locales'
import { setLocale } from '@/locales'
import { useThemeStore } from '@/stores/theme'

const { t, locale } = useI18n()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const localeOptions = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' }
]
const selectedLocale = ref<AppLocale>(locale.value as AppLocale)
const currentLocaleLabel = computed(() => localeOptions.find((item) => item.value === selectedLocale.value)?.label)
const languagePicker = ref<{ open: () => void }>()

function openLanguagePicker() {
  languagePicker.value?.open()
}

function handleLocaleConfirm(event: { value: string | number | boolean | (string | number | boolean)[] }) {
  if (typeof event.value !== 'string' || (event.value !== 'zh-CN' && event.value !== 'en-US')) return

  selectedLocale.value = event.value
  setLocale(event.value)
}
</script>
