export const TOKEN_KEY = 'auth-token'
export const USER_KEY = 'auth-user'

export function getStorage<T>(key: string): T | null {
  const value = uni.getStorageSync(key)
  return value === '' || value === undefined || value === null ? null : (value as T)
}

export function setStorage<T>(key: string, value: T) {
  uni.setStorageSync(key, value)
}

export function removeStorage(key: string) {
  uni.removeStorageSync(key)
}
