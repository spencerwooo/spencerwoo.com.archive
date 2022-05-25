import { JSDOM } from 'jsdom'

export const getPublications = async () => {
  const resp = await fetch(
    'https://scholar.google.com/citations?user=Mf-JoyQAAAAJ&hl=en'
  )
  const html = await resp.text()

  console.log(html)

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

  return data
}