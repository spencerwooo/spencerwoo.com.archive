import React from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

const CardBtnCustom = (props: { desc: string; icon: HeroIcon; content: JSX.Element }) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center text-xs text-base-200">
        <props.icon className="mr-1 w-4 h-4" />
        <span className="font-mono">{props.desc}</span>
      </div>
      <div className="h-3">{props.content}</div>
    </div>
  )
}

export default CardBtnCustom
