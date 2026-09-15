import type { H3Event } from 'h3'

export default (_event: H3Event) => {
  return {
    code: 200,
    data: {
      version: '1.1.0',
      downloadUrl: 'https://example.com/app-release.apk',
      forceUpdate: false,
      description: '1. Bug fixes\n2. Performance improvements'
    },
    message: 'ok'
  }
}
