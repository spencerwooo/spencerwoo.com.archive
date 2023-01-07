import Image from 'next/image'
import icon from '../assets/icon.jpg'

export default function Avatar({ size }: { size: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-xl shadow-rosepine-subtle/20 sm:rounded-xl lg:rounded-2xl"
      style={{ width: `${size}rem` }}
    >
      <Image src={icon} alt="icon" />
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
    </div>
  )
}
