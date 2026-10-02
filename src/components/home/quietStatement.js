// One big sentence on its own screen — the "breathing" beat between denser sections.
// `text` may contain <em> to colour the key phrase; words rise in one by one.
export function renderQuietStatement(q) {
  if (!q) return ''

  let i = 0
  const wrap = (s) =>
    s
      .split(/(\s+)/)
      .map((tok) => {
        if (/^\s*$/.test(tok)) return tok
        const html = `<span class="w" style="--i:${i}">${tok}</span>`
        // A beat of silence after each sentence so the three thoughts land one by one.
        i += /\.$/.test(tok) ? 3 : 1
        return html
      })
      .join('')
  const words = q.text.replace(/<em>(.*?)<\/em>|([^<]+)/g, (m, inner, plain) =>
    inner !== undefined ? `<em>${wrap(inner)}</em>` : wrap(plain)
  )

  return `
    <section class="quiet quiet--${q.tone || 'white'}">
      <div class="container">
        ${q.eyebrow ? `<span class="eyebrow quiet-eyebrow" data-reveal>${q.eyebrow}</span>` : ''}
        <h2 class="quiet-text">${words}</h2>
      </div>
    </section>
  `
}

// Plays the word-by-word reveal when the sentence is genuinely on screen (not a screen
// early like the generic reveal) and resets after it has fully left, so scrolling back
// plays it again.
export function bindQuietStatements() {
  const texts = document.querySelectorAll('.quiet-text')
  if (!texts.length || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= 0.6) target.classList.add('is-playing')
        else if (!isIntersecting) target.classList.remove('is-playing')
      })
    },
    { threshold: [0, 0.6] }
  )
  texts.forEach((el) => {
    el.classList.add('is-armed')
    observer.observe(el)
  })
}
