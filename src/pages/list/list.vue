<template>
  <AppPage :title="t('my.list')">
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
import { request } from '@/utils/request'

const { t } = useI18n()

interface ListItem {
  id: number
  title: string
  description: string
  createTime: string
}

// 调用真实 API 接口
async function fetchList(params: { page: number; pageSize: number }) {
  const res = await request<{
    list: ListItem[]
    total: number
    hasMore: boolean
  }>({
    url: '/app/list',
    method: 'GET',
    data: params
  })

  return {
    list: res.list,
    total: res.total,
    hasMore: res.hasMore
  }
}

const pagination = usePagination<ListItem>({
  pageSize: 10,
  request: fetchList,
  immediate: true
})
</script>
