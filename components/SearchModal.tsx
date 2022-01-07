import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'
import { Search } from 'react-feather'
import useConstant from 'use-constant'

import Link from 'next/link'
import Image from 'next/image'

const useNotionSearch = () => {
  const [query, setQuery] = useState('')
  const searchNotion = async (q: string) => {
    const result = await fetch(`/api/search/${q}`)
    return await result.json()
  }

  const debouncedNotionSearch = useConstant(() => AwesomeDebouncePromise(searchNotion, 1000))
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

const SearchModal: FC<{
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}> = ({ searchOpen, setSearchOpen }) => {
  const closeSearchBox = () => setSearchOpen(false)

  const { query, setQuery, results } = useNotionSearch()

  return (
    <Transition appear show={searchOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeSearchBox}>
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
            <Dialog.Overlay className="fixed inset-0 bg-light-200/30 dark:bg-dark-200/30 backdrop-filter backdrop-blur" />
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
            <div className="inline-block w-full max-w-xl my-20 overflow-hidden text-left transition-all transform rounded shadow-xl rounded border border-gray-400/30">
              <Dialog.Title as="h3" className="relative primary-text">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  id="search-box"
                  className="bg-gray-50 border-b border-gray-400/30 pt-4 block w-full pl-10 p-2.5 dark:bg-dark-700"
                  placeholder="Search in blog posts..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </Dialog.Title>

              <div className="primary-text dark:bg-dark-800">
                {results.loading && (
                  <div className="flex flex-col gap-4 p-4">
                    <div className="h-12 animate-pulse bg-gray-100 dark:bg-dark-500 rounded" />
                    <div className="h-12 animate-pulse bg-gray-100 dark:bg-dark-500 rounded" />
                    <div className="h-12 animate-pulse bg-gray-100 dark:bg-dark-500 rounded" />
                  </div>
                )}
                {results.error && (
                  <div className="text-center">
                    <Image src="/images/error-result.png" alt="errored out" width={450} height={300} />
                    <div className="secondary-text pb-4">Error: {results.error.message}</div>
                  </div>
                )}
                {results.result && (
                  <>
                    {results.result.length === 0 ? (
                      <div className="text-center">
                        <Image src="/images/empty-list.png" alt="empty list" width={300} height={300} />
                        <div className="secondary-text pb-4">Nothing here...</div>
                      </div>
                    ) : (
                      results.result.map((result: any, i: number) => (
                        <Link href={`/blog/${result.properties.slug.rich_text[0].plain_text}`} key={i} passHref>
                          <div className="px-4 py-2 flex justify-between hover:bg-light-200 dark:hover:bg-dark-700 cursor-pointer border-b border-gray-400/30">
                            <div className="w-9">{result.icon.emoji}</div>
                            <div className="flex-1 overflow-hidden truncate">
                              <div className="font-medium">{result.properties.name.title[0].text.content}</div>
                              <div className="secondary-text">{result.properties.preview.rich_text[0].plain_text}</div>
                              <div className="secondary-text text-xs font-mono">
                                {result.properties.date.date.start}
                              </div>
                            </div>
                          </div>
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
