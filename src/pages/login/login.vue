<template>
  <AppPage>
    <view class="login-page">
      <text class="login-page__title">{{ t('login.title') }}</text>
      <wd-cell-group border>
        <wd-cell>
          <wd-input v-model="form.username" :placeholder="t('login.username')" clearable />
        </wd-cell>
        <wd-cell>
          <wd-input v-model="form.password" :placeholder="t('login.password')" type="safe-password" show-password
            clearable />
        </wd-cell>
      </wd-cell-group>
      <wd-button block :loading="loading" @click="handleLogin">{{ t('login.submit') }}</wd-button>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

async function handleLogin() {
  if (!form.username || !form.password) {
    uni.showToast({ title: t('login.required'), icon: 'none' })
    return
  }

  loading.value = true
  try {
    const response = await login(form)
    userStore.setAuth(response.data.token, response.data.user)
    uni.reLaunch({ url: '/pages/index/index' })
  } catch {
    uni.showToast({ title: t('login.failed'), icon: 'none' })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  padding-top: 160rpx;

  &__title {
    display: block;
    margin-bottom: 40rpx;
    color: var(--wot-text-main);
    font-size: 48rpx;
    font-weight: 600;
    text-align: center;
  }

  .wd-button {
    margin-top: 32rpx;
  }
}
</style>
