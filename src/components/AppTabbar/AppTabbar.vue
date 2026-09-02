<template>
  <wd-tabbar
    v-model="activeTab"
    fixed
    placeholder
    safe-area-inset-bottom
    bordered
    active-color="var(--wot-primary-6)"
    inactive-color="var(--wot-text-secondary)"
    @change="handleTabChange"
  >
    <wd-tabbar-item
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :title="tab.title"
      :icon="tab.icon"
    />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { name: 'home', title: '首页', icon: 'home', path: '/pages/index/index' },
  { name: 'my', title: '我的', icon: 'user', path: '/pages/my/my' }
]

const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const currentTab = tabs.find((tab) => tab.path.slice(1) === currentPage?.route)
const activeTab = ref(currentTab?.name ?? tabs[0].name)

function handleTabChange(event: { value: string | number }) {
  const tab = tabs.find((item) => item.name === String(event.value))
  if (!tab || tab.name === activeTab.value) return

  uni.reLaunch({
    url: tab.path
  })
}
</script>
