// One big sentence on its own screen — the "breathing" beat between denser sections.
// `text` may contain <em> to colour the key phrase; words rise in one by one.
export function renderQuietStatement(q) {
  if (!q) return ''

  let i = 0
  const wrap = (s) =>
    s
      .split(/(\s+)/)
      .map((tok) => (/^\s*$/.test(tok) ? tok : `<span class="w" style="--i:${i++}">${tok}</span>`))
      .join('')
  const words = q.text.replace(/<em>(.*?)<\/em>|([^<]+)/g, (m, inner, plain) =>
    inner !== undefined ? `<em>${wrap(inner)}</em>` : wrap(plain)
  )

  return `
    <section class="quiet quiet--${q.tone || 'white'}">
      <div class="container">
        ${q.eyebrow ? `<span class="eyebrow quiet-eyebrow" data-reveal>${q.eyebrow}</span>` : ''}
        <h2 class="quiet-text" data-reveal>${words}</h2>
      </div>
    </section>
  `
}
