import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-xs text-center p-6 primary-text">
      <div>Built with love by Spencer Woo</div>
      <div>
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
          CC BY-NC-SA 4.0
        </a>{' '}
        ©️ 2017 - {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
