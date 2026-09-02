import { request } from '@/utils/request'

interface TestPost {
  id: number
  title: string
  body: string
  userId: number
}

export const testGet = () => request<TestPost>('/posts/1', 'GET')

export const testPost = () => request<TestPost>('/posts', 'POST', {
  title: 'test',
  body: 'test',
  userId: 1
})

export const testPut = () => request<TestPost>('/posts/1', 'PUT', {
  id: 1,
  title: 'updated'
})

export const testDelete = () => request<null>('/posts/1', 'DELETE')
