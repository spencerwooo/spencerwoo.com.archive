import type {
  GetPagePropertyResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'

import HoverCard from '../components/HoverCard'
import { type PageCompletePropertyRecord, getDatabase } from '../lib/notion'

const Blog: NextPage<{ posts: PageObjectResponse[] }> = ({ posts }) => {
  // const [searchOpen, setSearchOpen] = useState(false)
  // const openSearchBox = () => setSearchOpen(true)
  const metadata = posts.map((post) => {
    const emoji = post.icon?.type === 'emoji' ? post.icon.emoji : '🎑'
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

    const author = 'results' in prop.author ? prop.author.results : []
    const tag = 'select' in prop.tag ? prop.tag.select : null

    return { id: post.id, emoji, slug, name, preview, date, author, tag }
  })

  return (
    <>
      <Head>
        <title>Spencer Woo - Blog</title>
      </Head>

      {/* <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} /> */}

      <div className="mx-auto max-w-3xl container px-6">
        <h1 className="heading-text mb-8 font-serif text-4xl">Blog</h1>
        {/* <h1 className="font-serif text-4xl mb-8 heading-text flex items-center justify-between">
            <span>Blog</span>
            <button className="p-1 cursor-pointer hover:text-gray-500" onClick={openSearchBox}>
              <Search size={20} />
            </button>
          </h1> */}

        {metadata.map((meta) => (
          <HoverCard
            key={meta.id}
            href={`/blog/${meta.slug}`}
            isExternal={false}
            headingSlot={<span className="font-bold text-lg">{meta.name}</span>}
            iconSlot={
              <div className="absolute right-4 -bottom-4 text-2xl">
                {meta.emoji}
              </div>
            }
          >
            <div className="primary-text text-sm truncate">{meta.preview}</div>

            <div className="secondary-text flex flex-wrap items-center space-x-2 text-sm">
              <span>{new Date(meta.date).toLocaleDateString()}</span>
              <span>·</span>
              {meta.author.map((person: any) => (
                <span key={person.id}>
                  {'people' in person && 'name' in person.people
                    ? person.people.name?.toLowerCase()
                    : ''}
                </span>
              ))}
              <span>·</span>
              <span>{meta.tag?.name.toLowerCase()}</span>
            </div>
          </HoverCard>
        ))}
      </div>

      <div className="flex-1" />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await getDatabase()
  return {
    props: { posts: db },
    revalidate: 60 * 10, // 10 minutes
  }
}

export default Blog
