import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

function getInitialTheme(): AppTheme {
  const storedTheme = uni.getStorageSync(STORAGE_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(getInitialTheme())

  const setTheme = (value: AppTheme) => {
    theme.value = value
    uni.setStorageSync(STORAGE_KEY, value)
  }

  const isDark = computed({
    get: () => theme.value === 'dark',
    set: (value: boolean) => setTheme(value ? 'dark' : 'light')
  })

  return {
    theme,
    isDark
  }
})
