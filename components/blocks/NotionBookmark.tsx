import { Link } from 'react-feather'
import useSWR from 'swr'

const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())

const Bookmark = ({ value }: { value: any }) => {
  const { url } = value
  const { data, error } = useSWR(url, previewFetcher)

  if (error)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-none rounded flex space-x-2 p-2 text-gray-600 items-center dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700"
      >
        <Link size={16} />
        <span>{url}</span>
      </a>
    )
  if (!data) return <p>Loading...</p>

  const {
    title,
    description,
    favicon,
    open_graph: { images },
  } = data

  return (
    <div
      className="border rounded flex text-gray-600 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700"
      onClick={() => {
        window.open(url)
      }}
    >
      <div className="p-2">
        <p className="font-bold text-sm mb-1 truncate">{title}</p>
        <p className="text-sm mb-1 opacity-70 truncate">{description}</p>
        <p className="flex font-mono text-sm opacity-70 items-center">
          {favicon && <img src={favicon} className="h-3 w-3" />}
          <span className="truncate">{url}</span>
        </p>
      </div>
      {images && images.length > 0 && (
        <div className="flex-shrink-0 h-30 w-60 overflow-hidden">
          <img src={images[0]} alt={title} />
        </div>
      )}
    </div>
  )
}

export default Bookmark
