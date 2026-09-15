import { ref, computed } from 'vue'
import to from 'await-to-js'

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginationResult<T> {
  list: T[]
  total: number
  hasMore?: boolean
}

export interface UsePaginationOptions<T> {
  /**
   * 每页数量，默认 10
   */
  pageSize?: number
  /**
   * 请求函数，接收分页参数，返回列表数据
   */
  request: (params: PaginationParams) => Promise<PaginationResult<T>>
  /**
   * 是否立即加载第一页，默认 true
   */
  immediate?: boolean
}

export function usePagination<T>(options: UsePaginationOptions<T>) {
  const { pageSize = 10, request, immediate = true } = options

  const list = ref<T[]>([])
  const page = ref(1)
  const total = ref(0)
  const loading = ref(false)
  const refreshing = ref(false)
  const finished = ref(false)
  const error = ref(false)

  const hasMore = computed(() => list.value.length < total.value)
  const isEmpty = computed(() => !loading.value && !refreshing.value && list.value.length === 0)

  let requestPromise: Promise<void> | null = null

  async function loadData(isRefresh = false) {
    // 防止重复请求
    if (requestPromise) return requestPromise

    if (isRefresh) {
      refreshing.value = true
      page.value = 1
      finished.value = false
      error.value = false
    } else {
      if (finished.value || loading.value) return
      loading.value = true
    }

    requestPromise = (async () => {
      const [err, result] = await to(
        request({
          page: page.value,
          pageSize
        })
      )

      if (err) {
        error.value = true
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } else if (result) {
        total.value = result.total

        if (isRefresh) {
          list.value = result.list
        } else {
          list.value.push(...result.list)
        }

        // 判断是否还有更多数据
        if (result.hasMore !== undefined) {
          finished.value = !result.hasMore
        } else {
          finished.value = list.value.length >= result.total
        }

        error.value = false
      }

      loading.value = false
      refreshing.value = false
      requestPromise = null
    })()

    return requestPromise
  }

  async function refresh() {
    await loadData(true)
  }

  async function loadMore() {
    if (finished.value || loading.value) return
    page.value++
    await loadData(false)
  }

  function retry() {
    error.value = false
    loadData(false)
  }

  function reset() {
    list.value = []
    page.value = 1
    total.value = 0
    loading.value = false
    refreshing.value = false
    finished.value = false
    error.value = false
    requestPromise = null
  }

  if (immediate) {
    loadData(false)
  }

  return {
    list,
    page,
    total,
    loading,
    refreshing,
    finished,
    error,
    hasMore,
    isEmpty,
    loadData,
    refresh,
    loadMore,
    retry,
    reset
  }
}
