// One big sentence on its own screen — the "breathing" beat between denser sections.
// `text` may contain <em> to colour the key phrase.
//
// The section is a tall scroll track with a sticky stage (same mechanics as the jet
// moment): while it is pinned, scroll position decides how many words are revealed, so
// the visitor sets the pace and nothing plays on a timer. bindQuietStatements() eases
// the revealed amount toward the scroll position so wheel/trackpad jumps glide.
export function renderQuietStatement(q) {
  if (!q) return ''

  let i = 0
  const wrap = (s) =>
    s
      .split(/(\s+)/)
      .map((tok) => {
        if (/^\s*$/.test(tok)) return tok
        const html = `<span class="w" style="--i:${i}">${tok}</span>`
        // A beat after each sentence so the thoughts land one by one.
        i += /\.$/.test(tok) ? 2 : 1
        return html
      })
      .join('')

  // Punctuation that directly follows an <em> is glued inside its last word, so a line
  // can never break between "154 cm" and the full stop.
  const words = q.text.replace(/<em>(.*?)<\/em>([.,;:!?…]*)|([^<]+)/g, (m, inner, punct, plain) => {
    if (inner === undefined) return wrap(plain)
    let html = wrap(inner)
    if (punct) {
      html = html.replace(/<\/span>$/, `<span class="pu">${punct}</span></span>`)
      if (punct.includes('.')) i += 1
    }
    return `<em>${html}</em>`
  })

  return `
    <section class="quiet quiet--${q.tone || 'white'}" data-quiet data-quiet-total="${i}">
      <div class="quiet-stage">
        <div class="container">
          ${q.eyebrow ? `<span class="eyebrow quiet-eyebrow">${q.eyebrow}</span>` : ''}
          <h2 class="quiet-text">${words}</h2>
        </div>
      </div>
    </section>
  `
}

const LEAD = 0.4

export function bindQuietStatements() {
  const sections = [...document.querySelectorAll('[data-quiet]')]
  if (!sections.length) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || navigator.connection?.saveData) return // stays a plain static section

  const states = sections.map((section) => {
    section.classList.add('is-scrub')
    return {
      section,
      eyebrow: section.querySelector('.quiet-eyebrow'),
      words: [...section.querySelectorAll('.w')],
      total: Number(section.dataset.quietTotal) + 1.6,
      target: 0,
      shown: 0,
      raf: null,
    }
  })

  const paint = (s) => {
    // Words finish revealing at 70 % of the range; the rest is time to read it.
    const x = Math.min(1, s.shown / 0.7) * s.total
    s.words.forEach((w) => {
      const t = Math.min(1, Math.max(0, (x - Number(w.style.getPropertyValue('--i'))) / 1.6))
      w.style.opacity = t
      w.style.transform = `translateY(${(1 - t) * 0.45}em)`
    })
    if (s.eyebrow) s.eyebrow.style.opacity = Math.min(1, x / 1.2)
  }

  const tick = (s) => {
    const delta = s.target - s.shown
    if (Math.abs(delta) < 0.0008) {
      s.shown = s.target
      s.raf = null
      paint(s)
      return
    }
    s.shown += delta * 0.14
    paint(s)
    s.raf = requestAnimationFrame(() => tick(s))
  }

  const update = () => {
    states.forEach((s) => {
      const rect = s.section.getBoundingClientRect()
      if (rect.bottom < -innerHeight || rect.top > innerHeight * 2) return
      // Progress starts LEAD of a screen *before* the stage pins, so the first words are
      // already appearing while the section is still scrolling in (no empty white screen), but
      // only once the sentence itself has come up into the screen.
      const lead = innerHeight * LEAD
      const scrollable = rect.height - innerHeight + lead
      s.target = scrollable > 0 ? Math.min(1, Math.max(0, (lead - rect.top) / scrollable)) : 1
      if (s.raf === null) s.raf = requestAnimationFrame(() => tick(s))
    })
  }

  states.forEach((s) => paint(s))
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
}
