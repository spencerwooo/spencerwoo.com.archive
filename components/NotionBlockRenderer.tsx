import { Fragment } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Latex from 'react-latex-next'
import { Link as LinkIcon } from 'react-feather'

import Link from 'next/link'

import { Text } from './NotionTextBlock'

export function renderNotionBlock(block: any) {
  const { type, id } = block
  const value = block[type]

  const getMediaCtx = (value: any) => {
    const src = value.type === 'external' ? value.external.url : value.file.url
    const expire = value.type === 'file' ? value.file.expiry_time : null
    const caption = value.caption[0] ? value.caption[0].plain_text : ''
    return { src, caption, expire }
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
      const { src: imageSrc, caption: imageCaption, expire: imageExpiryTime } = getMediaCtx(value)
      return (
        <figure className="my-2 relative">
          <img src={imageSrc} alt={imageCaption} />
          <p className="font-mono bg-black/10 text-sm p-2 top-0 left-0 text-white/50 absolute hover:text-white">
            {imageExpiryTime ? new Date(imageExpiryTime).toLocaleString() : ''}
          </p>
          {imageCaption && (
            <figcaption>
              <p className="my-2 text-center opacity-80">{imageCaption}</p>
            </figcaption>
          )}
        </figure>
      )
    case 'video':
      const { src: videoSrc, caption: videoCaption, expire: videoExpiryTime } = getMediaCtx(value)
      return (
        <div className="rounded my-2 overflow-hidden">
          <video src={videoSrc} controls />
          <p className="my-2 text-center opacity-80">{videoCaption}</p>
          <p>{videoExpiryTime ? new Date(videoExpiryTime).toLocaleString() : ''}</p>
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
          <p className="rounded overflow-x-scroll cursor-pointer flex font-mono space-x-4 my-2 -mx-2 p-2 items-center hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
            <LinkIcon className="flex-shrink-0" size={18} />
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
