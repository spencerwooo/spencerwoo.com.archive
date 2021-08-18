import React from 'react'

import {
  AcademicCapIcon,
  PencilIcon,
  PaperClipIcon,
  CodeIcon,
  CubeTransparentIcon,
  ServerIcon,
  ClockIcon,
  MailIcon,
  PuzzleIcon,
} from '@heroicons/react/outline'
import {
  Alibabacloud,
  Cloudflare,
  Cplusplus,
  Github,
  Go,
  Googlescholar,
  Java,
  Javascript,
  Jetbrains,
  Nextdotjs,
  Python,
  Pytorch,
  ReactJs,
  Sinaweibo,
  Tailwindcss,
  Telegram,
  Twitter,
  Typescript,
  Vercel,
  Visualstudiocode,
  Vuedotjs,
} from '@icons-pack/react-simple-icons'

import CardBtnLink from './components/CardBtnLink'
import CardBtnCustom from './components/CardBtnCustom'
import CardBtnIcons from './components/CardBtnIcons'
import SocialIcons from './components/SocialIcons'

import avatar from './assets/avatar.png'
import wave from './assets/wave.png'
import paimon from './assets/genshin-impact.svg'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 pb-6 max-w-3xl bg-base-200 rounded">
        <div className="mt-12 md:mt-36 p-6 bg-primary shadow-md rounded transform -translate-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-8">
            <img
              className="w-24 h-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
              src={avatar}
              alt="avatar"
            />

            <div>
              <div className="flex items-center">
                <div className="text-2xl md:text-3xl font-bold text-white">Hi, I'm Spencer Woo</div>
                <img className="w-8 h-8 ml-2 wave" src={wave} alt="wave" />
              </div>

              <div className="flex flex-wrap mt-8 gap-2">
                <CardBtnLink
                  desc={'edu.postgrad'}
                  link={'https://www.gla.ac.uk/'}
                  content={'University of Glasgow'}
                  ping={true}
                  pingColor={'bg-yellow-400'}
                  icon={AcademicCapIcon}
                />
                <CardBtnLink
                  desc={'edu.undergrad'}
                  link={'https://www.bit.edu.cn/'}
                  content={'Beijing Institute of Technology'}
                  ping={false}
                  icon={AcademicCapIcon}
                />
                <CardBtnLink
                  desc={'publish[0]'}
                  link={'https://sspai.com/u/spencerwoo/posts'}
                  content={'sspai.com'}
                  ping={true}
                  pingColor={'bg-red-400'}
                  icon={PencilIcon}
                />
                <CardBtnLink
                  desc={'publish[1]'}
                  link={'https://blog.spencerwoo.com/'}
                  content={'blog.spencerwoo.com'}
                  ping={true}
                  pingColor={'bg-blue-400'}
                  icon={PaperClipIcon}
                />

                <CardBtnCustom
                  desc={'timezone'}
                  icon={ClockIcon}
                  content={<div className="btn btn-sm btn-secondary">BST (GMT+1)</div>}
                />
                <CardBtnCustom
                  desc={'genshin.impact'}
                  icon={PuzzleIcon}
                  content={
                    <div className="btn btn-sm btn-secondary">
                      <img src={paimon} alt="paimon" className="w-5 h-5 mr-1" />
                      <span>UID: 168305666</span>
                    </div>
                  }
                />

                <CardBtnIcons
                  desc={'use.lang'}
                  descIcon={CodeIcon}
                  icons={[Python, Javascript, Typescript, Cplusplus, Java, Go]}
                />
                <CardBtnIcons
                  desc={'use.framework'}
                  descIcon={CubeTransparentIcon}
                  icons={[Pytorch, ReactJs, Nextdotjs, Vuedotjs, Tailwindcss]}
                />
                <CardBtnIcons
                  desc={'use.service'}
                  descIcon={ServerIcon}
                  icons={[Visualstudiocode, Jetbrains, Vercel, Cloudflare, Alibabacloud]}
                />
              </div>

              <hr className="border-dashed border-secondary-focus mt-4" />

              <div className="flex flex-wrap mt-4 gap-2">
                <SocialIcons link={'https://github.com/spencerwooo'} icon={Github} />
                <SocialIcons link={'https://twitter.com/realSpencerWoo'} icon={Twitter} />
                <SocialIcons link={'https://weibo.com/spencerwoo'} icon={Sinaweibo} />
                <SocialIcons link={'https://t.me/realSpencerWoo'} icon={Telegram} />
                <SocialIcons link={'https://scholar.google.com/citations?user=Mf-JoyQAAAAJ'} icon={Googlescholar} />
                <a className="btn btn-sm btn-secondary" href="mailto:spencer.wushangbo@gmail.com">
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>Projects. Publications.</div>
      </div>
    </div>
  )
}

export default App
