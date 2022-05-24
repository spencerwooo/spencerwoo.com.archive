import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'

import { getDatabase } from '../lib/notion'

type BlogPosts = QueryDatabaseResponse['results']

const Blog: NextPage<{ posts: BlogPosts }> = ({ posts }) => {
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
            <a className="-mx-2 mb-6 cursor-pointer rounded block p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
              <h2 className="heading-text mb-2 flex justify-between space-x-2 text-lg">
                <span>{post.properties.name.title[0].text.content}</span>
                <span>{post.icon?.emoji || '📚'}</span>
              </h2>

              <p className="primary-text text-sm">
                {post.properties.preview.rich_text[0].text.content}
              </p>

              <div className="secondary-text flex flex-wrap items-center space-x-2 text-sm">
                <span>{post.properties.date.date.start}</span>
                <span>·</span>
                {post.properties.author.people.map((person: any) => (
                  <span key={person.id}>{person.name?.toLowerCase()}</span>
                ))}
                <span>·</span>
                <span>{post.properties.tag.select.name?.toLowerCase()}</span>
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
