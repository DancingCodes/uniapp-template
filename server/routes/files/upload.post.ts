import type { H3Event } from 'h3'

export default (_event: H3Event) => {
  return {
    code: 200,
    data: {
      name: 'uploaded-file.txt',
      url: 'https://example.com/uploaded-file.txt'
    },
    message: 'ok'
  }
}
