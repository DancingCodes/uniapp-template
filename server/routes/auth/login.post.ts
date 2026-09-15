import { readBody } from 'h3'
import type { H3Event } from 'h3'

const MOCK_TOKEN = 'token-demo-123456'

const mockUser = {
  id: 1,
  username: 'demo',
  nickname: 'Demo User'
}

export default async (event: H3Event) => {
  const body = await readBody(event)

  if (body?.username === 'demo' && body?.password === '123456') {
    return { code: 200, data: { token: MOCK_TOKEN, user: mockUser }, message: 'ok' }
  }

  return { code: 500, data: null, message: '用户名或密码错误' }
}
