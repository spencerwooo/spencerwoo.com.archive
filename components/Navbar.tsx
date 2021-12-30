import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Menu as MenuIcon, Rss } from 'react-feather'
import { Fragment } from 'react'
// import Toggle from './DarkToggle'

const navigations = [
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Publication',
    link: '/publication',
  },
  {
    name: 'Links',
    link: '/links',
  },
]

const MenuItemLink = (props: { [x: string]: any; href: any; children: any }) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest} className="dark:border-b-gray-700 hover:border-b-gray-500">
        {children}
      </a>
    </Link>
  )
}

const Navbar = () => {
  return (
    <header className="flex p-6 text-gray-500 z-50 items-center justify-between dark:text-gray-400">
      <Link href="/">
        <a href="/" className="dark:border-b-gray-700 hover:border-b-gray-500">
          Spencer
        </a>
      </Link>
      <div className="flex space-x-4 items-center">
        <nav className="flex space-x-4 items-center hidden sm:block">
          {navigations.map((n, i) => (
            <Link href={n.link} key={i}>
              <a href={n.link} className="dark:border-b-gray-700 hover:border-b-gray-500">
                {n.name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="block sm:hidden">
          <Menu as="div" className="text-left relative">
            <Menu.Button className="flex text-current items-center">
              <MenuIcon size={20} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="bg-white rounded shadow-lg mt-2 origin-top-right right-0 shadow-gray-600 ring-0 w-32 absolute mobile-menu dark:(bg-dark-700)">
                {navigations.map((n, i) => (
                  <div className="p-2" key={i}>
                    <Menu.Item>
                      <MenuItemLink href={n.link}>{n.name}</MenuItemLink>
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div
          onClick={() => {
            window.open('/feed')
          }}
          className="cursor-pointer inline-flex items-center hover:text-gray-500"
        >
          <Rss size={20} />
        </div>
        {/* <Toggle /> */}
      </div>
    </header>
  )
}

export default Navbar
