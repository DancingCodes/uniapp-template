import { createApp, createRouter } from 'h3'
import loginHandler from './routes/auth/login.post'
import registerHandler from './routes/auth/register.post'
import uploadHandler from './routes/files/upload.post'
import downloadHandler from './routes/files/download.get'
import versionHandler from './routes/app/version.get'

export const app = createApp({
  onRequest(event) {
    event.node.res.setHeader('Access-Control-Allow-Origin', '*')
    event.node.res.setHeader('Access-Control-Allow-Methods', '*')
    event.node.res.setHeader('Access-Control-Allow-Headers', '*')
    if (event.method === 'OPTIONS') {
      event.node.res.statusCode = 204
      event.node.res.end()
    }
  }
})

const router = createRouter()
    .post('/auth/login', loginHandler)
    .post('/auth/register', registerHandler)
    .post('/files/upload', uploadHandler)
    .get('/files/download', downloadHandler)
    .get('/app/version', versionHandler)

app.use(router)