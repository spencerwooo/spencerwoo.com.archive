import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'

import Comments from '../components/Comments'
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
      <div className="flex items-center justify-between hover:opacity-80">
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
      </div>
    </a>
  )
}

const Links: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spencer Woo - Friends</title>
      </Head>

      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="heading-text mb-8 font-serif text-4xl">Friends</h1>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {friends.map((friend: FriendProps) => (
            <FriendCard key={friend.id} {...friend} />
          ))}
        </div>

        <p className="secondary-text my-8 text-center">
          👇 Leave your comments down below 👇
        </p>

        <Comments />
      </div>

      <div className="flex-1" />
    </>
  )
}

export default Links
