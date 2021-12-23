import type { NextPage } from 'next'

import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'

const Post: NextPage<{}> = () => {
  const router = useRouter()
  const { slug } = router.query
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

      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 dark:text-light-900">Blog</h1>

          <p className="mb-4">
            🚧 Migrating from{' '}
            <a href="https://blog.spencerwoo.com" target="_blank" rel="noopener noreferrer">
              blog.spencerwoo.com
            </a>{' '}
            ...
          </p>

          <div className="font-mono border border-gray-400/20 rounded p-2 mb-4 text-sm bg-gray-50 dark:bg-gray-800">
            {slug}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Post
