import type { UserInfo } from '@genshin-kit/core/lib/types'
import type { GetStaticProps, NextPage } from 'next'
import { FiExternalLink } from 'react-icons/fi'
import { GiChest } from 'react-icons/gi'
import useSWR from 'swr'

import Head from 'next/head'
import Image from 'next/image'

import { LinkProps, socialLinks } from '../config/link'
import { ProjectProps, projectLinks } from '../config/project'
import getGenshinUserInfo from '../lib/genshin'

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

const GenshinCardStat = ({
  stat,
  name,
}: {
  stat: number | string
  name: string
}) => (
  <div>
    <div className="font-bold text-xl sm:text-3xl font-mono">{stat}</div>
    <div className="opacity-80 text-xs uppercase tracking-wider">{name}</div>
  </div>
)

const ProjectsNSocials: NextPage<{ genshinUserInfo: UserInfo }> = ({
  genshinUserInfo,
}) => {
  const randomGenshinBackground = () =>
    `/images/genshin/${Math.floor(Math.random() * 19) + 1}.jpg`

  const stats = genshinUserInfo.stats
  const exploration = genshinUserInfo.world_explorations.map(
    (a) => a.exploration_percentage
  )
  const worldExploationPercentage =
    exploration.reduce((sum, val) => sum + val) / exploration.length

  return (
    <>
      <Head>
        <title>Spencer Woo - Projects & Socials</title>
      </Head>

      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="heading-text mb-8 font-serif text-4xl">
          Genshin Impact
        </h1>

        <div className="relative shadow p-4 rounded overflow-hidden text-white">
          <div className="flex justify-between">
            <div>
              <div className="text-2xl">阿巴阿巴 Lv.58</div>
              <div className="font-mono text-sm font-bold opacity-80">
                UID: 168305666
              </div>
            </div>

            <div className="text-right text-xs tracking-wider">
              <div className="opacity-60 uppercase">Server 天空岛</div>
              <div className="font-mono mt-2 items-center space-x-1 hidden sm:flex">
                <GiChest className="inline text-orange-500" />
                <span>{stats.luxurious_chest_number}</span>
                <GiChest className="inline text-orange-400" />
                <span>{stats.exquisite_chest_number}</span>
                <GiChest className="inline text-orange-300" />
                <span>{stats.precious_chest_number}</span>
                <GiChest className="inline text-orange-200" />
                <span>{stats.common_chest_number}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-6">
            <GenshinCardStat
              stat={stats.active_day_number}
              name={'Active days'}
            />
            <GenshinCardStat stat={stats.avatar_number} name={'Characters'} />
            <GenshinCardStat
              stat={stats.achievement_number}
              name={'Achievements'}
            />
            <GenshinCardStat stat={stats.spiral_abyss} name={'Spiral Abyss'} />
            <GenshinCardStat
              stat={`${Math.round(worldExploationPercentage / 10)}%`}
              name={'Exploration'}
            />
          </div>

          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-10 bg-gradient-to-b from-white/20 via-white/0 to-white/40 dark:from-gray-800/20 dark:via-gray-800/40 dark:to-gray-800/40" />

          <div className="absolute top-0 left-0 right-0 bottom-0 -z-20">
            <Image
              src={randomGenshinBackground()}
              alt="Genshin Background"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 60%"
            />
          </div>
        </div>

        <h1 className="heading-text my-8 font-serif text-4xl">Projects</h1>

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
      </div>

      <div className="flex-1" />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const genshinUserInfo = await getGenshinUserInfo()
  return {
    props: { genshinUserInfo },
    revalidate: 86400, // 24 hours
  }
}

export default ProjectsNSocials
