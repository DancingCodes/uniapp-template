import type { H3Event } from 'h3'
import { getQuery } from 'h3'

// 模拟数据库数据
const generateItems = (total: number) => {
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
    createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
}

const allItems = generateItems(100)

export default (event: H3Event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const pageSize = Number(query.pageSize) || 10

  // 分页逻辑
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = allItems.slice(start, end)

  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          list: items,
          total: allItems.length,
          page,
          pageSize,
          hasMore: end < allItems.length
        },
        message: 'ok'
      })
    }, 500)
  })
}
