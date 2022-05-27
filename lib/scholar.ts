import { JSDOM } from 'jsdom'

const getPublications = async () => {
  const resp = await fetch(
    'https://scholar.google.com/citations?user=Mf-JoyQAAAAJ&hl=en',
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
        cookie: process.env.GOOGLE_SCHOLAR_COOKIE || '',
      },
    }
  )
  const html = await resp.text()
  // console.log(html) // this route fails often, keep this as a debug option

  const dom = new JSDOM(html)
  const document = dom.window.document
  const elements = document.querySelectorAll('.gsc_a_tr')
  const data = Array.from(elements).map((element) => {
    const title =
      element.querySelector('.gsc_a_at')?.textContent?.replace(/‐/g, '-') || ''

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

  if (data.length === 0) {
    // failed to parse HTML from Google Scholar, return default publication
    return [
      {
        title:
          'Demiguise attack: Crafting invisible semantic adversarial perturbations with perceptual similarity',
        author: 'Y Wang, S Wu, W Jiang, S Hao, Y Tan, Q Zhang',
        publication:
          'Thirtieth International Joint Conference on Artificial Intelligence IJCAI-21, 2021',
        date: '2021',
        link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Mf-JoyQAAAAJ&citation_for_view=Mf-JoyQAAAAJ:d1gkVwhDpl0C',
        citations: '4',
      },
    ]
  }

  return data
}
export default getPublications
