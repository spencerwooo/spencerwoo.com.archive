import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Publication: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spencer Woo</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex flex-col h-screen font-serif">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8">Publication</h1>

          <a
            href="https://doi.org/10.24963/ijcai.2021/430"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 -m-2 hover:bg-light-200 rounded border-none"
          >
            <div className="flex space-x-1 uppercase text-xs font-mono mb-1">
              <span className="px-2 rounded-full bg-green-200">IJCAI 2021</span>
              <span className="px-2 rounded-full bg-red-200">Adversarial Attack</span>
              <span className="px-2 rounded-full bg-blue-200">Perceptual Similarity</span>
            </div>
            <h2 className="font-bold">
              Demiguise Attack: Crafting Invisible Semantic Adversarial Perturbations with Perceptual Similarity
            </h2>
            <div className="text-sm">
              Yajie Wang*, <span className="font-bold">Shangbo Wu*</span>, Wenyi Jiang, Shengang Hao, Yu-an Tan, Quanxin
              Zhang
            </div>
          </a>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Publication
