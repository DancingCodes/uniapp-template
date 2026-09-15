import { request } from '@/utils/request'

export interface VersionData {
  version: string
  downloadUrl: string
  forceUpdate: boolean
  description: string
}

export function getVersion() {
  return request<VersionData>('/app/version', 'GET')
}

export interface ListItem {
  id: number
  title: string
  description: string
  createTime: string
}

export interface ListData {
  list: ListItem[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface ListParams {
  page: number
  pageSize: number
}

export function getList(params: ListParams) {
  return request<ListData>('/app/list', 'GET', params)
}
