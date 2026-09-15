import { getHeader } from 'h3'
import type { H3Event } from 'h3'

const MOCK_TOKEN = 'token-demo-123456'

const mockUser = {
  id: 1,
  username: 'demo',
  nickname: 'Demo User'
}

export default (event: H3Event) => {
  const auth = getHeader(event, 'authorization')

  if (auth === `Bearer ${MOCK_TOKEN}`) {
    return { code: 200, data: mockUser, message: 'ok' }
  }

  return { code: 401, data: null, message: '登录已过期，请重新登录' }
}
