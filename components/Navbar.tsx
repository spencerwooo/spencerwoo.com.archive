import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="text-gray-500 font-sans p-6 flex items-center justify-between">
      <Link href="/">Spencer</Link>
      <nav className="flex space-x-4">
        <Link href="/">Blog</Link>
        <Link href="/">Publication</Link>
        <Link href="/">Projects</Link>
      </nav>
    </header>
  )
}

export default Navbar
