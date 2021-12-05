import { Rss, Github, Props, Telegram, Twitter, Sinaweibo, Steam, Medium } from '@icons-pack/react-simple-icons'
import { FC } from 'react'

export interface LinkProps {
  name: string
  link: string
  icon?: FC<Props>
  apiUrl: string
  color: string
  followerName?: string
}

export const socialLinks: LinkProps[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/spencerwooo',
    icon: Github,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=github&queryKey=spencerwooo',
    color: '#24292f',
  },
  {
    name: 'RSS',
    link: 'https://blog.spencerwoo.com/',
    icon: Rss,
    apiUrl:
      'https://api.spencerwoo.com/substats/?source=feedly|inoreader&queryKey=https%3A%2F%2Fblog.spencerwoo.com%2Fposts%2Findex.xml',
    color: '#FFA500',
    followerName: 'subscribers',
  },
  {
    name: 'Telegram',
    link: 'https://t.me/realSpencerWoo',
    icon: Telegram,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=telegram&queryKey=realSpencerWoo',
    color: '#2CA5E0',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/realSpencerWoo',
    icon: Twitter,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=twitter&queryKey=realSpencerWoo',
    color: '#1da1f2',
  },
  {
    name: 'Weibo',
    link: 'https://weibo.com/spencerwoo',
    icon: Sinaweibo,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=weibo&queryKey=6265807914',
    color: '#e71f19',
  },
  {
    name: 'Steam Games',
    link: 'https://steamcommunity.com/id/firebearllc',
    icon: Steam,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=steamGames&queryKey=76561198336249957',
    color: '#134375',
    followerName: 'games',
  },
  {
    name: 'Steam Friends',
    link: 'https://steamcommunity.com/id/firebearllc',
    icon: Steam,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=steamFriends&queryKey=76561198336249957',
    color: '#134375',
    followerName: 'friends',
  },
  {
    name: 'Medium',
    link: 'https://api.spencerwoo.com/substats/?source=medium&queryKey=%40SpencerWooo',
    icon: Medium,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=medium&queryKey=%40SpencerWooo',
    color: '#00a669',
    followerName: 'readers',
  },
  {
    name: 'SSPAI',
    link: 'https://sspai.com/u/spencerwoo/posts',
    apiUrl: 'https://api.spencerwoo.com/substats/?source=sspai&queryKey=spencerwoo',
    color: '#d71a1b',
    followerName: 'readers',
  },
]
