import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

import { useRouter } from 'next/router'

const Toggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const { asPath } = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // do not render theme toggle if not on home page or if not mounted
  if (!mounted || asPath === '/') return null

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
      className="inline-flex cursor-pointer items-center hover:text-gray-500"
    >
      {resolvedTheme === 'light' ? (
        <FiMoon className="inline" size={20} />
      ) : (
        <FiSun className="inline" size={20} />
      )}
    </button>
  )
}

export default Toggle
