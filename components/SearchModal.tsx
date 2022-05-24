import { Dialog, Transition } from '@headlessui/react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { useAsync } from 'react-async-hook'
import { FiSearch } from 'react-icons/fi'
import useConstant from 'use-constant'

import Image from 'next/image'
import Link from 'next/link'

const useNotionSearch = () => {
  const [query, setQuery] = useState('')
  const searchNotion = async (q: string) => {
    const result = await fetch(`/api/search/${q}`)
    return await result.json()
  }

  const debouncedNotionSearch = useConstant(() =>
    AwesomeDebouncePromise(searchNotion, 1000)
  )
  const results = useAsync(async () => {
    if (query.length === 0) {
      return []
    } else {
      return debouncedNotionSearch(query)
    }
  }, [query])

  return {
    query,
    setQuery,
    results,
  }
}

const SearchModal = ({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const closeSearchBox = () => setSearchOpen(false)

  const { query, setQuery, results } = useNotionSearch()

  return (
    <Transition appear show={searchOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeSearchBox}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-light-200/30 backdrop-blur backdrop-filter dark:bg-dark-200/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-20 inline-block w-full max-w-3xl transform overflow-hidden rounded border border-gray-400/30 text-left shadow-xl transition-all ">
              <Dialog.Title as="h3" className="primary-text relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  id="search-box"
                  className="block w-full border-b border-gray-400/30 bg-gray-50 p-2.5 pt-4 pl-10 focus:outline-none focus-visible:outline-none dark:bg-dark-700"
                  placeholder="Search in blog posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Dialog.Title>

              <div className="primary-text bg-white dark:bg-dark-800">
                {results.loading && (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Image
                        src="/images/purr-sleep.png"
                        alt="purr loading"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="secondary-text pb-4">Loading ...</div>
                  </div>
                )}
                {results.error && (
                  <div className="text-center">
                    <Image
                      src="/images/error-result.png"
                      alt="errored out"
                      width={450}
                      height={300}
                    />
                    <div className="secondary-text pb-4">
                      Error: {results.error.message}
                    </div>
                  </div>
                )}
                {results.result && (
                  <>
                    {results.result.length === 0 ? (
                      <div className="text-center">
                        <Image
                          src="/images/empty-list.png"
                          alt="empty list"
                          width={300}
                          height={300}
                        />
                        <div className="secondary-text pb-4">
                          Nothing here...
                        </div>
                      </div>
                    ) : (
                      results.result.map((result: any, i: number) => (
                        <Link
                          href={`/blog/${result.properties.slug.rich_text[0].plain_text}`}
                          key={i}
                          passHref
                        >
                          <a className="flex cursor-pointer justify-between border-b border-gray-400/30 p-4 hover:bg-light-200 dark:hover:bg-dark-700">
                            <div className="w-9">{result.icon.emoji}</div>
                            <div className="flex-1 overflow-hidden truncate">
                              <div className="pb-1 font-bold">
                                {result.properties.name.title[0].text.content}
                              </div>
                              <div className="secondary-text pb-1">
                                {
                                  result.properties.preview.rich_text[0]
                                    .plain_text
                                }
                              </div>
                              <div className="secondary-text font-mono text-xs">
                                {result.properties.date.date.start}
                              </div>
                            </div>
                          </a>
                        </Link>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SearchModal
