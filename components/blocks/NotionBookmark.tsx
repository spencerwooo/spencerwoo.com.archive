import { FiLink, FiLink2 } from 'react-icons/fi'
import useSWR from 'swr'

const previewFetcher = (url: string) =>
  fetch(`/api/bookmark/${encodeURIComponent(url)}`).then((res) => res.json())

const Bookmark = ({ value }: { value: any }) => {
  const { url } = value
  const { data, error } = useSWR(url, previewFetcher)

  if (error)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-28 flex items-end p-2 cursor-pointer rounded bg-gray-200 dark:bg-dark-400 border border-gray-400/50 text-gray-600 hover:bg-light-200 dark:text-gray-400 dark:hover:bg-dark-700 overflow-hidden"
      >
        <div>
          <FiLink size={16} className="inline mr-2" />
          <span className="truncate">{url}</span>
        </div>

        <span className="absolute top-0 right-0 text-6xl truncate tracking-widest opacity-10 font-mono font-black">
          <FiLink2 className="inline mr-2" />
          <span>{url}</span>
        </span>
      </a>
    )

  if (!data)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-28 grid grid-cols-3 cursor-pointer rounded border border-gray-400/50 text-gray-600 hover:bg-light-200 dark:text-gray-400 dark:hover:bg-dark-700 overflow-hidden"
      >
        <div className="col-span-3 flex flex-col space-y-3 p-2 sm:col-span-2">
          <div className="h-5 animate-pulse rounded bg-gray-200 dark:bg-dark-400" />
          <div className="flex-1 animate-pulse rounded bg-gray-200 dark:bg-dark-400" />
          <div className="truncate text-sm opacity-70">
            <FiLink size={16} className="inline mr-2" />
            <span>{url}</span>
          </div>
        </div>
        <div className="h-28 hidden animate-pulse overflow-hidden bg-gray-200 dark:bg-dark-400 sm:block" />
      </a>
    )

  const { title, description, favicon, open_graph } = data
  const images = open_graph?.images ?? []

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline primary-text grid h-28 cursor-pointer grid-cols-3 justify-between rounded border border-gray-400/50 hover:bg-light-200 dark:hover:bg-dark-700 overflow-hidden"
    >
      <div className="col-span-3 flex flex-shrink flex-col overflow-hidden p-2 sm:col-span-2">
        <div className="mb-1 h-6 truncate text-sm font-bold leading-6">
          {title}
        </div>
        <div className="mb-1 h-10 overflow-hidden text-ellipsis text-sm leading-5 opacity-80">
          {description}
        </div>
        <div className="flex h-6 items-center space-x-2 overflow-hidden truncate text-sm opacity-70">
          {favicon ? (
            <img src={favicon} className="h-4 w-4" alt="favicon" />
          ) : (
            <FiLink size={17} />
          )}
          <span className="translate-y-0.5 transform overflow-hidden truncate leading-6">
            {url}
          </span>
        </div>
      </div>
      {images && images.length > 0 && (
        <div className="hidden overflow-hidden rounded border-l border-gray-400/50 sm:block">
          <img
            src={images[0].url}
            alt={title}
            className="m-0 h-28 w-full rounded border-gray-400/50 object-cover object-center"
          />
        </div>
      )}
    </a>
  )
}

export default Bookmark
