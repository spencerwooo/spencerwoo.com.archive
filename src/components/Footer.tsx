import { SiNextdotjs, SiTailwindcss, SiVercel } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="mt-12 flex justify-between text-rosepine-muted font-light text-xs leading-6">
      <div className="inline-flex items-center space-x-1">
        <span>Powered by</span>
        <SiNextdotjs />
        <span>·</span>
        <SiVercel />
        <span>·</span>
        <SiTailwindcss />
      </div>
      <div>Since 2017, by yours truly ❤️</div>
    </footer>
  )
}
