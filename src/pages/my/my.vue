<template>
  <AppPage>
    <view class="page">
      <wd-cell-group border>
        <wd-cell title="深色模式" label="使用 Wot UI 深色主题">
          <template #default>
            <wd-switch v-model="isDark" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
</script>

<style lang="scss" scoped></style>
