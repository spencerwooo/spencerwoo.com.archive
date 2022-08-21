import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { Feed } from 'feed'
import { GetServerSideProps } from 'next'

import { type PageCompletePropertyRecord, getDatabase } from '../lib/notion'

const domain = 'https://spencerwoo.com'
const year = new Date().getFullYear()

const generateRSS = (posts: PageObjectResponse[]) => {
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Spencer Woo - Spencer's Blog (@_@;)",
    description: 'Thoughts, ideas, and more.',
    copyright: `CC BY-NC-SA 4.0 ©️ ${year}, Spencer Woo`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Spencer Woo',
      email: 'spencer.wushangbo@gmail.com',
      link: 'https://spencerwoo.com',
    },
  })

  // Add posts to feed based on queried data from Notion
  posts.forEach((post) => {
    const prop = post.properties as unknown as PageCompletePropertyRecord

    const slug =
      'results' in prop.slug && prop.slug.results[0].type === 'rich_text'
        ? prop.slug.results[0].rich_text.plain_text
        : ''
    const name =
      'results' in prop.name && prop.name.results[0].type === 'title'
        ? prop.name.results[0].title.plain_text
        : ''
    const preview =
      'results' in prop.preview && prop.preview.results[0].type === 'rich_text'
        ? prop.preview.results[0].rich_text.plain_text
        : ''
    const date = prop.date.type === 'date' ? prop.date.date?.start ?? '' : ''

    feed.addItem({
      title: name,
      id: post.id,
      link: `${domain}/blog/${slug}`,
      description: preview,
      date: new Date(date),
    })
  })

  return feed.rss2()
}

// Dummy component as Next.js must have a component to render
const FeedComponent = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60 * 10, stale-while-revalidate'
  )

  const posts = await getDatabase()
  const xmlFeed = generateRSS(posts as PageObjectResponse[])

  res.setHeader('Content-Type', 'text/xml')
  res.write(xmlFeed)
  res.end()

  return {
    props: {},
  }
}

export default FeedComponent
