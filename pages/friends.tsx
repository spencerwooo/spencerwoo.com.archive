import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import Comments from '../components/Comments'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { FriendProps, friends } from '../config/friend'

const FriendCard = (props: FriendProps) => {
  return (
    <a
      className="relative overflow-hidden rounded border-b-0 border-l-4 bg-light-300 p-4 dark:bg-dark-700"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderLeftColor: props.bgColor,
      }}
    >
      <p className="flex items-center justify-between hover:opacity-80">
        <div>
          <div className="font-serif text-lg">{props.id}</div>
          <div className="secondary-text text-sm">{props.link}</div>
        </div>
        <Image
          src={props.avatar}
          width={32}
          height={32}
          alt={props.link}
          className="rounded-full"
        />
      </p>
    </a>
  )
}

const Links: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spencer Woo - Friends</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <div className="flex min-h-screen flex-col dark:bg-dark-900">
        <Navbar />
        <main className="container mx-auto flex max-w-3xl flex-1 flex-col px-6">
          <h1 className="heading-text mb-8 font-serif text-4xl">Friends</h1>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {friends.map((friend: FriendProps) => (
              <FriendCard key={friend.id} {...friend} />
            ))}
          </div>

          <p className="secondary-text my-8 text-center">
            👇 Leave your comments down below 👇
          </p>

          <div className="mx-4">
            <Comments />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Links
