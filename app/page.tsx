'use client'

import Image, { StaticImageData } from 'next/image'
import type { IconType } from 'react-icons'

import { FaCompass, FaGamepad, FaGraduationCap } from 'react-icons/fa'
import bit from '../public/bit.png'
import uofg from '../public/uofg.png'

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
  bgColor,
}: {
  name: string
  major: string
  img: StaticImageData
  year: string
  link: string
  bgColor: string
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-4 rounded-lg overflow-hidden flex items-center justify-between text-white hover:opacity-90 transition-all duration-150"
      style={{ backgroundColor: bgColor }}
    >
      <Image src={img} alt={name} className="w-24 absolute right-3 -top-2 blur" />
      <div>
        <p className="text-xs text-slate-300 tracking-wider">{name}</p>
        <p className="text-sm">{major}</p>
        <p className="font-bold italic mt-3 text-lg">{year}</p>
      </div>
      <Image src={img} alt={name} className="w-auto h-12 z-10" />
    </a>
  )
}

export default function Page() {
  return (
    <>
      <section className="text-center">
        <p className="font-medium leading-8 text-slate-700">PhD student in AI Security</p>
        <p className="mt-1 text-xs text-slate-500">Beijing Institute of Technology · 2022 - present</p>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
          <FaGraduationCap size={16} />
          <span className="ml-2.5">Previously</span>
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <EduCard
            name="University of Glasgow"
            major="MSc. Computing Science"
            img={uofg}
            year="2021-2022"
            link="https://www.gla.ac.uk/"
            bgColor="#042F55"
          />
          <EduCard
            name="Beijing Institute of Technology"
            major="BSc. Computer Science"
            img={bit}
            year="2016-2020"
            link="https://www.bit.edu.cn/"
            bgColor="#0A512E"
          />
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
          {whereaboutsData.map((item) => (
            <WhereaboutsCard key={item.name} name={item.name} link={item.link} icon={item.icon} />
          ))}
        </div>
      </section>
    </>
  )
}
