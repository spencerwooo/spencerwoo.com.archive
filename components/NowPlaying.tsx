import { RiSpotifyLine } from 'react-icons/ri'
import useSWR from 'swr'

import { SpotifyTrack } from '../pages/api/now-playing'

const nowPlayingFetcher = () =>
  fetch('/api/now-playing').then((res) => res.json())

const NowPlaying = () => {
  const { data, error } = useSWR<SpotifyTrack>(
    '/api/now-playing',
    nowPlayingFetcher,
    {
      refreshInterval: 1000,
    }
  )

  if (error) return <div />
  if (!data) return <div />
  if ('error' in data) return <div />

  return (
    <div className="flex items-center">
      <RiSpotifyLine size={16} className="mr-1 flex-shrink-0" />
      <div className="flex relative group">
        <a
          href={data.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate p-1 max-w-[18rem] sm:max-w-[36rem] group-hover:text-emerald-700 dark:group-hover:text-emerald-500"
        >
          Listening: {data.item} - {data.album}
        </a>

        <span
          className="absolute rounded left-0 bottom-0 h-0.5 group-hover:h-full bg-emerald-600/40 dark:bg-emerald-600/20 -z-10 transition-all duration-100"
          style={{
            width: (data.progress_ms / data.duration_ms) * 100 + '%',
          }}
        />
        <span className="absolute rounded left-0 bottom-0 h-0.5 group-hover:h-full bg-emerald-600/10 dark:bg-emerald-600/10 w-full -z-20" />
        <span className="inline-flex h-2 w-2 absolute top-0 -right-1">
          {data.is_playing && (
            <span className="animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={`rounded-full h-2 w-2 ${
              data.is_playing ? 'bg-emerald-500' : 'bg-gray-400'
            }`}
          />
        </span>
      </div>
    </div>
  )
}
export default NowPlaying
