import { FiArrowRight } from 'react-icons/fi'
import { RiSpotifyLine } from 'react-icons/ri'
import useSWR from 'swr'

import Image from 'next/image'

import type { SpotifyTrack } from '../pages/api/now-playing'

const nowPlayingFetcher = () =>
  fetch('/api/now-playing').then((res) => res.json())

const Idle = () => (
  <div>
    <RiSpotifyLine size={16} className="mr-1 inline" />
    Spotify playlist:{' '}
    <a
      href="https://open.spotify.com/playlist/37i9dQZEVXcGOWrxudEXUL?si=c7f258227a164dcf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-wrap items-center group"
    >
      <span className="hover-links ">🎸 Discover Weekly</span>
      <FiArrowRight className="h-4 w-4 transition-all duration-150 group-hover:translate-x-1" />
    </a>
  </div>
)

const NowPlaying = () => {
  const { data, error } = useSWR<SpotifyTrack>(
    '/api/now-playing',
    nowPlayingFetcher,
    {
      refreshInterval: 10 * 1000,
    }
  )

  if (error || !data || 'error' in data) return <Idle />

  return (
    <a
      href={data.external_url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-between max-w-[24rem] rounded transition-all duration-150 border border-gray-400/30 hover:opacity-80 p-2"
    >
      <div className="relative w-[16rem] mr-2">
        <div className="text-xs opacity-40 mb-4 uppercase">
          <RiSpotifyLine size={14} className="mr-1 inline" /> Now Playing
        </div>
        <div className="text-sm opacity-60 truncate">{data.artist}</div>
        <div className="mb-1 truncate">{data.item}</div>

        <div
          className="rounded absolute bottom-0 h-0.5 group-hover:h-full bg-emerald-600/40 dark:bg-emerald-400/60 dark:group-hover:bg-emerald-600/20 -z-10 transition-all duration-150"
          style={{
            width: (data.progress_ms / data.duration_ms) * 100 + '%',
          }}
        />
        <div className="rounded absolute bottom-0 h-0.5 group-hover:h-full bg-emerald-600/10 dark:bg-emerald-200/30 dark:group-hover:bg-emerald-600/10 w-full -z-20" />
      </div>

      <Image
        src={data.images[2].url}
        alt="Spotify album"
        width={78}
        height={78}
        className="rounded"
        style={{ flexShrink: 0 }}
      />

      <span className="inline-flex h-2 w-2 absolute -top-1 -right-1">
        {data.is_playing && (
          <span className="animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`rounded-full h-2 w-2 ${
            data.is_playing ? 'bg-emerald-500' : 'bg-gray-400'
          }`}
        />
      </span>
    </a>
  )
  // (
  //   <div className="flex transition-all duration-150">
  //     <RiSpotifyLine size={16} className="mr-1 flex-shrink-0" />
  //     <div className="flex relative group">
  //       <a
  //         href={data.external_url}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="truncate p-1 max-w-[18rem] sm:max-w-[36rem] group-hover:text-emerald-700 dark:group-hover:text-emerald-500"
  //       >
  //         Listening: {data.item} - {data.artist}
  //       </a>
  //     </div>
  //   </div>
  // )
}
export default NowPlaying
