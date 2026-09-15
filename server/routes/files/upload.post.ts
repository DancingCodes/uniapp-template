import { readMultipartFormData } from 'h3'
import type { H3Event } from 'h3'

export default async (event: H3Event) => {
  const files = await readMultipartFormData(event)
  const file = files?.[0]
  const name = file?.filename || 'uploaded-file.txt'
  return {
    code: 200,
    data: {
      name,
      url: `https://example.com/${name}`
    },
    message: 'ok'
  }
}
