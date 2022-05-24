import type { GetStaticProps, NextPage } from 'next'
import { FiArrowRight, FiMail } from 'react-icons/fi'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { getLatestPost } from '../lib/notion'

const Home: NextPage<{
  latestPost: any
}> = ({ latestPost }) => (
  <>
    <Head>
      <title>Spencer Woo</title>
    </Head>

    <div className="mx-auto max-w-3xl px-6">
      <Image
        className="rounded-full"
        src="/images/avatar.jpg"
        alt="avatar"
        width={120}
        height={120}
        priority
      />

      <h1 className="heading-text my-8 font-serif text-4xl">Spencer Woo</h1>

      <p className="mb-8 leading-7">
        Developer / Designer / Writer /{' '}
        <a
          href="https://genshin-impact.fandom.com/wiki/Hu_Tao"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-links"
        >
          <abbr title="🔥 C6 by the way" className="!no-underline">
            #HuTao
          </abbr>
        </a>{' '}
        main
      </p>

      <p className="leading-7">
        PhD student at{' '}
        <a
          href="https://cst.bit.edu.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-links"
        >
          🎓 BIT
        </a>{' '}
        on cryptography, AI security, and adversarial attacks. Graduated from{' '}
        <a
          href="https://gla.ac.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-links"
        >
          🇬🇧 UofG
        </a>{' '}
        with distinction (MSc, 2022). Graduated from{' '}
        <a
          href="https://cs.bit.edu.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-links"
        >
          🇨🇳 BIT
        </a>{' '}
        (BSc, 2020).
      </p>

      <p className="mt-8 leading-7">
        For projects and socials, check out:{' '}
        <Link href="/projectsnsocials">
          <a className="group inline-flex flex-wrap items-center">
            <span className="hover-links">📚 Projects & Socials</span>
            <FiArrowRight className="h-4 w-4 transition-all duration-100 group-hover:translate-x-1" />
          </a>
        </Link>
      </p>

      <p className="leading-7">
        Latest post:{' '}
        <Link
          href={`/blog/${latestPost.properties.slug.rich_text[0].text.content}`}
        >
          <a className="group inline-flex flex-wrap items-center">
            <span className="hover-links">
              {latestPost.icon?.emoji || '📚'}{' '}
              {latestPost.properties.name.title[0].text.content}
            </span>
            <FiArrowRight className="h-4 w-4 transition-all duration-100 group-hover:translate-x-1" />
          </a>
        </Link>
      </p>

      <p className="mt-8 leading-7">
        Most of my work can be found on{' '}
        <a
          href="https://github.com/spencerwooo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <p className="leading-7">
        <FiMail size={15} className="mr-2 inline" />
        <a href="mailto:spencer.wushangbo@gmail.com" className="hover-links">
          spencer.wushangbo#gmail.com
        </a>
      </p>
    </div>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const latestPost = await getLatestPost()

  return {
    props: { latestPost },
    revalidate: 60 * 10, // 10 minutes
  }
}

export default Home
