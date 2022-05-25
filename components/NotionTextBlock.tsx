export function Text({ text }: { text: any }) {
  if (!text) return null

  return text.map((value: any, index: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : null,
          code
            ? 'rounded bg-sky-300/20 px-1 font-mono text-sm text-sky-500 dark:bg-sky-800/30 dark:text-sky-400'
            : null,
          italic ? 'italic' : null,
          strikethrough ? 'line-through' : null,
          underline ? 'underline' : null,
        ]
          .filter((x) => x) // remove nulls
          .join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} target="_blank" rel="noopener noreferrer">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}
