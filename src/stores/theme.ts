import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>('dark')

  const initTheme = () => {
    try {
      const storedTheme = uni.getStorageSync(STORAGE_KEY)
      if (storedTheme === 'light' || storedTheme === 'dark') {
        theme.value = storedTheme
      }
    } catch {
      // Use the default dark theme when storage is unavailable.
    }
  }

  const syncTabBarTheme = () => {
    try {
      uni.setTabBarStyle({
        color: theme.value === 'dark' ? '#8c8c8c' : '#666666',
        selectedColor: '#4480ff',
        backgroundColor: theme.value === 'dark' ? '#1d1f29' : '#ffffff',
        borderStyle: theme.value === 'dark' ? 'black' : 'white'
      })
    } catch {
      // Some platforms do not support runtime tab bar styling.
    }
  }

  const setTheme = (value: AppTheme) => {
    theme.value = value
    try {
      uni.setStorageSync(STORAGE_KEY, value)
    } catch {
      // Theme remains active for the current session.
    }
    syncTabBarTheme()
  }

  const isDark = computed({
    get: () => theme.value === 'dark',
    set: (value: boolean) => setTheme(value ? 'dark' : 'light')
  })

  initTheme()

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    syncTabBarTheme
  }
})
