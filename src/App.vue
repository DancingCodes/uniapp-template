<script setup lang="ts">
import { onLaunch, onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function checkAuth() {
  const pages = getCurrentPages()
  const route = pages[pages.length - 1]?.route

  if (!route) return

  if (!userStore.isLoggedIn && route !== 'pages/login/login') {
    uni.reLaunch({ url: '/pages/login/login' })
  } else if (userStore.isLoggedIn && route === 'pages/login/login') {
    uni.reLaunch({ url: '/pages/index/index' })
  }
}

onLaunch(checkAuth)
onShow(checkAuth)
</script>
<style lang="scss">
// wot-ui主题样式
@use '@wot-ui/ui/styles/theme/index.scss';

page {
  height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
}
</style>
