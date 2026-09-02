<template>
  <AppPage show-tabbar>
    <view class="my-page__profile">
      <wd-avatar icon="user" size="large" />
      <text v-if="userStore.isLoggedIn" class="my-page__title">{{ displayName }}</text>
      <text v-else class="my-page__title my-page__login" @click="goToLogin">{{ t('my.loginPrompt') }}</text>
    </view>

    <wd-cell-group border insert>
      <wd-cell :title="t('my.settings')" is-link to="/pages/settings/settings" />
      <template v-if="isMockMode">
        <wd-cell :title="t('my.mockUnauthorized')" is-link @click="handleMockUnauthorized" />
        <wd-cell :title="t('my.mockServerError')" is-link @click="handleMockServerError" />
      </template>
      <wd-cell v-if="userStore.isLoggedIn" :title="t('my.logout')" is-link @click="handleLogout" />
    </wd-cell-group>

    <wd-dialog />

  </AppPage>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDialog } from '@wot-ui/ui'
import { mockServerError, mockUnauthorized } from '@/api/mock'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const isMockMode = import.meta.env.VITE_API_MODE === 'mock'
const dialog = useDialog()
const displayName = computed(() => userStore.user?.nickname || userStore.user?.username || t('my.defaultUser'))

function goToLogin() {
  uni.reLaunch({ url: '/pages/login/login' })
}

async function handleMockUnauthorized() {
  await to(mockUnauthorized())
}

async function handleMockServerError() {
  await to(mockServerError())
}

async function handleLogout() {
  const [error, result] = await to(dialog.confirm({
    title: t('my.logout'),
    msg: t('my.logoutConfirm'),
    confirmButtonText: t('my.confirm'),
    cancelButtonText: t('my.cancel')
  }))
  if (error || result?.action !== 'confirm') return

  userStore.clearAuth()
  uni.reLaunch({ url: '/pages/login/login' })
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
