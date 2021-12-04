import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="font-sans text-xs text-center p-6 text-gray-500">
      <p>Built with love by Spencer Woo</p>
      <p>
        <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link> ©️ 2017 -{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
