import Link from 'next/link'

const HoverCard = ({
  href,
  isExternal,
  headingSlot,
  iconSlot,
  children,
}: {
  href: string
  isExternal: boolean
  headingSlot: React.ReactNode
  iconSlot: React.ReactNode
  children: React.ReactNode
}) => {
  const aTagAttributes = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  const AsComponent = isExternal ? 'a' : Link

  return (
    <AsComponent href={href} {...aTagAttributes}>
      <div className="mb-6 border border-gray-400/30 cursor-pointer rounded block transition-all duration-200 hover:opacity-80 hover:shadow">
        <div className="relative heading-text p-4 bg-white border-b border-gray-400/30 dark:bg-dark-900">
          {headingSlot}
          {iconSlot}
        </div>

        <div className="bg-light-300 p-4 dark:bg-dark-700">{children}</div>
      </div>
    </AsComponent>
  )
}
export default HoverCard
