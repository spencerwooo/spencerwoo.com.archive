import Link from 'next/link'
import { slugify } from 'transliteration'

type headingType = {
  id: string
  type: 'heading_2' | 'heading_3'
  text: string
  children: headingType[]
}

const BlogToc = ({ blocks }: { blocks: any }) => {
  const headings = blocks
    .filter((b: any) => b.type === 'heading_2' || b.type === 'heading_3')
    .map((b: any) => {
      return { id: b.id, type: b.type, text: b[b.type].text[0].plain_text, children: [] }
    })

  const nestedHeadings: headingType[] = []
  headings.forEach((h: headingType) => {
    if (h.type === 'heading_2') {
      nestedHeadings.push(h)
    } else if (h.type === 'heading_3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].children.push(h)
    }
  })

  return (
    <div className="h-0 ml-[750px] top-0 w-64 hidden xl:block sticky">
      <div className="border rounded border-gray-400/30 max-h-screen-md p-4">
        <ul className="list-disc list-inside">
          {nestedHeadings.map((h: headingType) => (
            <Link href={`#${slugify(h.text)}`} key={h.id}>
              <li>
                <a href={`#${slugify(h.text)}`}>{h.text}</a>
                {h.children.length > 0 && (
                  <ul className="list-disc list-inside ml-6">
                    {h.children.map((h: { id: string; type: 'heading_2' | 'heading_3'; text: string }) => (
                      <Link href={`#${slugify(h.text)}`} key={h.id}>
                        <li>
                          <a href={`#${slugify(h.text)}`}>{h.text}</a>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogToc
