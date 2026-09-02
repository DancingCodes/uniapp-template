import type { ApiResponse, Method, RequestData } from '@/utils/request'

const MOCK_DELAY = 250
const MOCK_TOKEN = 'mock-token-demo'

const mockUser = {
  id: 1,
  username: 'demo',
  nickname: 'Demo User'
}

interface LoginParams {
  username?: string
  password?: string
}

function delay() {
  return new Promise<void>((resolve) => setTimeout(resolve, MOCK_DELAY))
}

export async function mockRequest<T>(
  url: string,
  method: Method,
  data?: RequestData,
  token?: string
): Promise<ApiResponse<T>> {
  await delay()

  if (url === '/auth/login' && method === 'POST') {
    const params = (data || {}) as LoginParams
    if (params.username === 'demo' && params.password === '123456') {
      return {
        code: 200,
        data: { token: MOCK_TOKEN, user: mockUser } as T,
        message: 'ok'
      }
    }

    return { code: 401, data: null as T, message: '用户名或密码错误' }
  }

  if (url === '/auth/me' && method === 'GET') {
    return token === MOCK_TOKEN
      ? { code: 200, data: mockUser as T, message: 'ok' }
      : { code: 401, data: null as T, message: '登录已过期，请重新登录' }
  }

  if (url === '/mock/401' && method === 'GET') {
    return { code: 401, data: null as T, message: '模拟未授权' }
  }

  if (url === '/mock/500' && method === 'GET') {
    return { code: 500, data: null as T, message: '模拟服务器错误' }
  }

  return { code: 404, data: null as T, message: `Mock endpoint not found: ${method} ${url}` }
}
