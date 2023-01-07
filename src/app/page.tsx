'use client'

import Image, { StaticImageData } from 'next/image'
import type { IconType } from 'react-icons'

import { FaCompass, FaGamepad, FaGraduationCap } from 'react-icons/fa'
import bit from '../assets/bit.png'
import uofg from '../assets/uofg.png'

import { RiGithubLine, RiMailLine, RiTwitterLine, RiWeiboLine } from 'react-icons/ri'

const whereaboutsData = [
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

function WhereaboutsCard(props: { name: string; link: string; icon: IconType }) {
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

function EduCard({
  name,
  major,
  img,
  year,
  link,
}: {
  name: string
  major: string
  img: StaticImageData
  year: string
  link: string
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-all duration-150">
      <p className="font-medium text-sm opacity-90 leading-8">{major}</p>
      <p className="text-xs opacity-80">
        {name} · {year}
      </p>
    </a>
  )
}

export default function Page() {
  return (
    <>
      <section>
        <p className="font-medium leading-8 opacity-90">PhD student in AI Security</p>
        <p className="mt-1 text-xs opacity-80">Beijing Institute of Technology · 2022 - present</p>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7">
          <FaGraduationCap size={16} />
          <span className="ml-2.5">Previously</span>
        </h2>

        <div className="mt-4 space-y-2">
          <EduCard
            name="University of Glasgow"
            major="MSc. Computing Science"
            img={uofg}
            year="2021-2022"
            link="https://www.gla.ac.uk/"
          />
          <EduCard
            name="Beijing Institute of Technology"
            major="BSc. Computer Science"
            img={bit}
            year="2016-2020"
            link="https://www.bit.edu.cn/"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7">
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
        <h2 className="flex items-center text-sm font-medium leading-7">
          <FaCompass size={16} />
          <span className="ml-2.5">Whereabouts</span>
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {whereaboutsData.map((item) => (
            <WhereaboutsCard key={item.name} name={item.name} link={item.link} icon={item.icon} />
          ))}
        </div>
      </section>
    </>
  )
}
