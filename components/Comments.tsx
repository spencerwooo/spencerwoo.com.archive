import Giscus from '@giscus/react'

const Comments = () => {
  return (
    <div
      id="comments-section"
      className="mt-4 rounded border border-gray-400/30 p-4 md:-mx-4"
    >
      <Giscus
        repo="spencerwooo/giscus-discussions"
        repoId="R_kgDOGldfMQ"
        category="Announcements"
        categoryId="DIC_kwDOGldfMc4CAbod"
        mapping="pathname"
        reactionsEnabled="1"
        theme="preferred_color_scheme"
        loading="lazy"
      />
    </div>
  )
}

export default Comments
