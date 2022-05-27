import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'

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
        <meta name="description" content="Spencer Woo" />
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
          <Link
            key={post.id}
            href={`/blog/${post.properties.slug.rich_text[0].text.content}`}
            passHref
          >
            <a className="mb-4 border border-gray-400/30 cursor-pointer rounded block hover:opacity-80">
              <div className="relative heading-text p-4 text-lg bg-white border-b border-gray-400/30 dark:bg-dark-900">
                {post.properties.name.title[0].text.content}
                <span className="absolute right-4 -bottom-4 text-2xl">
                  {post.icon?.emoji || '📚'}
                </span>
              </div>

              <div className="bg-light-300 p-4 dark:bg-dark-700">
                <div className="primary-text text-sm truncate">
                  {post.properties.preview.rich_text[0].text.content}
                </div>

                <div className="secondary-text flex flex-wrap items-center space-x-2 text-sm">
                  <span>
                    {new Date(
                      post.properties.date.date.start
                    ).toLocaleDateString()}
                  </span>
                  <span>·</span>
                  {post.properties.author.people.map((person: any) => (
                    <span key={person.id}>{person.name?.toLowerCase()}</span>
                  ))}
                  <span>·</span>
                  <span>{post.properties.tag.select.name?.toLowerCase()}</span>
                </div>
              </div>
            </a>
          </Link>
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
