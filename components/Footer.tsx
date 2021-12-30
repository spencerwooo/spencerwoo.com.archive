import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-xs text-center p-6 text-gray-400">
      <div>Built with love by Spencer Woo</div>
      <div>
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="dark:border-b-gray-700 hover:border-b-gray-500"
        >
          CC BY-NC-SA 4.0
        </a>{' '}
        ©️ 2017 - {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
