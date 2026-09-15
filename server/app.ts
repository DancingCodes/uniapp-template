import { createApp, createRouter, defineEventHandler } from 'h3'
import loginHandler from './routes/auth/login.post'
import meHandler from './routes/auth/me.get'
import uploadHandler from './routes/files/upload.post'

const app = createApp()

const router = createRouter()
router.post('/auth/login', defineEventHandler(loginHandler))
router.get('/auth/me', defineEventHandler(meHandler))
router.post('/files/upload', defineEventHandler(uploadHandler))

app.use(router)

export default app
