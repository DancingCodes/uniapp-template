<template>
  <AppPage :title="t('list.demoTitle')">
    <AppList
      :list="pagination.list.value"
      :loading="pagination.loading.value"
      :refreshing="pagination.refreshing.value"
      :finished="pagination.finished.value"
      :error="pagination.error.value"
      :is-empty="pagination.isEmpty.value"
      @refresh="pagination.refresh"
      @load-more="pagination.loadMore"
      @retry="pagination.retry"
    >
      <template #default="{ list }">
        <wd-cell-group border>
          <wd-cell
            v-for="item in list"
            :key="item.id"
            :title="item.title"
            :label="item.description"
            is-link
          />
        </wd-cell-group>
      </template>
    </AppList>
  </AppPage>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePagination } from '@/composables/usePagination'

const { t } = useI18n()

interface ListItem {
  id: number
  title: string
  description: string
}

// 模拟 API 请求
async function fetchList(params: { page: number; pageSize: number }) {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟数据
  const start = (params.page - 1) * params.pageSize
  const list: ListItem[] = Array.from({ length: params.pageSize }, (_, i) => ({
    id: start + i + 1,
    title: `Item ${start + i + 1}`,
    description: `Description for item ${start + i + 1}`
  }))

  // 模拟总共 50 条数据
  const total = 50

  return {
    list,
    total,
    hasMore: start + params.pageSize < total
  }
}

const pagination = usePagination<ListItem>({
  pageSize: 10,
  request: fetchList,
  immediate: true
})
</script>
