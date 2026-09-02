import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'light' | 'dark'

const STORAGE_KEY = 'app-theme'

function getInitialTheme(): AppTheme {
  try {
    const storedTheme = uni.getStorageSync(STORAGE_KEY)
    return storedTheme === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(getInitialTheme())

  const syncTabBarTheme = () => {
    uni.setTabBarStyle({
      color: theme.value === 'dark' ? '#8c8c8c' : '#666666',
      selectedColor: '#4480ff',
      backgroundColor: theme.value === 'dark' ? '#1d1f29' : '#ffffff',
      borderStyle: theme.value === 'dark' ? 'black' : 'white'
    })
  }

  const setTheme = (value: AppTheme) => {
    theme.value = value
    uni.setStorageSync(STORAGE_KEY, value)
    syncTabBarTheme()
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
