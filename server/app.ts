import { createApp, createRouter } from 'h3'
import loginHandler from './routes/auth/login.post'
import registerHandler from './routes/auth/register.post'
import uploadHandler from './routes/files/upload.post'
import downloadHandler from './routes/files/download.get'

export const app = createApp()

const router = createRouter()
    .post('/auth/login', loginHandler)
    .post('/auth/register', registerHandler)
    .post('/files/upload', uploadHandler)
    .get('/files/download', downloadHandler)

app.use(router)