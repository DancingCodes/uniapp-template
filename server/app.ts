import { createApp, createRouter } from 'h3'
import loginHandler from './routes/auth/login.post'
import meHandler from './routes/auth/me.get'
import uploadHandler from './routes/files/upload.post'

export const app = createApp()

const router = createRouter()
    .post('/auth/login', loginHandler)
    .get('/auth/me', meHandler)
    .post('/files/upload', uploadHandler)

app.use(router)