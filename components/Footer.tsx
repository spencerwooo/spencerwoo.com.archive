import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-xs text-center p-6 text-gray-500">
      <div>Built with love by Spencer Woo</div>
      <div>
        <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link> ©️ 2017 -{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
