<template>
  <AppPage>
    <view class="register-page">
      <text class="register-page__title">{{ t('register.title') }}</text>
      <wd-cell-group border insert>
        <wd-cell>
          <wd-input v-model="form.username" :placeholder="t('register.username')" clearable />
        </wd-cell>
        <wd-cell>
          <wd-input v-model="form.password" :placeholder="t('register.password')" type="safe-password" show-password
            clearable />
        </wd-cell>
        <wd-cell>
          <wd-input v-model="form.confirmPassword" :placeholder="t('register.confirmPassword')" type="safe-password"
            show-password clearable />
        </wd-cell>
      </wd-cell-group>
      <wd-button block :loading="loading" @click="handleRegister">{{ t('register.submit') }}</wd-button>
      <view class="register-page__footer">
        <text class="register-page__link" @click="goToLogin">{{ t('register.hasAccount') }}</text>
      </view>
    </view>
  </AppPage>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { register } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const loading = ref(false)
const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

function goToLogin() {
  uni.navigateTo({ url: '/pages/login/login' })
}

async function handleRegister() {
  if (!form.username || !form.password) {
    uni.showToast({ title: t('register.required'), icon: 'none' })
    return
  }

  if (form.password !== form.confirmPassword) {
    uni.showToast({ title: t('register.passwordMismatch'), icon: 'none' })
    return
  }

  loading.value = true
  const [error, data] = await to(register({ username: form.username, password: form.password }))
  loading.value = false
  if (error) return
  if (!data?.token) {
    uni.showToast({ title: t('common.invalidResponse'), icon: 'none' })
    return
  }
  userStore.setAuth(data.token, data.user)
  uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped>
.register-page {
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

  &__footer {
    margin-top: 24rpx;
    text-align: center;
  }

  &__link {
    color: var(--wot-color-primary);
    font-size: 28rpx;
  }
}
</style>
