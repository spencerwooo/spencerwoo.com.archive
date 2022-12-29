import Image from 'next/image'
import type { IconType } from 'react-icons'
import { FaCompass, FaGamepad, FaGraduationCap } from 'react-icons/fa'
import { RiGithubLine, RiMailLine, RiTwitterLine, RiWeiboLine } from 'react-icons/ri'
import bit from '../public/bit.png'
import icon from '../public/icon.jpg'
import uofg from '../public/uofg.png'

const sidebarCardData = [
  {
    name: '/spencerwooo',
    link: 'https://github.com/spencerwooo',
    icon: RiGithubLine,
  },
  {
    name: '/realSpencerWoo',
    link: 'https://twitter.com/realSpencerWoo',
    icon: RiTwitterLine,
  },
  {
    name: '/SpencerWoo',
    link: 'https://weibo.com/u/6265807914',
    icon: RiWeiboLine,
  },
  {
    name: '-> mailto',
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
      className="flex items-center justify-between -m-1.5 p-1.5 hover:bg-slate-200 rounded transition-all duration-150"
    >
      <span className="font-mono text-sm hidden lg:block">{props.name}</span>
      <props.icon />
    </a>
  )
}

const Sidebar = () => {
  return (
    <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8">
      <div className="relative mx-auto block w-[12rem] overflow-hidden rounded-lg shadow-xl shadow-slate-200 sm:w-[16rem] sm:rounded-xl lg:w-auto lg:rounded-2xl">
        <Image src={icon} alt="icon" />
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"></div>
      </div>

      <div className="mt-10 text-center lg:mt-16 lg:text-left">
        <p className="text-xl font-bold text-slate-900">Spencer Woo</p>
        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">PhD student in AI Security</p>
        <p className="mt-3 text-xs text-slate-500">
          Beijing Institute of Technology
          <br />
          2022 - present
        </p>

        <section className="mt-16 hidden lg:block">
          <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
            <FaGraduationCap size={16} />
            <span className="ml-2.5">Previously</span>
          </h2>

          <div className="mt-2">
            <div className="flex items-center mt-4">
              <Image src={uofg} alt="university of glasgow" className="w-9 mx-1.5" />
              <div className="ml-2.5">
                <p className="text-xs text-slate-500">University of Glasgow</p>
                <p className="text-sm">MSc. Computing Science</p>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <Image src={bit} alt="beijing institute of technology" className="w-12" />
              <div className="ml-2.5">
                <p className="text-xs text-slate-500">Beijing Institute of Technology</p>
                <p className="text-sm">BSc. Computer Science</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 hidden lg:block">
          <h2 className="flex items-center text-sm font-medium leading-7 text-slate-900">
            <FaGamepad />
            <span className="ml-2.5">Genshin Impact</span>
          </h2>
          <p className="mt-4 flex items-center justify-between">
            <span className="font-mono text-sm">UID 168305666</span>
            <span className="px-1 py-0.5 rounded bg-gradient-to-tr from-amber-400 via-pink-400 to-blue-500 text-white text-xs font-bold">
              AR 60
            </span>
          </p>
        </section>

        <section className="lg:mt-16">
          <h2 className="items-center text-sm font-medium leading-7 text-slate-900 hidden lg:flex">
            <FaCompass size={16} />
            <span className="ml-2.5">Whereabouts</span>
          </h2>

          <ul className="mt-2 lg:block flex items-center justify-center space-x-8 lg:space-x-0">
            {sidebarCardData.map((item) => (
              <li key={item.name} className="mt-4 inline lg:block">
                <SidebarCard name={item.name} link={item.link} icon={item.icon} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Sidebar
