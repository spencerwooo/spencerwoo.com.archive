import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'

import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spencer Woo</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="h-screen flex flex-col">
        <Navbar />

        <main className="container mx-auto max-w-3xl px-8 flex flex-1 flex-col justify-center">
          <h1 className="font-bold text-xl mb-8">Spencer Woo</h1>

          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Home
