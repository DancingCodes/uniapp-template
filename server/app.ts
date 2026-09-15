import { createApp, createRouter, defineEventHandler, setResponseHeaders } from 'h3'
import loginHandler from './routes/auth/login.post'
import meHandler from './routes/auth/me.get'
import uploadHandler from './routes/files/upload.post'

const app = createApp()

app.use(defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  })
  if (event.method === 'OPTIONS') return ''
}))

const router = createRouter()
router.post('/auth/login', defineEventHandler(loginHandler))
router.get('/auth/me', defineEventHandler(meHandler))
router.post('/files/upload', defineEventHandler(uploadHandler))

app.use(router)

export default app
