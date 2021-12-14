import { FC } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projectLinks, ProjectProps } from '../config/project'

const ProjectCard: FC<ProjectProps> = props => {
  return (
    <a
      href={props.link}
      className="border-none rounded bg-light-100 p-4 dark:bg-dark-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 transition-all duration-100 hover:text-gray-500">
        <props.icon size={24} className="flex-shrink-0" />
        <div>
          <div className="font-bold">{props.name}</div>
          <div className="font-mono text-sm truncate">{props.slug}</div>
        </div>
      </div>
    </a>
  )
}

const Projects: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spencer Woo - Projects</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex flex-col h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 dark:text-light-900">Projects</h1>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {projectLinks.map((project: ProjectProps) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Projects
