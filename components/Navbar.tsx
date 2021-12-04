import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="flex font-sans p-6 text-gray-500 items-center justify-between">
      <Link href="/">Spencer</Link>
      <nav className="flex space-x-4">
        <Link href="/blog">Blog</Link>
        <Link href="/publication">Publication</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/links">Links</Link>
      </nav>
    </header>
  )
}

export default Navbar
