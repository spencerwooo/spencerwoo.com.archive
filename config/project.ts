import { BookOpen, Cloud, FileText, Hexagon, Icon, Rss, Zap } from 'react-feather'

export interface ProjectProps {
  name: string
  link: string
  slug: string
  icon: Icon
}

export const projectLinks: ProjectProps[] = [
  {
    name: 'onedrive-vercel-index',
    link: 'https://github.com/spencerwooo/onedrive-vercel-index',
    slug: 'spencerwooo/onedrive-vercel-index',
    icon: Cloud,
  },
  {
    name: 'substats',
    link: 'https://github.com/spencerwooo/substats',
    slug: 'spencerwooo/substats',
    icon: Rss,
  },
  {
    name: 'PaimonMenuBar',
    link: 'https://github.com/spencerwooo/PaimonMenuBar',
    slug: 'spencerwooo/PaimonMenuBar',
    icon: Zap,
  },
  {
    name: 'BIThesis',
    link: 'https://github.com/BITNP/BIThesis',
    slug: 'BITNP/BIThesis',
    icon: FileText,
  },
  {
    name: 'vscode-math-to-image',
    link: 'https://github.com/TeamMeow/vscode-math-to-image',
    slug: 'TeamMeow/vscode-math-to-image',
    icon: Hexagon,
  },
  {
    name: 'dowww',
    link: 'https://github.com/spencerwooo/dowww',
    slug: 'spencerwooo/dowww',
    icon: BookOpen,
  },
]
