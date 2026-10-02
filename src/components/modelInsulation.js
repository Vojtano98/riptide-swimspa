// The five Platinum Lock layers (names + descriptions from SwimSpa.cz) as a pinned
// scroll sequence: while the stage is pinned, scroll position "builds" the exploded
// schematic one layer at a time and swaps the description beside it. The drawing is a
// schematic of the order only — no scale, not a technical cross-section.
// Without JS / with reduced motion the layers simply show as a static list + full diagram.
const SLABS = [
  { h: 26 }, // 1 cover
  { h: 24 }, // 2 inner foam
  { h: 14 }, // 3 Thermo Shield
  { h: 18 }, // 4 side insulation
  { h: 22 }, // 5 base
]

function slab(i) {
  const cx = 260
  const y = 50 + i * 86
  const w = 190
  const d = 28
  const t = SLABS[i].h
  const top = `${cx},${y - d} ${cx + w},${y} ${cx},${y + d} ${cx - w},${y}`
  const left = `${cx - w},${y} ${cx},${y + d} ${cx},${y + d + t} ${cx - w},${y + t}`
  const right = `${cx + w},${y} ${cx},${y + d} ${cx},${y + d + t} ${cx + w},${y + t}`
  return `
    <g class="ins-slab" data-slab="${i}">
      <polygon class="ins-face ins-face--l" points="${left}" />
      <polygon class="ins-face ins-face--r" points="${right}" />
      <polygon class="ins-face ins-face--t" points="${top}" />
      <text class="ins-slab-n" x="${cx}" y="${y + 6}" text-anchor="middle">${i + 1}</text>
    </g>`
}

export function renderModelInsulation(model) {
  const ins = model.insulation
  if (!ins?.layers?.length) return ''

  const items = ins.layers
    .map(
      (l, i) => `
      <article class="ins-item" data-ins-item="${i}">
        <span class="ins-item-n">${i + 1}<small> / ${ins.layers.length}</small></span>
        <h3 class="ins-item-name">${l.name}</h3>
        <p class="ins-item-text">${l.text}</p>
      </article>`
    )
    .join('')

  return `
    <section class="ins" id="izolace" data-ins>
      <div class="ins-stage">
        <div class="container ins-grid">
          <div class="ins-copy">
            <span class="eyebrow">IZOLACE</span>
            <h2 class="h-section ins-title">${ins.label}</h2>
            <div class="ins-items">${items}</div>
            <div class="ins-dots" aria-hidden="true">${ins.layers.map(() => '<span><i></i></span>').join('')}</div>
          </div>
          <div class="ins-diagram">
            <svg viewBox="0 0 520 460" role="img" aria-label="Schéma pořadí pěti vrstev izolace Platinum Lock">
              ${SLABS.map((_, i) => slab(i)).join('')}
            </svg>
            <p class="ins-note">Schematické znázornění pořadí vrstev, bez měřítka.</p>
          </div>
        </div>
      </div>
    </section>
  `
}

export function bindModelInsulation() {
  const section = document.querySelector('[data-ins]')
  if (!section) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return

  const slabs = [...section.querySelectorAll('[data-slab]')]
  const items = [...section.querySelectorAll('[data-ins-item]')]
  const dots = [...section.querySelectorAll('.ins-dots i')]
  const n = slabs.length
  section.classList.add('is-scrub')

  // Layers land during the first 75 % of the pinned range; the rest holds the full stack.
  const paint = (p) => {
    const x = Math.min(1, p / 0.75) * n
    let active = 0
    slabs.forEach((s, i) => {
      const t = Math.min(1, Math.max(0, x - i))
      s.style.opacity = t
      s.style.transform = `translateY(${(1 - t) * -46}px)`
      if (t > 0) active = i
    })
    slabs.forEach((s, i) => s.classList.toggle('is-active', i === active))
    items.forEach((el, i) => el.classList.toggle('is-active', i === active))
    dots.forEach((d, i) => (d.style.transform = `scaleX(${Math.min(1, Math.max(0, x - i))})`))
  }

  let target = 0
  let shown = 0
  let raf = null
  const tick = () => {
    const delta = target - shown
    if (Math.abs(delta) < 0.0008) {
      shown = target
      raf = null
      paint(shown)
      return
    }
    shown += delta * 0.14
    paint(shown)
    raf = requestAnimationFrame(tick)
  }
  const update = () => {
    const rect = section.getBoundingClientRect()
    if (rect.bottom < -innerHeight || rect.top > innerHeight * 2) return
    const scrollable = rect.height - innerHeight
    target = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1
    if (raf === null) raf = requestAnimationFrame(tick)
  }

  paint(0)
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
}
