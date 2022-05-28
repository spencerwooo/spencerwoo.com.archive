import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'

import HoverCard from '../components/HoverCard'
import { getDatabase } from '../lib/notion'

const Blog: NextPage<{ posts: QueryDatabaseResponse['results'] }> = ({
  posts,
}) => {
  // const [searchOpen, setSearchOpen] = useState(false)
  // const openSearchBox = () => setSearchOpen(true)

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

        {posts.map((post: any) => (
          <HoverCard
            key={post.id}
            href={`/blog/${post.properties.slug.rich_text[0].text.content}`}
            isExternal={false}
            headingSlot={
              <span className="font-bold text-lg">
                {post.properties.name.title[0].text.content}
              </span>
            }
            iconSlot={
              <div className="absolute right-4 -bottom-4 text-2xl">
                {post.icon?.emoji || '📚'}
              </div>
            }
          >
            <div className="primary-text text-sm truncate">
              {post.properties.preview.rich_text[0].text.content}
            </div>

            <div className="secondary-text flex flex-wrap items-center space-x-2 text-sm">
              <span>
                {new Date(post.properties.date.date.start).toLocaleDateString()}
              </span>
              <span>·</span>
              {post.properties.author.people.map((person: any) => (
                <span key={person.id}>{person.name?.toLowerCase()}</span>
              ))}
              <span>·</span>
              <span>{post.properties.tag.select.name?.toLowerCase()}</span>
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
