<template>
  <wd-config-provider :theme="themeStore.theme" custom-class="app-page">
    <slot />
    <AppTabbar />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>

<style lang="scss">
.app-page {
  height: 100%;
  box-sizing: border-box;
  background-color: var(--wot-filled-bottom);
  color: var(--wot-text-main);
}
</style>
