<template>
  <AppPage show-tabbar>
    <view class="my-page__profile">
      <wd-avatar icon="user" size="large" />
      <text class="my-page__title">{{ t('tabs.my') }}</text>
    </view>

    <wd-cell-group border insert>
      <wd-cell :title="t('my.settings')" is-link to="/pages/settings/settings" />
    </wd-cell-group>
  </AppPage>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.my-page__profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 0 40rpx;
}

.my-page__title {
  margin-top: 16rpx;
  color: var(--wot-text-main);
  font-size: 36rpx;
  font-weight: 600;
}
</style>
