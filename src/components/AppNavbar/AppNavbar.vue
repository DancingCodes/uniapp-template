<template>
  <wd-navbar :title="title" left-arrow bordered @click-left="goBack" />
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

function goBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
    return
  }

  uni.reLaunch({ url: '/pages/index/index' })
}
</script>
