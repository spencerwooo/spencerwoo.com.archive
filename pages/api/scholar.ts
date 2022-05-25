import { JSDOM } from 'jsdom'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      title: string
      author: string
      publication: string
      date: string
      link: string
      citations: string
    }[]
  >
) {
  const resp = await fetch(
    'https://scholar.google.com/citations?user=Mf-JoyQAAAAJ&hl=en'
  )
  const html = await resp.text()

  const dom = new JSDOM(html)
  const document = dom.window.document
  const elements = document.querySelectorAll('.gsc_a_tr')
  const data = Array.from(elements).map((element) => {
    const title =
      element.querySelector('.gsc_a_at')?.textContent?.replaceAll('‐', '-') ||
      ''

    // author and publication are in the same element called .gs_gray
    const gray = Array.from(element.querySelectorAll('.gs_gray'))
    const [author, publication] = gray.map(
      (elem) => elem?.textContent?.split('�')[0] || ''
    )

    const date = element.querySelector('.gsc_a_y')?.textContent || ''

    const raw = element.querySelector('.gsc_a_at')?.getAttribute('href') || ''
    const link = 'https://scholar.google.com' + raw

    const citations = element.querySelector('.gsc_a_c')?.textContent || ''
    return { title, author, publication, date, link, citations }
  })

  res.status(200).json(data)
}
