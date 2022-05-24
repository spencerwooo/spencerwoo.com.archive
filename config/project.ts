import { IconType } from 'react-icons'
import {
  FiBookOpen,
  FiCloud,
  FiFileText,
  FiHexagon,
  FiRss,
  FiZap,
} from 'react-icons/fi'

export interface ProjectProps {
  name: string
  link: string
  slug: string
  icon: IconType
}

export const projectLinks: ProjectProps[] = [
  {
    name: 'onedrive-vercel-index',
    link: 'https://github.com/spencerwooo/onedrive-vercel-index',
    slug: 'spencerwooo/onedrive-vercel-index',
    icon: FiCloud,
  },
  {
    name: 'substats',
    link: 'https://github.com/spencerwooo/substats',
    slug: 'spencerwooo/substats',
    icon: FiRss,
  },
  {
    name: 'PaimonMenuBar',
    link: 'https://github.com/spencerwooo/PaimonMenuBar',
    slug: 'spencerwooo/PaimonMenuBar',
    icon: FiZap,
  },
  {
    name: 'BIThesis',
    link: 'https://github.com/BITNP/BIThesis',
    slug: 'BITNP/BIThesis',
    icon: FiFileText,
  },
  {
    name: 'vscode-math-to-image',
    link: 'https://github.com/TeamMeow/vscode-math-to-image',
    slug: 'TeamMeow/vscode-math-to-image',
    icon: FiHexagon,
  },
  {
    name: 'dowww',
    link: 'https://github.com/spencerwooo/dowww',
    slug: 'spencerwooo/dowww',
    icon: FiBookOpen,
  },
]
