import { SiNextdotjs, SiNotion, SiVercel } from 'react-icons/si'

const Footer = () => (
  <footer className="primary-text p-6 text-center text-xs">
    <div className="my-2 inline-flex items-center space-x-2">
      <SiNextdotjs size={16} />
      <SiNotion size={16} />
      <SiVercel size={16} />
    </div>
    <div>Built with love by Spencer Woo</div>
    <div>
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-links"
      >
        CC BY-NC-SA 4.0
      </a>{' '}
      ©️ 2017 - {new Date().getFullYear()}
    </div>
  </footer>
)

export default Footer
