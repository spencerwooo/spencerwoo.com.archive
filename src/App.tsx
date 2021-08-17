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
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <AcademicCapIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">edu.postgrad</span>
                  </div>
                  <a
                    className="btn btn-sm btn-secondary indicator"
                    href="https://www.gla.ac.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="indicator-item flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
                    </span>
                    <div>University of Glasgow</div>
                  </a>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <AcademicCapIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">edu.undergrad</span>
                  </div>
                  <a
                    className="btn btn-sm btn-secondary"
                    href="https://bit.edu.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Beijing Institute of Technology
                  </a>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <PencilIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">publish[0]</span>
                  </div>
                  <a
                    className="btn btn-sm btn-secondary"
                    href="https://sspai.com/u/spencerwoo/posts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SSPAI.COM
                  </a>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <PaperClipIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">publish[1]</span>
                  </div>
                  <a
                    className="btn btn-sm btn-secondary"
                    href="https://blog.spencerwoo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    blog.spencerwoo.com
                  </a>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <ClockIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">timezone</span>
                  </div>
                  <div className="btn btn-sm btn-secondary">BST (GMT+1)</div>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <span className="font-mono">genshin.impact</span>
                  </div>
                  <div className="btn btn-sm btn-secondary">
                    <img src={paimon} alt="paimon" className="w-5 h-5 mr-1" />
                    168305666
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <CodeIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">use.lang</span>
                  </div>
                  <div className="btn btn-sm btn-secondary space-x-1">
                    <Python className="w-5 h-5" />
                    <Javascript className="w-5 h-5" />
                    <Typescript className="w-5 h-5" />
                    <Cplusplus className="w-5 h-5" />
                    <Java className="w-5 h-5" />
                    <Go className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <CubeTransparentIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">use.framework</span>
                  </div>
                  <div className="btn btn-sm btn-secondary space-x-1">
                    <Pytorch className="w-5 h-5" />
                    <ReactJs className="w-5 h-5" />
                    <Nextdotjs className="w-5 h-5" />
                    <Vuedotjs className="w-5 h-5" />
                    <Tailwindcss className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-sm text-secondary">
                    <ServerIcon className="mr-1 w-4 h-4" />
                    <span className="font-mono">use.service</span>
                  </div>
                  <div className="btn btn-sm btn-secondary space-x-1">
                    <Visualstudiocode className="w-5 h-5" />
                    <Jetbrains className="w-5 h-5" />
                    <Vercel className="w-5 h-5" />
                    <Cloudflare className="w-5 h-5" />
                    <Alibabacloud className="w-5 h-5" />
                  </div>
                </div>
                {/* here */}
              </div>

              <hr className="border-dashed border-secondary-focus mt-4" />

              <div className="flex flex-wrap mt-4 gap-2">
                <a
                  className="btn btn-sm btn-secondary"
                  href="https://github.com/spencerwooo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="https://twitter.com/realSpencerWoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="https://weibo.com/spencerwoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sinaweibo className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="https://t.me/realSpencerWoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Telegram className="w-5 h-5" />
                </a>
                <a
                  className="btn btn-sm btn-secondary"
                  href="https://scholar.google.com/citations?user=Mf-JoyQAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Googlescholar className="w-5 h-5" />
                </a>
                <a className="btn btn-sm btn-secondary" href="mailto:spencer.wushangbo@gmail.com">
                  <MailIcon className="w-5 h-5" />
                </a>
                {/* here */}
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
