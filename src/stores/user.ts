import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

export interface UserInfo {
  id?: string | number
  username?: string
  nickname?: string
  [key: string]: unknown
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(uni.getStorageSync(TOKEN_KEY) || null)
  const user = ref<UserInfo | null>(uni.getStorageSync(USER_KEY) || null)
  const isLoggedIn = computed(() => Boolean(token.value))

  function setAuth(nextToken: string, nextUser?: UserInfo) {
    token.value = nextToken
    uni.setStorageSync(TOKEN_KEY, nextToken)

    if (nextUser) {
      user.value = nextUser
      uni.setStorageSync(USER_KEY, nextUser)
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    uni.removeStorageSync(TOKEN_KEY)
    uni.removeStorageSync(USER_KEY)
  }

  return {
    token,
    user,
    isLoggedIn,
    setAuth,
    clearAuth
  }
})
