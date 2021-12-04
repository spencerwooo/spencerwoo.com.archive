import React from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

type cardBtnLinkProps = {
  desc: string
  icon: HeroIcon
  link: string
  content: string
  ping: boolean
  pingColor?: string
}

const CardBtnLink = (props: cardBtnLinkProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center text-xs text-base-200">
        <props.icon className="mr-1 w-4 h-4" />
        <span className="font-mono">{props.desc}</span>
      </div>
      <a className="btn btn-sm btn-outline btn-accent indicator" href={props.link} target="_blank" rel="noopener noreferrer">
        {props.ping && (
          <span className="indicator-item flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${props.pingColor} opacity-75`}
            ></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${props.pingColor}`}></span>
          </span>
        )}
        <div className="truncate h-3">{props.content}</div>
      </a>
    </div>
  )
}

export default CardBtnLink
