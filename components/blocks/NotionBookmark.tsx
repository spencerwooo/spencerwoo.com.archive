import { Link } from 'react-feather'
import useSWR from 'swr'

const previewFetcher = (url: string) =>
  fetch(`https://spencerwoo-66hwuea7r-spencerwoo.vercel.app/api/bookmark/${encodeURIComponent(url)}`).then(res =>
    res.json()
  )

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

  // TODO: add loading skeleton preview
  if (!data) return <p>Loading link preview...</p>

  const { title, description, favicon, open_graph } = data
  const images = open_graph?.images ?? []

  return (
    <div
      className="border rounded cursor-pointer flex border-gray-400/50 max-h-30 text-gray-600 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700"
      onClick={() => {
        window.open(url)
      }}
    >
      <div className="flex flex-col flex-shrink p-2">
        <p className="font-bold text-sm mb-1 overflow-ellipsis">{title}</p>
        <p className="flex-1 text-sm mb-1 opacity-70 overflow-ellipsis">{description}</p>
        <p className="flex space-x-2 text-sm opacity-70 overflow-hidden">
          {favicon ? <img src={favicon} className="h-4 w-4" /> : <Link size={16} />}
          <span className="flex-shrink-0">{url}</span>
        </p>
      </div>
      {images && images.length > 0 && (
        <div className="flex-shrink-0 h-30 max-w-60 overflow-hidden hidden sm:block">
          <img src={images[0].url} alt={title} className="border-l rounded object-cover border-gray-400/50 h-30" />
        </div>
      )}
    </div>
  )
}

export default Bookmark
