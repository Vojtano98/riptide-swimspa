import { formatPrice } from '../utils/format.js'
import { icon } from '../utils/icons.js'

// Interactive trim picker: click a tab to switch tiers and see exactly what changes
// versus the base (cheapest) tier — instead of forcing a read of every row in the
// full table just to answer "what do I get for the extra money". The full table
// below still has the complete spec sheet for anyone who wants it.
export function renderTrimComparison(model) {
  const { specRows } = model
  const variants = [...model.variants].sort((a, b) => a.price - b.price)
  const base = variants[0]
  const initialId = (variants.find((v) => v.featured) || base).id

  const tabs = variants
    .map((v) => {
      const isActive = v.id === initialId
      return `
      <button class="trim-tab${isActive ? ' is-active' : ''}" data-trim-tab data-trim-id="${v.id}" type="button">
        ${v.featured ? '<span class="trim-tab-badge">Doporučeno</span>' : ''}
        <div class="trim-tab-head">
          <span class="trim-tab-name">${v.name}</span>
          <span class="trim-tab-price">${formatPrice(v.price, model.currency)}</span>
        </div>
        <ul class="trim-tab-highlights">
          ${v.highlights.map((h) => `<li>${icon('check', 13)}${h}</li>`).join('')}
        </ul>
        <span class="trim-tab-action">${isActive ? icon('check', 14) + ' Vybraná výbava' : 'Zobrazit rozdíly proti ostatním →'}</span>
      </button>
    `
    })
    .join('')

  const panels = variants
    .map((v) => {
      const diffRows = specRows.filter((row) => base.specs[row.key] !== v.specs[row.key])
      const delta =
        v.id === base.id
          ? `<p class="trim-delta-note">Toto je základní výbava ${model.name} — ostatní úrovně na ní staví.</p>`
          : `
            <div class="trim-delta">
              <span class="trim-delta-eyebrow">Co navíc oproti ${base.name}</span>
              <ul class="trim-delta-list">
                ${diffRows
                  .map(
                    (row) => `
                    <li>
                      <span class="trim-delta-label">${row.label}</span>
                      <span class="trim-delta-value">${base.specs[row.key]} → <strong>${v.specs[row.key]}</strong></span>
                    </li>
                  `
                  )
                  .join('')}
              </ul>
            </div>
          `

      return `
        <div class="trim-panel${v.id === initialId ? ' is-active' : ''}" data-trim-panel data-trim-id="${v.id}">
          ${v.featured ? '<span class="variant-badge">Doporučeno</span>' : ''}
          <div class="trim-panel-head">
            <span class="trim-panel-name">${v.name}</span>
            <span class="trim-panel-price">${formatPrice(v.price, model.currency)}</span>
          </div>
          <p class="trim-panel-desc">${v.description}</p>
          ${delta}
          <button class="btn btn-primary trim-panel-cta" data-open-inquiry>Poptat ${v.name}</button>
        </div>
      `
    })
    .join('')

  const rows = specRows
    .map((row) => {
      const values = variants.map((v) => v.specs[row.key] ?? '—')
      const differs = values.some((val) => val !== values[0])
      return `
      <tr class="${differs ? 'trim-row-differs' : 'trim-row-same'}">
        <th scope="row">
          ${row.label}
          ${differs ? '<span class="trim-row-flag">liší se</span>' : ''}
        </th>
        ${values.map((val) => `<td>${val}</td>`).join('')}
      </tr>
    `
    })
    .join('')

  return `
    <section class="section section--white" id="provedeni">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Provedení</span>
          <h2 class="h-section">Vyberte si výbavu ${model.name}.</h2>
          <p class="body-l">Proklikejte si jednotlivé úrovně výbavy a hned uvidíte, co konkrétně za vyšší cenu navíc dostanete — srovnání vychází přímo z technického listu výrobce.</p>
        </div>
        <div class="trim-tabs" data-reveal role="tablist">${tabs}</div>
        <div class="trim-panels" data-reveal>${panels}</div>
        <div class="trim-table-legend" data-reveal>
          <span class="trim-legend-item"><span class="trim-legend-swatch trim-legend-swatch--differs"></span> parametr se mezi provedeními liší</span>
          <span class="trim-legend-item"><span class="trim-legend-swatch trim-legend-swatch--same"></span> stejné ve všech provedeních</span>
        </div>
        <div class="trim-table-wrap" data-reveal>
          <table class="trim-table">
            <caption class="sr-only">Technické srovnání provedení ${model.name}</caption>
            <thead>
              <tr>
                <th scope="col">Parametr</th>
                ${variants.map((v) => `<th scope="col">${v.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </section>
  `
}

export function bindTrimComparison() {
  const tabs = document.querySelectorAll('[data-trim-tab]')
  const panels = document.querySelectorAll('[data-trim-panel]')
  if (!tabs.length) return

  const setActionText = (tab, isActive) => {
    const action = tab.querySelector('.trim-tab-action')
    if (!action) return
    action.innerHTML = isActive ? `${icon('check', 14)} Vybraná výbava` : 'Zobrazit rozdíly proti ostatním →'
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.trimId
      tabs.forEach((t) => {
        const isActive = t === tab
        t.classList.toggle('is-active', isActive)
        setActionText(t, isActive)
      })
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.trimId === id))
    })
  })
}
