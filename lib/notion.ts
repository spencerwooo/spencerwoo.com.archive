import { Client } from '@notionhq/client'
import type {
  GetPagePropertyResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { retry } from 'ts-retry-promise'

export type PageCompletePropertyResponse = {
  id: string
} & GetPagePropertyResponse
export type PageCompletePropertyRecord = Record<
  string,
  PageCompletePropertyResponse
>
export type LatestPostProps = {
  title: string
  slug: string
  emoji: string
} | null

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId =
  process.env.NOTION_DATABASE_ID || '7021cba3b8a04865850473d4037762ad'

const getPageProperty = async (pageId: string, propId: string) => {
  return await retry(
    () =>
      notion.pages.properties.retrieve({
        page_id: pageId,
        property_id: propId,
      }),
    { retries: 5 }
  )
}

export const getDatabase = async (slug?: string) => {
  let dbQuery: any = {
    database_id: databaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const { results } = await notion.databases.query(dbQuery)

  // Each result (post) contains properties that should be extracted
  // Props include - { published, tag, slug, author, date, preview, name }
  await Promise.all(
    results.map(async (res) => {
      if ('properties' in res) {
        for (const prop in res.properties) {
          if (res.properties.hasOwnProperty(prop)) {
            const propId = res.properties[prop].id
            const propObj = await getPageProperty(res.id, propId)

            // Dumping every property into the result object as there is much
            // to take care of (which will happen in React)
            res.properties[prop] = { id: propId, ...propObj }
          }
        }
      }

      return res
    })
  )

  return results
}

export const getLatestPostProps = async () => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
    page_size: 1,
  })

  const post = results[0]
  if (!('icon' in post && 'properties' in post)) return null

  const propExtractor = async (propId: string, pageId: string) => {
    const prop = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propId,
    })
    if (!('results' in prop)) return ''
    return prop.results.map((r: any) => r[r.type].plain_text).join('')
  }

  const emoji = post.icon?.type === 'emoji' ? post.icon.emoji : '🎑'
  const slug = await propExtractor(post.properties.slug.id, post.id)
  const title = await propExtractor(post.properties.name.id, post.id)
  return {
    emoji,
    slug,
    title,
  } as LatestPostProps
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })

  if ('properties' in response) {
    for (const prop in response.properties) {
      if (response.properties.hasOwnProperty(prop)) {
        const propId = response.properties[prop].id
        const propObj = getPageProperty(response.id, propId)

        // Same as the above implementation
        response.properties[prop] = { id: propId, ...propObj }
      }
    }
  }
  return response
}

export const getBlocks = async (blockId: string) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor }: ListBlockChildrenResponse =
      await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      })

    blocks.push(...results)
    if (!next_cursor) break
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
