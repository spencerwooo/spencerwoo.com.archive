import type { GetStaticProps, NextPage } from 'next'
import { FiBookmark } from 'react-icons/fi'

import Head from 'next/head'

import getPublications from '../lib/scholar'

const Publication: NextPage<{
  data: {
    title: string
    author: string
    publication: string
    date: string
    link: string
    citations: string
  }[]
}> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Spencer Woo - Publication</title>
      </Head>

      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="heading-text mb-8 font-serif text-4xl">Publication</h1>

        {data.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 border border-gray-400/30 cursor-pointer rounded block hover:opacity-80"
          >
            <div className="p-4 relative bg-white border-b border-gray-400/30 dark:bg-dark-900">
              <div className="font-serif text-lg primary-text tracking-wider">
                {item.title}
              </div>

              <div className="absolute -bottom-3 right-3">
                <span className="rounded-full bg-red-200 text-red-700 px-2 dark:bg-red-700 dark:text-red-200 text-sm uppercase tracking-wider">
                  {item.date}
                </span>

                {item.citations !== '' && (
                  <span className="rounded-full bg-blue-200 text-blue-700 px-2 dark:bg-blue-700 dark:text-blue-200 ml-2 text-sm uppercase tracking-wider">
                    Cited by {item.citations}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-light-300 p-4 dark:bg-dark-700">
              <div className="text-sm secondary-text truncate">
                {item.title.startsWith('Demiguise') ? (
                  <>
                    <span className="opacity-100 font-bold">
                      Y Wang*, S Wu*
                    </span>
                    <span className="opacity-80">
                      , W Jiang, S Hao, Y Tan, Q Zhang
                    </span>
                  </>
                ) : (
                  item.author.split(', ').map((author, index) => (
                    <span key={index}>
                      {author.toLowerCase() === 's wu' ? (
                        <span className="opacity-100 font-bold">
                          {author + '*'}
                        </span>
                      ) : (
                        <span className="opacity-80">{author}</span>
                      )}

                      {index !== item.author.split(', ').length - 1 && (
                        <span>, </span>
                      )}
                    </span>
                  ))
                )}
              </div>

              <div className="text-sm opacity-60 secondary-text truncate">
                <FiBookmark className="inline mr-1" />
                {item.publication}
              </div>
            </div>
          </a>
        ))}

        <div className="secondary-text text-center font-mono text-xs mt-8">
          Updates every 24 hrs, sourced from{' '}
          <a
            href="https://scholar.google.com/citations?user=Mf-JoyQAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-links"
          >
            Google Scholar
          </a>
          .
        </div>
      </div>

      <div className="flex-1" />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPublications()
  return {
    props: { data },
    revalidate: 86400, // 24 hrs
  }
}

export default Publication
