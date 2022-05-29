import type { NextApiRequest, NextApiResponse } from 'next'

export type SpotifyTrack =
  | {
      error: string
    }
  | {
      is_playing: boolean
      item: string
      album: string
      external_url: string
      progress_ms: number
      duration_ms: number
    }

const basicAuthToken = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')

const getAccessToken = async () => {
  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
  })
  return resp.json()
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<SpotifyTrack>
) {
  const { access_token } = await getAccessToken()

  const resp = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )

  if (resp.status !== 200) {
    res.status(200).json({ error: 'No track playing' })
    return
  }

  const result = await resp.json()
  try {
    res.status(200).json({
      is_playing: result.is_playing,
      item: result.item.name,
      album: result.item.album.name,
      external_url: result.item.external_urls.spotify,
      progress_ms: result.progress_ms,
      duration_ms: result.item.duration_ms,
    })
  } catch (error) {
    res.status(200).json({ error: JSON.stringify(error) })
  }
}
