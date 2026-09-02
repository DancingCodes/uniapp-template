<template>
  <AppPage show-tabbar>
    <wd-cell-group border>
      <wd-cell :title="t('settings.darkMode')" :label="t('settings.darkModeDescription')" center>
        <template #default>
          <wd-switch v-model="isDark" size="36rpx" />
        </template>
      </wd-cell>
      <wd-cell :title="t('settings.language')" :value="currentLocaleLabel" is-link @click="openLanguagePicker" />
      <wd-cell :title="t('settings.style')" :value="currentStyleLabel" is-link @click="openStylePicker" />
    </wd-cell-group>
      <wd-select-picker ref="languagePicker" v-model="selectedLocale" type="radio" :columns="localeOptions"
        :title="t('settings.languageDialogTitle')" @confirm="handleLocaleConfirm" />
      <wd-select-picker ref="stylePicker" v-model="selectedStyle" type="radio" :columns="styleOptions"
        :title="t('settings.styleDialogTitle')" @confirm="handleStyleConfirm" />
  </AppPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/locales'
import { setLocale } from '@/locales'
import { useThemeStore, type AppStyle } from '@/stores/theme'

const { t, locale } = useI18n()
const themeStore = useThemeStore()
const { isDark, style } = storeToRefs(themeStore)

const localeOptions = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' }
]
const selectedLocale = ref<AppLocale>(locale.value as AppLocale)
const currentLocaleLabel = computed(() => localeOptions.find((item) => item.value === selectedLocale.value)?.label)
const languagePicker = ref<{ open: () => void }>()
const selectedStyle = ref<AppStyle>(style.value)
const stylePicker = ref<{ open: () => void }>()
const styleOptions = computed(() => [
  { value: 'ios', label: t('settings.iosStyle') },
  { value: 'soft', label: t('settings.softStyle') }
])
const currentStyleLabel = computed(() => styleOptions.value.find((item) => item.value === selectedStyle.value)?.label)

function openLanguagePicker() {
  languagePicker.value?.open()
}

function openStylePicker() {
  stylePicker.value?.open()
}

function handleLocaleConfirm(event: { value: string | number | boolean | (string | number | boolean)[] }) {
  if (typeof event.value !== 'string' || (event.value !== 'zh-CN' && event.value !== 'en-US')) return

  selectedLocale.value = event.value
  setLocale(event.value)
}

function handleStyleConfirm(event: { value: string | number | boolean | (string | number | boolean)[] }) {
  if (event.value !== 'ios' && event.value !== 'soft') return

  selectedStyle.value = event.value
  themeStore.setStyle(event.value)
}
</script>
