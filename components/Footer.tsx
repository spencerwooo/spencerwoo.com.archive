import { SiNextdotjs, SiTailwindcss, SiVercel } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-slate-500 font-light text-xs leading-6">
      <div className="inline-flex items-center space-x-1">
        <SiNextdotjs />
        <span>+</span>
        <SiVercel />
        <span>+</span>
        <SiTailwindcss />
      </div>
      <div className="uppercase">Since 2017, by yours truly.</div>
    </footer>
  )
}
