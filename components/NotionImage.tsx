export const getMediaCtx = (value: any) => {
  const src = value.type === 'external' ? value.external.url : value.file.url
  const expire = value.type === 'file' ? value.file.expiry_time : null
  const caption = value.caption[0] ? value.caption[0].plain_text : ''
  return { src, caption, expire }
}

const NotionImage = ({ value }: { value: any }) => {
  const { src: imageSrc, caption: imageCaption } = getMediaCtx(value)
  const {
    dim: { width, height },
  } = value || {}

  return (
    <figure>
      {width && height ? (
        <img
          src={imageSrc}
          alt={imageCaption}
          width={width}
          height={height}
          className="rounded"
        />
      ) : (
        <img src={imageSrc} alt={imageCaption} className="rounded" />
      )}
      {imageCaption && (
        <figcaption className="text-center">{imageCaption}</figcaption>
      )}
    </figure>
  )
}

export default NotionImage
