import { setResponseHeader } from 'h3'
import type { H3Event } from 'h3'

export default (event: H3Event) => {
  const content = 'Hello, this is a sample file for download testing.'
  setResponseHeader(event, 'Content-Type', 'text/plain')
  setResponseHeader(event, 'Content-Disposition', 'attachment; filename="sample.txt"')
  return content
}
