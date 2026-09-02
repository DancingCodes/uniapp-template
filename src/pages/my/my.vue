<template>
  <AppPage>
    <view class="page">
      <view class="header">
        <text class="title">我的</text>
        <text class="subtitle">个人设置</text>
      </view>

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

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  display: block;
  color: var(--wot-text-main);
  font-size: 48rpx;
  font-weight: 600;
}

.subtitle {
  display: block;
  margin-top: 12rpx;
  color: var(--wot-text-secondary);
  font-size: 28rpx;
}
</style>
