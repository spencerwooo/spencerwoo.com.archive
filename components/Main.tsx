import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'react-feather'

const Main = () => {
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
        (BSc, 2020). For projects and socials, check out:{' '}
        <Link href="/links">
          <a className="hover-links">📚 Links</a>
        </Link>
        .
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
