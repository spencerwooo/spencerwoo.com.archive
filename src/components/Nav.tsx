import Link from 'next/link'

export default function Nav() {
  return (
    <ul className="inline-flex items-center space-x-2 list-none justify-center mt-2 text-sm">
      <li>
        <Link href="/">Home</Link>
      </li>
      <span className="w-1 h-1 rounded-full bg-teal-600" />
      <li>
        <Link href="/genshin">Genshin</Link>
      </li>
      <span className="w-1 h-1 rounded-full bg-pink-600" />
      <li>
        <Link href="/papers">Papers</Link>
      </li>
    </ul>
  )
}
