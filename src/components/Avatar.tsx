import Image from 'next/image'
import icon from '../assets/icon.jpg'

export default function Avatar() {
  return (
    <div className="mt-12 mx-auto relative block w-[10rem] overflow-hidden rounded-lg shadow-xl shadow-slate-200 sm:rounded-xl lg:rounded-2xl">
      <Image src={icon} alt="icon" />
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
    </div>
  )
}
