import { FiLink } from 'react-icons/fi'
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
        className="flex items-center space-x-2 rounded border-none p-2 text-gray-600 hover:bg-light-200 dark:text-gray-400 dark:hover:bg-dark-700"
      >
        <FiLink size={16} />
        <span className="overflow-hidden truncate">{url}</span>
      </a>
    )

  if (!data)
    return (
      <div
        className="max-h-30 flex cursor-pointer rounded border border-gray-400/50 text-gray-600 hover:bg-light-200 dark:text-gray-400 dark:hover:bg-dark-700"
        onClick={() => {
          window.open(url)
        }}
      >
        <div className="flex flex-1 flex-shrink flex-col space-y-2 p-2">
          <div className="max-w-40 h-5 animate-pulse rounded bg-gray-200 dark:bg-dark-400" />
          <div className="flex-1 animate-pulse rounded bg-gray-200 dark:bg-dark-400" />
          <p className="flex space-x-2 overflow-hidden text-sm opacity-70">
            <FiLink size={16} />
            <span className="flex-shrink-0">{url}</span>
          </p>
        </div>
        <div className="h-30 hidden w-60 flex-shrink-0 animate-pulse overflow-hidden bg-gray-200 dark:bg-dark-400 sm:block" />
      </div>
    )

  const { title, description, favicon, open_graph } = data
  const images = open_graph?.images ?? []

  return (
    <div
      className="primary-text my-1 grid h-28 cursor-pointer grid-cols-3 justify-between rounded border border-gray-400/50 hover:bg-light-200 dark:hover:bg-dark-700"
      onClick={() => {
        window.open(url)
      }}
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
        <div className="hidden overflow-hidden rounded border-l sm:block">
          <img
            src={images[0].url}
            alt={title}
            className="m-0 h-28 w-full rounded border-gray-400/50 object-cover object-center"
          />
        </div>
      )}
    </div>
  )
}

export default Bookmark
