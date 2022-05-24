import type { NextPage } from 'next'
import { FiExternalLink } from 'react-icons/fi'
import useSWR from 'swr'

import Head from 'next/head'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { LinkProps, socialLinks } from '../config/link'
import { ProjectProps, projectLinks } from '../config/project'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const LinkFollowerText = ({
  apiUrl,
  followerName,
}: {
  apiUrl: string
  followerName: string
}) => {
  const { data, error } = useSWR(apiUrl, fetcher)

  if (error) return <div className="font-mono text-sm">failed to load</div>
  if (!data) return <div className="font-mono text-sm">loading...</div>
  return (
    <div className="font-mono text-sm">
      {data.count} {followerName}
    </div>
  )
}

const LinkCard = (props: LinkProps) => {
  const pronoun = props.followerName ? props.followerName : 'followers'

  return (
    <a
      className="relative overflow-hidden rounded border-b-0 border-l-4 bg-light-300 p-4 dark:bg-dark-700"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderLeftColor: props.color }}
    >
      <div className="flex items-center justify-between hover:opacity-80">
        <div>
          <div className="font-bold">{props.name}</div>
          <LinkFollowerText apiUrl={props.apiUrl} followerName={pronoun} />
        </div>
        {props.icon ? (
          <props.icon size={18} className="opacity-70" />
        ) : (
          <FiExternalLink size={18} className="opacity-70" />
        )}
      </div>
    </a>
  )
}

const ProjectCard = (props: ProjectProps) => {
  return (
    <a
      href={props.link}
      className="rounded border-b-0 border-l-4 bg-light-300 p-4 dark:bg-dark-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="primary-text flex items-center justify-between space-x-4 transition-all duration-100 hover:opacity-80">
        <div className="truncate">
          <div className="font-bold">{props.name}</div>
          <div className="font-mono text-sm">{props.slug}</div>
        </div>
        <props.icon size={24} className="flex-shrink-0" />
      </div>
    </a>
  )
}

const Links: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spencer Woo - Links</title>
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
          <h1 className="heading-text mb-8 font-serif text-4xl">Projects</h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projectLinks.map((project: ProjectProps) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          <h1 className="heading-text my-8 font-serif text-4xl">Socials</h1>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {socialLinks.map((link: LinkProps) => (
              <LinkCard key={link.name} {...link} />
            ))}
          </div>

          <p className="secondary-text text-center font-mono text-xs">
            Powered by{' '}
            <a
              href="https://github.com/spencerwooo/substats"
              target="_blank"
              rel="noopener noreferrer"
            >
              substats
            </a>
            .
          </p>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Links
