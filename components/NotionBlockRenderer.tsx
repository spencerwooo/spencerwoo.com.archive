import { Fragment } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { slugify } from 'transliteration'
import Latex from 'react-latex-next'

import { Text } from './blocks/NotionTextBlock'
import Bookmark from './blocks/NotionBookmark'
import NotionImage, { getMediaCtx } from './blocks/NotionImage'

export function renderNotionBlock(block: any) {
  const { type, id } = block
  const value = block[type]

  try {
    switch (type) {
      case 'paragraph':
        return (
          <p>
            <Text text={value.rich_text} />
          </p>
        )

      case 'heading_1':
        return (
          <h1 id={slugify(value.rich_text[0].plain_text)} className="font-serif">
            {value.rich_text[0].plain_text}
          </h1>
        )

      case 'heading_2':
        return (
          <h2 id={slugify(value.rich_text[0].plain_text)} className="font-serif">
            {value.rich_text[0].plain_text}
          </h2>
        )

      case 'heading_3':
        return (
          <h3 id={slugify(value.rich_text[0].plain_text)} className="font-serif">
            {value.rich_text[0].plain_text}
          </h3>
        )

      case 'bulleted_list_item':
        return (
          <ul>
            <li>
              <Text text={value.rich_text} />
            </li>
          </ul>
        )

      case 'numbered_list_item':
        return (
          <ol>
            <li>
              <Text text={value.rich_text} />
            </li>
          </ol>
        )

      case 'to_do':
        return (
          <div>
            <label htmlFor={id}>
              <input type="checkbox" id={id} defaultChecked={value.checked} /> <Text text={value.rich_text} />
            </label>
          </div>
        )

      case 'toggle':
        return (
          <details>
            <summary>
              <Text text={value.rich_text} />
            </summary>
            {value.children?.map((block: any) => (
              <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
            ))}
          </details>
        )

      case 'child_page':
        return <p>{value.title}</p>

      case 'image':
        return <NotionImage value={value} />

      case 'video':
        const { src: videoSrc, caption: videoCaption } = getMediaCtx(value)
        return (
          <figure>
            <video src={videoSrc} controls />
            <figcaption className="text-center">{videoCaption}</figcaption>
          </figure>
        )

      case 'divider':
        return <p className="font-mono text-center py-2 tracking-[1em]">...</p>

      case 'quote':
        return (
          <p className="rounded bg-light-300 p-4 border-l-2 dark:bg-dark-600">
            <Text text={value.rich_text} />
          </p>
        )

      case 'callout':
        return (
          <p className="rounded bg-light-300 border-l-2 p-4 dark:bg-dark-600">
            <span className="mr-2">{value.icon?.emoji || '🌟'}</span>
            <Text text={value.rich_text} />
          </p>
        )

      case 'bookmark':
        return <Bookmark value={value} />

      case 'code':
        return (
          <SyntaxHighlighter language={value.language} style={nord}>
            {value.rich_text[0].plain_text}
          </SyntaxHighlighter>
        )

      case 'equation':
        return <Latex>{`\\[${value.expression}\\]`}</Latex>

      default:
        return <p>`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`</p>
    }
  } catch (error) {
    console.error(error)
    return <p>{JSON.stringify(value)}</p>
  }
}
