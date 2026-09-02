<template>
  <wd-tabbar
    v-model="activeTab"
    fixed
    placeholder
    safe-area-inset-bottom
    bordered
    :before-change="handleBeforeChange"
  >
    <wd-tabbar-item v-for="tab in tabs" :key="tab.name" :name="tab.name" :title="tab.title" :icon="tab.icon" />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { name: 'index', title: '首页', icon: 'home', path: '/pages/index/index' },
  { name: 'my', title: '我的', icon: 'user', path: '/pages/my/my' }
]

const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const currentTab = tabs.find((tab) => tab.path.slice(1) === currentPage?.route)
const activeTab = ref(currentTab?.name ?? tabs[0].name)

function handleBeforeChange(value: string | number) {
  const tab = tabs.find((item) => item.name === String(value))
  if (!tab) return false

  uni.reLaunch({
    url: tab.path
  })

  return false
}
</script>
