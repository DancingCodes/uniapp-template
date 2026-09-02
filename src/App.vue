<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
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
