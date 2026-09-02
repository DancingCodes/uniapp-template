import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type AppTheme = 'light' | 'dark'
export type AppStyle = 'ios' | 'material' | 'rounded' | 'compact'

const STORAGE_KEY = 'app-theme'
const STYLE_KEY = 'app-style'

const styleVars: Record<AppStyle, Record<string, string>> = {
  ios: {
    primary6: '#007AFF',
    radiusMain: '4px',
    radiusLarge: '8px',
    buttonRadiusMain: '8px',
    cellGroupInsertRadius: '12px',
    cellGroupInsertMargin: '0'
  },
  material: {
    primary6: '#00695C',
    radiusMain: '4px',
    radiusLarge: '4px',
    buttonRadiusMain: '20px',
    cellGroupInsertRadius: '4px',
    cellGroupInsertMargin: '0'
  },
  rounded: {
    primary6: '#FF6B35',
    radiusMain: '12px',
    radiusLarge: '20px',
    buttonRadiusMain: '999px',
    cellGroupInsertRadius: '20px',
    cellGroupInsertMargin: '0'
  },
  compact: {
    primary6: '#1D4ED8',
    radiusMain: '0',
    radiusLarge: '2px',
    buttonRadiusMain: '2px',
    cellGroupInsertRadius: '2px',
    cellGroupInsertMargin: '0'
  }
}

function getInitialTheme(): AppTheme {
  const storedTheme = uni.getStorageSync(STORAGE_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<AppTheme>(getInitialTheme())
  const storedStyle = uni.getStorageSync(STYLE_KEY)
  const style = ref<AppStyle>(typeof storedStyle === 'string' && storedStyle in styleVars ? storedStyle as AppStyle : 'ios')
  const themeVars = computed(() => styleVars[style.value])

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
