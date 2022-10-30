'use client'

import Image from 'next/image'
import type { IconType } from 'react-icons'

import { FaCompass, FaGamepad, FaGraduationCap } from 'react-icons/fa'
import bit from '../public/bit.png'
import uofg from '../public/uofg.png'

import {
  RiGithubLine,
  RiMailLine,
  RiTwitterLine,
  RiWeiboLine,
} from 'react-icons/ri'
const sidebarCardData = [
  {
    name: '@spencerwooo',
    link: 'https://github.com/spencerwooo',
    icon: RiGithubLine,
  },
  {
    name: '@realSpencerWoo',
    link: 'https://twitter.com/realSpencerWoo',
    icon: RiTwitterLine,
  },
  {
    name: '@SpencerWoo',
    link: 'https://weibo.com/u/6265807914',
    icon: RiWeiboLine,
  },
  {
    name: '@mailto',
    link: 'mailto:spencer.wushangbo@gmail.com',
    icon: RiMailLine,
  },
]

const SidebarCard = (props: { name: string; link: string; icon: IconType }) => {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between hover:opacity-60 rounded transition-all duration-150"
    >
      <span className="font-mono text-sm">{props.name}</span>
      <props.icon />
    </a>
  )
}

export default function Page() {
  return (
    <>
      <section className="text-center">
        <p className="font-medium leading-8 text-slate-700">
          PhD student in AI Security
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Beijing Institute of Technology · 2022 - present
        </p>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
          <FaGraduationCap size={16} />
          <span className="ml-2.5">Previously</span>
        </h2>

        <div className="mt-2 grid grid-cols-2">
          <div className="flex items-center mt-4">
            <Image
              src={uofg}
              alt="university of glasgow"
              className="w-9 mx-1.5"
            />
            <div className="ml-2.5">
              <p className="text-xs text-slate-500">University of Glasgow</p>
              <p className="text-sm">MSc. Computing Science</p>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <Image
              src={bit}
              alt="beijing institute of technology"
              className="w-12"
            />
            <div className="ml-2.5">
              <p className="text-xs text-slate-500">
                Beijing Institute of Technology
              </p>
              <p className="text-sm">BSc. Computer Science</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
          <FaGamepad />
          <span className="ml-2.5">Genshin Impact</span>
        </h2>
        <p className="mt-4 flex items-center justify-between">
          <span>UID 168305666</span>
          <span className="px-1 py-0.5 rounded bg-gradient-to-tr from-amber-400 via-pink-400 to-blue-500 text-white text-xs font-bold">
            AR 60
          </span>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
          <FaCompass size={16} />
          <span className="ml-2.5">Whereabouts</span>
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {sidebarCardData.map(item => (
            <SidebarCard
              key={item.name}
              name={item.name}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </div>
      </section>
    </>
  )
}
