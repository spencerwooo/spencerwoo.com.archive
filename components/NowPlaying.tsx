import { RiSpotifyLine } from 'react-icons/ri'
import useSWR from 'swr'

import { SpotifyTrack } from '../pages/api/now-playing'

const nowPlayingFetcher = () =>
  fetch('/api/now-playing').then((res) => res.json())

const Idle = () => (
  <div className="flex items-center transition-all duration-150 opacity-60 hover:opacity-100">
    <RiSpotifyLine size={16} className="mr-1 flex-shrink-0" />
    <a
      href="https://open.spotify.com/playlist/37i9dQZEVXcGOWrxudEXUL?si=c7f258227a164dcf"
      target="_blank"
      rel="noopener noreferrer"
      className="p-1 hover-links"
    >
      Spotify: My{' '}
      <span className="bg-emerald-600/10 text-emerald-600 p-1 rounded font-bold">
        🎸 Discover Weekly
      </span>{' '}
      playlist
    </a>
  </div>
)

const NowPlaying = () => {
  const { data, error } = useSWR<SpotifyTrack>(
    '/api/now-playing',
    nowPlayingFetcher,
    {
      refreshInterval: 1000,
    }
  )

  if (error) return <Idle />
  if (!data) return <Idle />
  if ('error' in data) return <Idle />

  return (
    <div className="flex items-center transition-all duration-150 opacity-60 hover:opacity-100">
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
          className="absolute rounded left-0 bottom-0 h-0.5 group-hover:h-full bg-emerald-600/40 dark:bg-emerald-400/60 dark:group-hover:bg-emerald-600/20 -z-10 transition-all duration-150"
          style={{
            width: (data.progress_ms / data.duration_ms) * 100 + '%',
          }}
        />
        <span className="absolute rounded left-0 bottom-0 h-0.5 group-hover:h-full bg-emerald-600/10 dark:bg-emerald-200/30 dark:group-hover:bg-emerald-600/10 w-full -z-20" />
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
