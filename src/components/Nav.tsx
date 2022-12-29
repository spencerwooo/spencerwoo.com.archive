import Link from 'next/link'

export default function Nav() {
  return (
    <ul className="flex items-center space-x-4 list-none justify-center mt-2 text-sm font-light">
      <span className="w-1 h-1 rounded-full bg-green-200" />
      <span className="w-1 h-1 rounded-full bg-green-400" />
      <span className="w-1 h-1 rounded-full bg-green-600" />
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
      <span className="w-1 h-1 rounded-full bg-rose-600" />
      <span className="w-1 h-1 rounded-full bg-rose-400" />
      <span className="w-1 h-1 rounded-full bg-rose-200" />
    </ul>
  )
}
