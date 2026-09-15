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
