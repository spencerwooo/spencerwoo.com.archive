import React from 'react'
import { Icon } from '@icons-pack/react-simple-icons'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

const CardBtnIcons = (props: { desc: string; descIcon: HeroIcon; icons: Icon[] }) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center text-xs text-base-200">
        <props.descIcon className="mr-1 w-4 h-4" />
        <span className="font-mono">{props.desc}</span>
      </div>
      <div className="btn btn-sm btn-outline btn-accent space-x-1">
        {props.icons.map((IconHere, i) => (
          <IconHere key={i} className="w-4 h-4" />
        ))}
      </div>
    </div>
  )
}

export default CardBtnIcons
