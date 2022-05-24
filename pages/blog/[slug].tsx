import type { GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Fragment } from 'react'
import { FiArrowLeft, FiBookmark, FiMessageCircle } from 'react-icons/fi'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import BlogCopyright from '../../components/BlogCopyright'
import BlogToc from '../../components/BlogToc'
import Comments from '../../components/Comments'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { renderNotionBlock } from '../../components/NotionBlockRenderer'
import probeImageSize from '../../lib/imaging'
import { getBlocks, getDatabase, getPage } from '../../lib/notion'

const Post: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
  const router = useRouter()
  const hostname = 'https://spencerwoo.com'

  if (!page || !blocks) return <div></div>

  return (
    <>
      <Head>
        <title>
          {page.properties.name.title[0].plain_text} - Spencer&apos;s Blog
        </title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <div className="flex min-h-screen flex-col dark:bg-dark-900">
        <Navbar />

        <main className="container relative mx-auto grid max-w-3xl grid-cols-10 gap-8 px-6 lg:max-w-5xl">
          <div className="col-span-10 flex flex-col lg:col-span-7">
            <div className="-mx-4 rounded border-gray-400/30 p-4 md:border">
              <h1 className="mb-2 flex justify-between space-x-2 font-serif text-3xl">
                <span className="font-bold">
                  {page.properties.name.title[0].plain_text}
                </span>
                <span>{page.icon?.emoji || '📚'}</span>
              </h1>
              <div className="secondary-text flex flex-wrap items-center gap-2">
                <span>
                  {new Date(
                    page.properties.date.date.start
                  ).toLocaleDateString()}
                </span>
                <span>·</span>
                {page.properties.author.people.map(
                  (person: { name: string }) => (
                    <span key={person.name}>{person.name?.toLowerCase()}</span>
                  )
                )}
                <span>·</span>
                <div>
                  <FiBookmark size={18} className="mr-1 inline" />
                  <span>{page.properties.tag.select.name?.toLowerCase()}</span>
                </div>
                <span>·</span>
                <Link href="#comments-section" passHref>
                  <a className="hover-links">
                    <FiMessageCircle size={18} className="mr-1 inline" />
                    <span>comments</span>
                  </a>
                </Link>
              </div>

              <article className="prose my-8 dark:prose-invert">
                {blocks.map((block) => (
                  <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                ))}
              </article>

              <BlogCopyright
                page={page}
                absoluteLink={`${hostname}/blog/${router.query.slug}`}
              />
            </div>

            <Link href="/blog" passHref>
              <div className="mt-4 flex cursor-pointer items-center justify-between rounded border border-gray-400/30 p-4 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700 md:-mx-4">
                <span>cd /blog</span>
                <FiArrowLeft />
              </div>
            </Link>

            <Comments />
          </div>

          <BlogToc blocks={blocks} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const db = await getDatabase()
  return {
    paths: db.map((p: any) => ({
      params: { slug: p.properties.slug.rich_text[0].text.content },
    })),
    fallback: 'blocking',
  }
}

interface Props extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate')

  const { slug } = params as Props
  const db = await getDatabase(slug)
  const post = db[0].id

  const page = await getPage(post)
  const blocks = await getBlocks(post)

  // Retrieve all child blocks fetched
  const childBlocks = await Promise.all(
    blocks
      .filter((b: any) => b.has_children)
      .map(async (b) => {
        return {
          id: b.id,
          children: await getBlocks(b.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((b: any) => {
    if (b.has_children && !b[b.type].children) {
      b[b.type]['children'] = childBlocks.find((x) => x.id === b.id)?.children
    }
    return b
  })

  // Resolve all images' dimensions
  await Promise.all(
    blocksWithChildren
      .filter((b: any) => b.type === 'image')
      .map(async (b) => {
        const { type } = b
        const value = b[type]
        const src =
          value.type === 'external' ? value.external.url : value.file.url

        const { width, height } = await probeImageSize(src)
        value['dim'] = { width, height }
        b[type] = value
      })
  )

  // return { props: { page, blocks: blocksWithChildren }, revalidate: 1 }
  return { props: { page, blocks: blocksWithChildren }, revalidate: 60 * 60 } // 1 hour
}

export default Post
