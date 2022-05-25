import type { NextPage } from 'next'

import Head from 'next/head'

const Publication: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spencer Woo - Publication</title>
      </Head>

      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="heading-text mb-8 font-serif text-4xl">Publication</h1>

        <a
          href="https://doi.org/10.24963/ijcai.2021/430"
          target="_blank"
          rel="noopener noreferrer"
          className="-m-2 rounded block border-none p-2 hover:bg-light-200 dark:hover:bg-dark-700"
        >
          <div className="mb-4 flex flex-wrap gap-1 font-mono text-xs uppercase">
            <span className="rounded-full bg-green-200 px-2 dark:bg-green-700 dark:text-white">
              IJCAI 2021
            </span>
            <span className="rounded-full bg-red-200 px-2 dark:bg-red-700 dark:text-white">
              Adversarial Attack
            </span>
            <span className="rounded-full bg-blue-200 px-2 dark:bg-blue-700 dark:text-white">
              Perceptual Similarity
            </span>
          </div>
          <h2 className="primary-text font-serif text-lg">
            Demiguise Attack: Crafting Invisible Semantic Adversarial
            Perturbations with Perceptual Similarity
          </h2>
          <div className="secondary-text text-sm">
            Yajie Wang*, <span className="font-bold">Shangbo Wu*</span>, Wenyi
            Jiang, Shengang Hao, Yu-an Tan, Quanxin Zhang
          </div>
        </a>

        <p className="mt-12 font-mono text-xs">
          <abbr title="💡 As soon as I start my PhD ...">More to come ...</abbr>
        </p>
      </div>

      <div className="flex-1" />
    </>
  )
}

export default Publication
