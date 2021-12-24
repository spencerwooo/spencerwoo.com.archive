import type { NextApiRequest, NextApiResponse } from 'next'
import { getLinkPreview } from 'link-preview-js'

type Data = Awaited<ReturnType<typeof getLinkPreview>>

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { url } = req.query
  const decodedUrl = decodeURIComponent(url as string)

  const linkPreview = await getLinkPreview(decodedUrl)
  res.status(200).json(linkPreview)
}
