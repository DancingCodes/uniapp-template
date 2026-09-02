import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getStorage, removeStorage, setStorage, TOKEN_KEY, USER_KEY } from '@/utils/storage'

export interface UserInfo {
  id?: string | number
  username?: string
  nickname?: string
  [key: string]: unknown
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(getStorage<string>(TOKEN_KEY))
  const user = ref<UserInfo | null>(getStorage<UserInfo>(USER_KEY))
  const isLoggedIn = computed(() => Boolean(token.value))

  function setAuth(nextToken: string, nextUser?: UserInfo) {
    token.value = nextToken
    setStorage(TOKEN_KEY, nextToken)

    if (nextUser) {
      user.value = nextUser
      setStorage(USER_KEY, nextUser)
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    removeStorage(TOKEN_KEY)
    removeStorage(USER_KEY)
  }

  return {
    token,
    user,
    isLoggedIn,
    setAuth,
    clearAuth
  }
})
