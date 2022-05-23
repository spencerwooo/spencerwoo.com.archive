import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Mail } from 'react-feather'

const Main = ({ latestPost }: { latestPost: any }) => {
  return (
    <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6 justify-center">
      <div className="mb-2">
        <Image
          className="rounded-full transition-all duration-100"
          src="/images/avatar.jpg"
          alt="avatar"
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className="font-serif mb-8 text-4xl heading-text">Spencer Woo</h1>

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
        <a href="https://cst.bit.edu.cn" target="_blank" rel="noopener noreferrer" className="hover-links">
          🎓 BIT
        </a>{' '}
        on cryptography, AI security, and adversarial attacks. Graduated from{' '}
        <a href="https://gla.ac.uk" target="_blank" rel="noopener noreferrer" className="hover-links">
          🇬🇧 UofG
        </a>{' '}
        with distinction (MSc, 2022). Graduated from{' '}
        <a href="https://cs.bit.edu.cn" target="_blank" rel="noopener noreferrer" className="hover-links">
          🇨🇳 BIT
        </a>{' '}
        (BSc, 2020).
      </p>

      <p className="mt-8 leading-7">
        For projects and socials, check out:{' '}
        <Link href="/links">
          <a className="inline-flex flex-wrap items-center group">
            <span className="hover-links">📚 Links</span>
            <ArrowRight className="group-hover:translate-x-1 transition-all duration-100 w-4 h-4" />
          </a>
        </Link>
      </p>

      <p className="leading-7">
        Latest post:{' '}
        <Link href={`/blog/${latestPost.properties.slug.rich_text[0].text.content}`}>
          <a className="inline-flex flex-wrap items-center group">
            <span className="hover-links">
              {latestPost.icon?.emoji || '📚'} {latestPost.properties.name.title[0].text.content}
            </span>
            <ArrowRight className="group-hover:translate-x-1 transition-all duration-100 w-4 h-4" />
          </a>
        </Link>
      </p>

      <p className="mt-8 leading-7">
        Most of my work can be found on{' '}
        <a href="https://github.com/spencerwooo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>

      <p className="leading-7">
        <Mail size={15} className="inline mr-2" />
        <a href="mailto:spencer.wushangbo@gmail.com" className="hover-links">
          spencer.wushangbo#gmail.com
        </a>
      </p>
    </main>
  )
}

export default Main
