import { formatPrice } from '../utils/format.js'
import { icon } from '../utils/icons.js'
import { sortVariants, initialVariant } from '../utils/variants.js'

// Interactive trim picker, kept compact: a segmented control (name + price) switches tiers;
// one panel shows what that tier is (highlights) and what changes versus the base tier.
// The complete parameter sheet sits in a collapsed "Kompletní parametry" block — by default
// it lists only the selected tier (one column, easy on a phone), with a switch to the
// side-by-side comparison of all tiers.
export function renderTrimComparison(model) {
  const { specRows } = model
  const variants = sortVariants(model.variants)
  const base = variants[0]
  const initialId = initialVariant(model).id

  const tabs = variants
    .map((v) => {
      const isActive = v.id === initialId
      return `
      <button class="trim-tab${isActive ? ' is-active' : ''}" data-trim-tab data-trim-id="${v.id}" data-trim-name="${v.name}" data-trim-price="${v.price ?? ''}" type="button" role="tab" aria-selected="${isActive}">
        <span class="trim-tab-name">${v.name}</span>
        <span class="trim-tab-price">${formatPrice(v.price, model.currency)}</span>
        ${v.featured ? '<span class="trim-tab-badge">Doporučeno</span>' : ''}
      </button>
    `
    })
    .join('')

  const panels = variants
    .map((v) => {
      const diffRows = specRows.filter((row) => base.specs[row.key] !== v.specs[row.key])
      const delta =
        v.id === base.id
          ? `<p class="trim-delta-note">Základní výbava ${model.name} — ostatní úrovně na ní staví.</p>`
          : `
            <div class="trim-delta">
              <span class="trim-delta-eyebrow">Navíc oproti ${base.name}</span>
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
        <div class="trim-panel${v.id === initialId ? ' is-active' : ''}" data-trim-panel data-trim-id="${v.id}" role="tabpanel">
          <div class="trim-panel-head">
            <span class="trim-panel-name">${v.name}</span>
            <span class="trim-panel-price">${formatPrice(v.price, model.currency)}</span>
          </div>
          <p class="trim-panel-desc">${v.description}</p>
          <ul class="trim-chips">
            ${v.highlights.map((h) => `<li>${icon('check', 13)}${h}</li>`).join('')}
          </ul>
          ${delta}
          ${v.price == null ? `<p class="trim-panel-ask">Cenu výbavy ${v.name} vám rádi pošleme — nezávazně, do 24 hodin.</p>` : ''}
          <button class="btn btn-primary trim-panel-cta" data-open-inquiry data-variant-name="${v.name}">${v.price == null ? `Poptat cenu ${v.name}` : `Poptat ${v.name}`}</button>
          <p class="trim-panel-note">Odpovídáme do 24 hodin · Nezávazná kalkulace</p>
        </div>
      `
    })
    .join('')

  const lists = variants
    .map(
      (v) => `
      <dl class="spec-list${v.id === initialId ? ' is-active' : ''}" data-spec-list data-trim-id="${v.id}">
        ${specRows
          .map((row) => {
            const differs = variants.some((o) => o.specs[row.key] !== v.specs[row.key])
            return `<div class="spec-row${differs ? ' is-diff' : ''}"><dt>${row.label}</dt><dd>${v.specs[row.key] ?? '—'}</dd></div>`
          })
          .join('')}
      </dl>
    `
    )
    .join('')

  const rows = specRows
    .map((row) => {
      const values = variants.map((v) => v.specs[row.key] ?? '—')
      const differs = values.some((val) => val !== values[0])
      return `
      <tr class="${differs ? 'trim-row-differs' : 'trim-row-same'}">
        <th scope="row">${row.label}</th>
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
        </div>
        <div class="cfg" data-reveal>
          <div class="trim-tabs" role="tablist" aria-label="Provedení výbavy">${tabs}</div>
          <div class="trim-panels">${panels}</div>
        </div>
        <details class="specs" id="specifikace" data-specs data-reveal>
          <summary class="specs-summary">
            <span>Kompletní parametry</span>
            <svg class="specs-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="specs-body">
            <div class="about-switch specs-switch" role="group" aria-label="Zobrazení parametrů">
              <button type="button" class="is-active" data-specs-view="one" aria-pressed="true">Vybraná výbava</button>
              <button type="button" data-specs-view="all" aria-pressed="false">Porovnat všechny</button>
            </div>
            <div class="specs-view is-active" data-specs-pane="one">
              <p class="specs-legend"><span class="specs-legend-dot"></span> liší se mezi provedeními</p>
              ${lists}
            </div>
            <div class="specs-view" data-specs-pane="all">
              <p class="specs-legend"><span class="specs-legend-dot"></span> parametr se mezi provedeními liší</p>
              <div class="trim-table-wrap">
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
          </div>
        </details>
      </div>
    </section>
  `
}

export function bindTrimComparison() {
  const tabs = document.querySelectorAll('[data-trim-tab]')
  const panels = document.querySelectorAll('[data-trim-panel]')
  if (!tabs.length) return
  const lists = document.querySelectorAll('[data-spec-list]')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.trimId
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab)
        t.setAttribute('aria-selected', String(t === tab))
      })
      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.trimId === id))
      lists.forEach((l) => l.classList.toggle('is-active', l.dataset.trimId === id))
      document.dispatchEvent(
        new CustomEvent('trim:change', {
          detail: { id, name: tab.dataset.trimName, price: tab.dataset.trimPrice === '' ? null : Number(tab.dataset.trimPrice) },
        })
      )
    })
  })

  // Parameter sheet: one-tier list <-> side-by-side table.
  const specs = document.querySelector('[data-specs]')
  if (specs) {
    const switchBtns = specs.querySelectorAll('[data-specs-view]')
    switchBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
        switchBtns.forEach((b) => {
          b.classList.toggle('is-active', b === btn)
          b.setAttribute('aria-pressed', String(b === btn))
        })
        specs.querySelectorAll('[data-specs-pane]').forEach((p) => p.classList.toggle('is-active', p.dataset.specsPane === btn.dataset.specsView))
      })
    )
    // "Technické parametry" / "Zobrazit všechny specifikace" links open the sheet first.
    const open = () => (specs.open = true)
    document.addEventListener('click', (e) => {
      if (e.target.closest('a[href$="#specifikace"]')) open()
    })
    if (location.hash === '#specifikace') open()
  }
}
