import Link from 'next/link'

const Nav = () => {
  return (
    <ul className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl] space-y-8">
      <span className="w-1.5 h-1.5 rounded-full bg-green-200"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
      <li>
        <Link href="/">Home</Link>
      </li>
      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
      <li>
        <Link href="/about">Genshin</Link>
      </li>
      <span className="w-1.5 h-1.5 rounded-full bg-pink-600"></span>
      <li>
        <Link href="/papers">Papers</Link>
      </li>
    </ul>
  )
}

export default Nav
