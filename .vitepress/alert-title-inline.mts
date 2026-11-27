import type MarkdownIt from 'markdown-it'

export default function alertTitleInline(md: MarkdownIt) {
  const renderAlert = md.renderer.rules.github_alert_open
  if (!renderAlert) return

  md.renderer.rules.github_alert_open = (tokens, index, options, env, renderer) => {
    const token = tokens[index]
    const title = token.meta?.title
    if (typeof title !== 'string') return renderAlert(tokens, index, options, env, renderer)

    const rawClean = title.replace(/^\*+|\*+$/g, '').trim()
    const isMarginNote = /^(?:边注|Margin\s*note|Side\s*note)$/i.test(rawClean)

    // A nested inline render must not append the document's footnote block.
    token.meta.title = md.renderInline(title, { ...env, footnotes: undefined })
    try {
      const html = renderAlert(tokens, index, options, env, renderer)
      return isMarginNote
        ? html.replace(/\bcustom-block\b/, 'custom-block book-margin-note')
        : html
    } finally {
      token.meta.title = title
    }
  }
}
