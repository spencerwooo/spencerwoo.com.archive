import type { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import { ParsedUrlQuery } from 'querystring'

import Head from 'next/head'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { renderNotionBlock } from '../../components/NotionBlockRenderer'

import { getDatabase, getPage, getBlocks } from '../../lib/notion'
import probeImageSize from '../../lib/imaging'
import Comments from '../../components/Comments'

const Post: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
  if (!page || !blocks) return <div></div>

  return (
    <div>
      <Head>
        <title>{page.properties.name.title[0].plain_text} - Spencer's Blog</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="flex font-bold space-x-2 text-xl mb-2 justify-between dark:text-light-900">
            <span>{page.properties.name.title[0].plain_text}</span>
            <span>{page.icon.emoji}</span>
          </h1>
          <div className="flex flex-wrap space-x-2 mb-8 text-gray-500 items-center">
            <span>{page.properties.date.date.start}</span>
            <span>·</span>
            {page.properties.author.people.map((person: { name: string }) => (
              <span key={person.name}>{person.name.toLowerCase()}</span>
            ))}
            <span>·</span>
            <span>{page.properties.tag.select.name.toLowerCase()}</span>
          </div>

          {blocks.map(block => (
            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
          ))}

          {/* <Link href="/blog">
            <p className="border-none rounded cursor-pointer font-mono -mx-2 mt-8 text-sm mb-2 p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
              cd /blog
            </p>
          </Link> */}

          <Comments />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const db = await getDatabase()
  return {
    paths: db.map((p: any) => ({ params: { slug: p.properties.slug.rich_text[0].text.content } })),
    fallback: 'blocking',
  }
}

interface Props extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Props
  const db = await getDatabase(slug)
  const post = db[0].id

  const page = await getPage(post)
  const blocks = await getBlocks(post)

  // Retrieve all child blocks fetched
  const childBlocks = await Promise.all(
    blocks
      .filter((b: any) => b.has_children)
      .map(async b => {
        return {
          id: b.id,
          children: await getBlocks(b.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((b: any) => {
    if (b.has_children && !b[b.type].children) {
      b[b.type]['children'] = childBlocks.find(x => x.id === b.id)?.children
    }
    return b
  })

  // Resolve all images' dimensions
  await Promise.all(
    blocksWithChildren
      .filter((b: any) => b.type === 'image')
      .map(async b => {
        const { type } = b
        const value = b[type]
        const src = value.type === 'external' ? value.external.url : value.file.url

        const { width, height } = await probeImageSize(src)
        value['dim'] = { width, height }
        b[type] = value
      })
  )

  return { props: { page, blocks: blocksWithChildren }, revalidate: 1 }
}

export default Post
