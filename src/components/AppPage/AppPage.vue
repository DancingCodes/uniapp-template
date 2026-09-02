<template>
  <wd-config-provider :theme="themeStore.theme" custom-class="app-page">
    <view class="app-page-content">
      <slot />
    </view>
    <AppTabbar v-if="showTabbar" />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

defineProps<{
  showTabbar?: boolean
}>()

const themeStore = useThemeStore()
</script>

<style lang="scss">
.app-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .app-page-content {
    flex: 1;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: var(--wot-filled-bottom);
    color: var(--wot-text-main);
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
}
</style>
