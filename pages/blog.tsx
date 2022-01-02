import type { GetStaticProps, NextPage } from 'next'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { getDatabase } from '../lib/notion'

type BlogPosts = QueryDatabaseResponse['results']

const Blog: NextPage<{ posts: BlogPosts }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Spencer Woo - Blog</title>
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
          <h1 className="font-bold text-xl mb-8 dark:text-light-900">Blog</h1>
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.properties.slug.rich_text[0].text.content}`}>
              <div className="border-none rounded cursor-pointer -mx-2 mb-2 p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
                <h2 className="flex space-x-2 text-lg mb-2 justify-between dark:text-gray-200">
                  <span>{post.properties.name.title[0].text.content}</span>
                  <span>{post.icon.emoji}</span>
                </h2>

                <p className="text-sm text-gray-500">{post.properties.preview.rich_text[0].text.content}</p>

                <div className="flex flex-wrap space-x-2 text-sm text-gray-500 items-center">
                  <span>{post.properties.date.date.start}</span>
                  <span>·</span>
                  {post.properties.author.people.map((person: { name: string }) => (
                    <span key={person.name}>{person.name.toLowerCase()}</span>
                  ))}
                  <span>·</span>
                  <span>{post.properties.tag.select.name.toLowerCase()}</span>
                </div>
              </div>
            </Link>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await getDatabase()
  return {
    props: {
      posts: db,
    },
    revalidate: 1,
  }
}

export default Blog
