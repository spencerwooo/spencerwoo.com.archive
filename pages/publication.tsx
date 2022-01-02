import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Publication: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spencer Woo - Publication</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 dark:text-light-900">Publication</h1>

          <a
            href="https://doi.org/10.24963/ijcai.2021/430"
            target="_blank"
            rel="noopener noreferrer"
            className="border-none rounded -m-2 p-2 hover:bg-light-200 dark:hover:bg-dark-700"
          >
            <div className="flex flex-wrap font-mono text-xs mb-1 gap-1 uppercase">
              <span className="rounded-full bg-green-200 px-2 dark:(bg-green-700 text-white) ">IJCAI 2021</span>
              <span className="rounded-full bg-red-200 px-2 dark:(bg-red-700 text-white) ">Adversarial Attack</span>
              <span className="rounded-full bg-blue-200 px-2 dark:(bg-blue-700 text-white) ">
                Perceptual Similarity
              </span>
            </div>
            <h2 className="font-bold dark:text-gray-400">
              Demiguise Attack: Crafting Invisible Semantic Adversarial Perturbations with Perceptual Similarity
            </h2>
            <div className="text-sm dark:text-gray-400">
              Yajie Wang*, <span className="font-bold">Shangbo Wu*</span>, Wenyi Jiang, Shengang Hao, Yu-an Tan, Quanxin
              Zhang
            </div>
          </a>

          <p className="mt-12 font-mono text-xs">
            <abbr title="💡 As soon as I start my PhD ...">More to come ...</abbr>
          </p>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Publication
