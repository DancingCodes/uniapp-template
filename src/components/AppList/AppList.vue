<template>
  <scroll-view
    class="app-list"
    scroll-y
    :refresher-enabled="enableRefresh"
    :refresher-triggered="refreshing"
    @refresherrefresh="onRefresh"
    @scrolltolower="onLoadMore"
  >
    <!-- 列表内容插槽 -->
    <slot :list="list" />

    <!-- 空状态 -->
    <view v-if="isEmpty && !error" class="app-list__empty">
      <slot name="empty">
        <wd-empty :image="emptyImage" :description="emptyText" />
      </slot>
    </view>

    <!-- 错误状态 -->
    <view v-if="error && !loading && !refreshing" class="app-list__error">
      <slot name="error">
        <wd-empty image="error" :description="errorText">
          <wd-button type="primary" size="small" @click="onRetry">{{ retryText }}</wd-button>
        </wd-empty>
      </slot>
    </view>

    <!-- 加载更多状态 -->
    <view v-if="showLoadMore" class="app-list__footer">
      <wd-loading v-if="loading" type="spinner" :size="32" />
      <view v-else-if="finished && list.length > 0" class="app-list__finished">
        {{ finishedText }}
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  list: T[]
  loading?: boolean
  refreshing?: boolean
  finished?: boolean
  error?: boolean
  isEmpty?: boolean
  enableRefresh?: boolean
  emptyText?: string
  emptyImage?: string
  errorText?: string
  retryText?: string
  finishedText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  refreshing: false,
  finished: false,
  error: false,
  isEmpty: false,
  enableRefresh: true,
  emptyImage: 'network'
})

const emit = defineEmits<{
  refresh: []
  loadMore: []
  retry: []
}>()

const { t } = useI18n()

const emptyText = computed(() => props.emptyText || t('list.empty'))
const errorText = computed(() => props.errorText || t('list.error'))
const retryText = computed(() => props.retryText || t('list.retry'))
const finishedText = computed(() => props.finishedText || t('list.finished'))

const showLoadMore = computed(
  () => props.list.length > 0 && !props.isEmpty && !props.error
)

function onRefresh() {
  emit('refresh')
}

function onLoadMore() {
  if (!props.loading && !props.finished && !props.error) {
    emit('loadMore')
  }
}

function onRetry() {
  emit('retry')
}
</script>

<style lang="scss" scoped>
.app-list {
  height: 100%;
  width: 100%;

  &__empty,
  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400rpx;
    padding: 40rpx 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    color: var(--wot-text-secondary);
    font-size: 28rpx;
  }

  &__finished {
    color: var(--wot-text-disabled);
  }
}
</style>
