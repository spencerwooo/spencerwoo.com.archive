import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID || '7021cba3b8a04865850473d4037762ad'

export const getDatabase = async (slug?: string) => {
  let dbQuery: any = {
    database_id: databaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const response = await notion.databases.query(dbQuery)
  return response.results
}

export const getLatestPost = async () => {
  const response = await getDatabase()
  return response[0]
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor }: ListBlockChildrenResponse = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}
// export const getBlocks = async (blockId: string) => {
//   const response = await notion.blocks.children.list({
//     block_id: blockId,
//     page_size: 100,
//   })
//   return response.results
// }

export const searchDatabase = async (query: string) => {
  const response = await notion.search({
    query: query,
    filter: { value: 'page', property: 'object' },
    page_size: 10,
  })
  return response.results
}
