import type { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import { ParsedUrlQuery } from 'querystring'

import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { renderNotionBlock } from '../../components/NotionBlockRenderer'

import { getDatabase, getPage, getBlocks } from '../../lib/notion'
import probeImageSize from '../../lib/imaging'
import Comments from '../../components/Comments'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

const Post: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
  const router = useRouter()
  const hostname = typeof window !== 'undefined' ? window.location.origin : 'https://spencerwoo.com'

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
          <div className="flex flex-wrap space-x-2 h-8 mb-8 text-gray-500 items-center">
            <span>{page.properties.date.date.start}</span>
            <span>·</span>
            {page.properties.author.people.map((person: { name: string }) => (
              <span key={person.name}>{person.name.toLowerCase()}</span>
            ))}
            <span>·</span>
            <span>{page.properties.tag.select.name.toLowerCase()}</span>
            <span>·</span>
            <Link href="#comments">
              <a href="#comments">comments</a>
            </Link>
          </div>

          <div className="border rounded border-gray-400/30 -mx-4 p-4">
            {blocks.map(block => (
              <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
            ))}

            <div className="bg-light-400 dark:bg-dark-400 -mx-4 text-sm -mb-4 p-4 relative overflow-hidden">
              <div className="opacity-10 transform top-0 right-0 w-64 translate-x-10 translate-y-3 absolute">
                <svg
                className='fill-current'
                  viewBox="0 0 800 704"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                >
                  <path
                    d="M400.98 130.135c50.883-55.103 110.318-80.162 179.132-70.454 71.026 10.02 131.5 60.798 153 129.238 16.543 52.662 9.676 111.642-12.477 165.426-34.457 83.653-136.276 202.558-320.636 285.689-184.358-83.13-286.178-202.036-320.634-285.689-22.154-53.784-29.021-112.764-12.478-165.426 21.5-68.44 81.974-119.218 153.001-129.238 68.816-9.708 128.25 15.353 179.135 70.459l.976 1.06c.002.001.897-.974.982-1.065ZM400 51.988c-111.14-87.23-285.332-64.47-365.432 66.63C7.973 162.148-2.016 212.755.331 263c4.072 87.153 41.693 163.336 96.952 229.077 74.408 88.524 181.98 158.088 300.364 209.999.165.073 1.531.667 2.352 1.032.72-.303 1.98-.871 2.368-1.042 117.775-51.91 225.946-121.48 300.35-209.989C757.98 426.34 795.595 350.153 799.668 263c2.347-50.245-7.64-100.853-34.237-144.382-80.1-131.1-254.292-153.86-365.432-66.63Z"
                    stroke-width=".01728"
                  />
                  <path d="m397.157 373.77-50.596-25.08c-17.586 25.643-30.382 42.997-67.34 32.871-29.014-7.95-37.6-39.747-38.702-66.42-1.507-36.434 11.23-78.512 54.744-76.26 27.807 1.435 39.655 17.836 45.986 32.577l55.244-28.32c-27.212-51.914-90.983-69.569-145.036-55.102-57.52 15.395-86.653 68.308-85.632 125.37 1.044 58.33 29.043 108.718 89.192 121.869 29.327 6.41 61.259 4.92 88.416-8.696 21.018-10.537 44.368-30.877 53.724-52.81Zm238.507 0-50.596-25.08c-17.586 25.643-30.382 42.997-67.342 32.871-29.011-7.95-37.598-39.747-38.702-66.42-1.505-36.434 11.232-78.512 54.747-76.26 27.805 1.435 39.652 17.836 45.983 32.577L635 243.138c-27.211-51.914-90.981-69.569-145.037-55.102-57.518 15.395-86.652 68.308-85.63 125.37 1.043 58.33 29.043 108.718 89.192 121.869 29.326 6.41 61.259 4.92 88.416-8.696 21.018-10.537 44.368-30.877 53.724-52.81Z" />
                </svg>
              </div>
              <p className="font-medium leading-5">{page.properties.name.title[0].plain_text} - Spencer Woo</p>
              <p>
                <a href={`${hostname}/blog/${router.query.slug}`} target="_blank" rel="noopener noreferrer">
                  {`${hostname}/blog/${router.query.slug}`}
                </a>
              </p>
              <p className="opacity-90 grid mt-2 grid-cols-3 md:w-2/3">
                <div>
                  <div className="text-xs">Author</div>
                  <div>{page.properties.author.people.map((person: { name: string }) => person.name).join(', ')}</div>
                </div>
                <div>
                  <div className="text-xs">Date</div>
                  <div>{page.properties.date.date.start}</div>
                </div>
                <div>
                  <div className="text-xs">License</div>
                  <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CC BY-NC-SA 4.0
                  </a>
                </div>
              </p>
              <p className="font-medium">Attribution, non-commercial, and sharealike.</p>
            </div>
          </div>

          <Link href="/blog">
            <div className="border rounded cursor-pointer flex border-gray-400/30 -mx-4 mt-4 p-4 items-center justify-between hover:(bg-light-200 opacity-80) dark:hover:bg-dark-700 ">
              <span>cd /blog</span>
              <ArrowLeft />
            </div>
          </Link>

          <div id="comments" className="border rounded border-gray-400/30 -mx-4 mt-4 p-4">
            <Comments />
          </div>
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
