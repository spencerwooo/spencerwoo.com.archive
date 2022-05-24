import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiMenu, FiRss } from 'react-icons/fi'

import Link from 'next/link'

import Toggle from './DarkToggle'

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
  {
    name: 'Friends',
    link: '/friends',
  },
]

const MenuItemLink = (props: {
  [x: string]: any
  href: any
  children: any
}) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

const Navbar = () => {
  return (
    <header className="primary-text z-10 flex items-center justify-between p-4">
      <Link href="/" passHref>
        <a className="nav-links">Spencer</a>
      </Link>
      <div className="flex items-center space-x-4">
        <nav className="hidden items-center space-x-2 sm:flex">
          {navigations.map((n, i) => (
            <Link href={n.link} key={i} passHref>
              <a className="nav-links">{n.name}</a>
            </Link>
          ))}
        </nav>

        <div className="block sm:hidden">
          <Menu as="div" className="relative text-left">
            <Menu.Button className="flex items-center text-current">
              <FiMenu size={20} />
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
              <Menu.Items className="mobile-menu absolute right-0 mt-2 w-32 origin-top-right rounded bg-white shadow-lg ring-0 dark:bg-dark-700">
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

        <a
          href="/feed"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-links"
        >
          <FiRss size={20} />
        </a>
        <Toggle />
      </div>
    </header>
  )
}

export default Navbar
