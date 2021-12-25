import { DiscussionEmbed } from 'disqus-react'

const Comments = ({ date, slug }: { date: string; slug: string }) => {
  const disqusIdentifier = () => {
    const pubDate = new Date(date)
    const pubYear = pubDate.getFullYear()
    const pubMonth = `0${pubDate.getMonth() + 1}`.slice(-2)
    return `/${pubYear}/${pubMonth}/${slug}`
  }

  return <DiscussionEmbed shortname="spencerwoo" config={{ identifier: disqusIdentifier() }} />
}

export default Comments
