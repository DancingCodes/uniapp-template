import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'light' | 'dark'
export type AppStyle = 'ios' | 'soft'

const STORAGE_KEY = 'app-theme'
const STYLE_KEY = 'app-style'

function getInitialTheme(): AppTheme {
  const storedTheme = uni.getStorageSync(STORAGE_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(getInitialTheme())
  const style = ref<AppStyle>(uni.getStorageSync(STYLE_KEY) === 'soft' ? 'soft' : 'ios')

  const themeVars = computed(() => style.value === 'soft'
    ? { primary6: '#12B886', radiusMain: '8px', radiusLarge: '12px', buttonRadiusMain: '8px' }
    : { primary6: '#007AFF', radiusMain: '4px', radiusLarge: '8px', buttonRadiusMain: '8px' })

  const setTheme = (value: AppTheme) => {
    theme.value = value
    uni.setStorageSync(STORAGE_KEY, value)
  }

  const isDark = computed({
    get: () => theme.value === 'dark',
    set: (value: boolean) => setTheme(value ? 'dark' : 'light')
  })

  const setStyle = (value: AppStyle) => {
    style.value = value
    uni.setStorageSync(STYLE_KEY, value)
  }

  return {
    theme,
    isDark,
    style,
    themeVars,
    setStyle
  }
})
