import { formatPrice } from '../utils/format.js'
import { icon } from '../utils/icons.js'

// Side-by-side trim comparison table (Pro Premium / Pro Luxury / Hydro) — mirrors how
// the real Riptide spec sheets present each model, since the trims genuinely differ in
// pump power, jet count and control panel, not just price.
export function renderTrimComparison(model) {
  const { variants, specRows } = model

  const cols = variants
    .map(
      (v, i) => `
      <div class="trim-col${i === 0 ? ' is-featured' : ''}">
        ${v.featured ? '<span class="variant-badge">Doporučeno</span>' : ''}
        <div class="trim-col-name">${v.name}</div>
        <div class="trim-col-price">${formatPrice(v.price, model.currency)}</div>
        <ul class="trim-col-highlights">
          ${v.highlights.map((h) => `<li>${icon('check', 14)}${h}</li>`).join('')}
        </ul>
        <button class="btn btn-primary trim-col-cta" data-open-inquiry>Poptat ${v.name}</button>
      </div>
    `
    )
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
          <p class="body-l">Tři úrovně výbavy se liší výkonem plaveckých čerpadel, počtem trysek i ovládacím panelem — srovnání níže vychází přímo z technického listu výrobce.</p>
        </div>
        <div class="trim-cols" data-reveal>${cols}</div>
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
