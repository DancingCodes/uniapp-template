<template>
  <wd-tabbar v-model="activeTab" bordered :before-change="handleBeforeChange">
    <wd-tabbar-item v-for="tab in tabs" :key="tab.name" :name="tab.name" :title="tab.title" :icon="tab.icon" />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tabDefinitions = [
  { name: 'index', titleKey: 'tabs.home', icon: 'home', path: '/pages/index/index' },
  { name: 'my', titleKey: 'tabs.my', icon: 'user', path: '/pages/my/my' }
]

const tabs = computed(() => tabDefinitions.map((tab) => ({
  ...tab,
  title: t(tab.titleKey)
})))

const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const currentTab = tabDefinitions.find((tab) => tab.path.slice(1) === currentPage?.route)
const activeTab = ref(currentTab?.name ?? tabDefinitions[0].name)

function handleBeforeChange(value: string | number) {
  const tab = tabDefinitions.find((item) => item.name === String(value))
  if (!tab) return false

  uni.reLaunch({
    url: tab.path
  })

  return false
}
</script>
