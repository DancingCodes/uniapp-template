import { createI18n } from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'

export type AppLocale = 'zh-CN' | 'en-US'

const STORAGE_KEY = 'app-locale'

function getInitialLocale(): AppLocale {
  const storedLocale = uni.getStorageSync(STORAGE_KEY)
  return storedLocale === 'en-US' ? 'en-US' : 'zh-CN'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  uni.setStorageSync(STORAGE_KEY, locale)
}
