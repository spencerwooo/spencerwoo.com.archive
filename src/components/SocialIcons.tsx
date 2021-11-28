import React from 'react'
import { Icon } from '@icons-pack/react-simple-icons'

const SocialIcons = (props: { link: string; icon: Icon }) => {
  return (
    <a className="btn btn-sm btn-outline border-white text-white" href={props.link} target="_blank" rel="noopener noreferrer">
      <props.icon className="w-5 h-5" />
    </a>
  )
}

export default SocialIcons
