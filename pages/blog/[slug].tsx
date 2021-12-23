import type { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Latex from 'react-latex-next'
import { Link as LinkIcon } from 'react-feather'

import Head from 'next/head'
import Link from 'next/link'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getDatabase, getPage, getBlocks } from '../../lib/notion'

const Text = ({ text }: { text: any }) => {
  if (!text) {
    return null
  }
  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        className={[
          bold ? 'font-bold' : '',
          code ? 'font-mono text-sm px-1 bg-light-300 dark:bg-dark-800 rounded' : '',
          italic ? 'italic' : '',
          strikethrough ? 'strike' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} target="_blank" rel="noopener noreferrer">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

const renderNotionBlock = (block: any) => {
  const { type, id } = block
  const value = block[type]

  const getMediaCtx = (value: any) => {
    const src = value.type === 'external' ? value.external.url : value.file.url
    const caption = value.caption[0] ? value.caption[0].plain_text : ''
    return { src, caption }
  }

  switch (type) {
    case 'paragraph':
      return (
        <p className="my-2">
          <Text text={value.text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1 className="mt-4 mb-2 text-2xl leading-7">
          <Text text={value.text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="mt-4 text-xl mb-2 leading-7">
          <Text text={value.text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className="my-2 text-lg leading-7">
          <Text text={value.text} />
        </h3>
      )
    case 'bulleted_list_item':
      return (
        <ul className="list-disc list-inside my-2">
          <li>
            <Text text={value.text} />
          </li>
        </ul>
      )
    case 'numbered_list_item':
      return (
        <ol className="list-decimal list-inside my-2">
          <li>
            <Text text={value.text} />
          </li>
        </ol>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <Text text={value.text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p className="my-2">{value.title}</p>
    case 'image':
      const { src: imageSrc, caption: imageCaption } = getMediaCtx(value)
      return (
        <figure className="my-2">
          <img src={imageSrc} alt={imageCaption} className="rounded overflow-hidden" />
          {imageCaption && (
            <figcaption>
              <p className="my-2 text-center opacity-80">{imageCaption}</p>
            </figcaption>
          )}
        </figure>
      )
    case 'video':
      const { src: videoSrc, caption: videoCaption } = getMediaCtx(value)
      return (
        <div className="rounded my-2 overflow-hidden">
          <video src={videoSrc} controls />
          <p className="my-2 text-center opacity-80">{videoCaption}</p>
        </div>
      )
    case 'divider':
      return <p className="font-mono text-center py-2 tracking-[1em]">...</p>
    case 'quote':
      return (
        <p className="rounded bg-light-300 border-l-2 my-2 p-2 pl-4 dark:bg-dark-600">
          <Text text={value.text} />
        </p>
      )
    case 'callout':
      return (
        <p className="rounded flex space-x-2 bg-light-300 border-l-2 my-2 p-2 pl-4 dark:bg-dark-600">
          <span>{value.icon.emoji}</span>
          <div>
            <Text text={value.text} />
          </div>
        </p>
      )
    case 'bookmark':
      return (
        <Link href={value.url}>
          <p className="rounded cursor-pointer flex font-mono space-x-4 my-2 -mx-2 p-2 items-center hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
            <LinkIcon size={18} />
            <span>{value.url}</span>
          </p>
        </Link>
      )
    case 'code':
      return (
        <div className="my-2 relative">
          <span className="rounded font-mono bg-white/10 opacity-50 p-2 top-0 right-0 text-light-50 absolute">
            {value.language}
          </span>
          <pre className="rounded font-mono text-sm overflow-hidden">
            <SyntaxHighlighter language={value.language} style={nord}>
              {value.text[0].plain_text}
            </SyntaxHighlighter>
          </pre>
        </div>
      )
    case 'equation':
      return <Latex>{`\\[${value.expression}\\]`}</Latex>
    default:
      return <p>`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`</p>
  }
}

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

      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="flex font-bold text-xl mb-2 justify-between dark:text-light-900">
            <span>{page.properties.name.title[0].plain_text}</span>
            <span>{page.icon.emoji}</span>
          </h1>
          <div className="flex space-x-2 mb-8 text-gray-500 items-center">
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

          <Link href="/blog">
            <p className="border-none rounded cursor-pointer font-mono -mx-2 mt-8 text-sm mb-2 p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
              cd /blog
            </p>
          </Link>
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
    fallback: true,
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

  return { props: { page, blocks: blocksWithChildren }, revalidate: 1 }
}

export default Post
