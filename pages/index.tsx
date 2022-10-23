import type { NextPage } from 'next'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[24rem] lg:items-start lg:overflow-y-auto">
        <Nav />
        <Sidebar />
      </header>

      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-[30rem] lg:border-t-0">
        <div className="relative">
          <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <div>Heading</div>

          </div>
        </div>
      </main>

      <footer className="text-right text-slate-500 font-light text-xs pr-16">
        → with Next.js & Vercel, since 2017 by yours truly.
      </footer>
    </>
  )
}

export default Home
