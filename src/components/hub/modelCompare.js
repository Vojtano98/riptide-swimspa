import { formatPrice, formatNumber } from '../../utils/format.js'
import { briefFor } from './modelsGrid.js'

// Side-by-side table of every model in the series, built from the spec sheets
// (modelBriefs.js). Rows with no data for any model (e.g. massage jets on the pure
// swim pools) are dropped rather than shown as a wall of dashes.
export function renderModelCompare(hub) {
  const models = hub.models.filter((m) => !m.external)
  const briefs = models.map(briefFor)
  if (models.length < 2 || briefs.some((b) => !b)) return ''

  const rows = [
    ['Cena', (m) => (m.price == null ? null : `${formatPrice(m.price, m.currency)}${m.priceTier ? `<small class="cmp-tier">${m.priceTier}</small>` : ''}`)],
    ['Délka', (m, b) => `${formatNumber(b.length)} cm`],
    ['Šířka', (m, b) => `${formatNumber(b.width)} cm`],
    ['Hloubka', (m, b) => `${formatNumber(b.height)} cm`],
    ['Objem vody', (m, b) => `${formatNumber(b.volume)} l`],
    ['Posezení', (m, b) => b.seating],
    ['Masážní trysky', (m, b) => b.massageJets],
    ['Plavecké trysky', (m, b) => b.swimJets],
    ['Dvě teplotní zóny', (m, b) => (b.duo ? 'Ano' : null)],
  ]
    .map(([label, get]) => ({ label, values: models.map((m, i) => get(m, briefs[i])) }))
    .filter((r) => r.values.some((v) => v))

  const head = models
    .map((m, i) => `<th scope="col" data-col="${i}"><a href="${m.href}">${m.name}</a></th>`)
    .join('')
  const body = rows
    .map(
      (r) => `
      <tr>
        <th scope="row">${r.label}</th>
        ${r.values.map((v, i) => `<td data-col="${i}">${v || '—'}</td>`).join('')}
      </tr>`
    )
    .join('')

  const series = hub.breadcrumb[hub.breadcrumb.length - 1].label

  return `
    <section class="section section--white compare-section" id="srovnani">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">SROVNÁNÍ MODELŮ</span>
          <h2 class="h-section">Všechny modely ${series} vedle sebe.</h2>
          <p class="body-l">Klíčové parametry na jednom místě — údaje vycházejí z technických listů výrobce. Najeďte na sloupec a zvýrazní se celý model.</p>
        </div>
        <div class="compare-wrap" data-reveal>
          <table class="compare-table" id="compare-table">
            <caption class="sr-only">Srovnání modelů řady ${series}</caption>
            <thead><tr><th scope="col"><span class="sr-only">Parametr</span></th>${head}</tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>
    </section>
  `
}

export function bindModelCompare() {
  const table = document.getElementById('compare-table')
  if (!table) return
  let current = null
  const mark = (col) => {
    if (col === current) return
    current = col
    table.querySelectorAll('[data-col]').forEach((c) => c.classList.toggle('is-hot', col !== null && c.dataset.col === col))
  }
  table.addEventListener('mouseover', (e) => {
    const cell = e.target.closest('[data-col]')
    mark(cell ? cell.dataset.col : null)
  })
  table.addEventListener('mouseleave', () => mark(null))
}
