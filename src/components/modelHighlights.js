// "Equipment at a glance": the handful of specs people compare first, as big numbers,
// for the equipment level currently selected in the picker above (trim:change swaps it).
import { sortVariants, initialVariant } from '../utils/variants.js'

const CANDIDATES = ['seating', 'capacity', 'massageJets', 'swimJets', 'tenSpeed', 'swimPumps', 'weight']

export function renderModelHighlights(model) {
  const variants = sortVariants(model.variants)
  const initial = initialVariant(model)
  const labels = Object.fromEntries(model.specRows.map((r) => [r.key, r.label]))

  const sets = variants
    .map((v) => {
      const cards = CANDIDATES.filter((k) => v.specs[k] && labels[k])
        .slice(0, 6)
        .map(
          (k) => `
          <div class="hl-card">
            <span class="hl-label">${labels[k]}</span>
            <span class="hl-value">${v.specs[k]}</span>
          </div>`
        )
        .join('')
      return `
        <div class="hl-set${v.id === initial.id ? ' is-active' : ''}" data-hl-set="${v.id}">
          <h3 class="hl-title">${model.name} · ${v.name}</h3>
          <div class="hl-grid">${cards}</div>
        </div>`
    })
    .join('')

  return `
    <section class="section section--tint" id="vybava">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">VÝBAVA NA PRVNÍ POHLED</span>
          <h2 class="h-section">Co dostanete.</h2>
        </div>
        <div class="hl-sets" data-reveal>${sets}</div>
      </div>
    </section>
  `
}

export function bindModelHighlights() {
  const sets = document.querySelectorAll('[data-hl-set]')
  if (!sets.length) return
  document.addEventListener('trim:change', (e) => {
    sets.forEach((s) => s.classList.toggle('is-active', s.dataset.hlSet === e.detail.id))
  })
}
