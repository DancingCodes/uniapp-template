<template>
  <AppPage show-tabbar>
    <view class="home-page">
      <wd-card :title="t('home.welcomeTitle')" custom-class="home-page__card">
        <view class="home-page__description">{{ t('home.welcomeDescription') }}</view>
      </wd-card>

      <wd-cell-group :title="t('home.projectStatus')" border insert>
        <wd-cell :title="t('home.framework')" :value="t('home.frameworkValue')" />
        <wd-cell :title="t('home.uiLibrary')" :value="t('home.uiLibraryValue')" />
        <wd-cell :title="t('home.theme')" :value="themeLabel" />
        <wd-cell :title="t('settings.language')" :value="localeLabel" />
        <wd-cell :title="t('settings.style')" :value="styleLabel" />
      </wd-cell-group>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t, locale } = useI18n()
const themeStore = useThemeStore()
const themeLabel = computed(() => themeStore.isDark ? t('home.darkTheme') : t('home.lightTheme'))
const localeLabel = computed(() => locale.value === 'en-US' ? 'English' : '简体中文')
const styleLabel = computed(() => t(`settings.${themeStore.style}Style`))
</script>

<style lang="scss" scoped>
.home-page {
  &__card {
    margin: 0;
  }

  &__description {
    line-height: 1.6;
  }

  .wd-cell-group {
    margin-top: 20rpx;
  }
}
</style>
