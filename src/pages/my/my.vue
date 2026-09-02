<template>
  <AppPage show-tabbar>
    <view class="my-page__profile">
      <wd-avatar icon="user" size="large" />
      <text v-if="userStore.isLoggedIn" class="my-page__title">{{ displayName }}</text>
      <text v-else class="my-page__title my-page__login" @click="goToLogin">{{ t('my.loginPrompt') }}</text>
    </view>

    <wd-cell-group border insert>
      <wd-cell :title="t('my.settings')" is-link to="/pages/settings/settings" />
      <wd-cell v-if="userStore.isLoggedIn" :title="t('my.logout')" is-link @click="handleLogout" />
    </wd-cell-group>

  </AppPage>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const displayName = computed(() => userStore.user?.nickname || userStore.user?.username || t('my.defaultUser'))

function goToLogin() {
  uni.reLaunch({ url: '/pages/login/login' })
}

function handleLogout() {
  uni.showModal({
    title: t('my.logout'),
    content: t('my.logoutConfirm'),
    confirmText: t('my.confirm'),
    cancelText: t('my.cancel'),
    success: ({ confirm }) => {
      if (!confirm) return

      userStore.clearAuth()
      uni.reLaunch({ url: '/pages/login/login' })
    }
  })
}
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

.my-page__login {
  color: var(--wot-color-primary);
}
</style>
