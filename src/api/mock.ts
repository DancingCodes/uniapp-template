import { request } from '@/utils/request'

export function mockUnauthorized() {
  return request<null>('/mock/401', 'GET')
}

export function mockServerError() {
  return request<null>('/mock/500', 'GET')
}
