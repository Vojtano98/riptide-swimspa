import { formatPrice, formatNumber } from '../../utils/format.js'
import { modelBriefs } from '../../data/shared/modelBriefs.js'
import { tiers, tierOrder } from '../../data/shared/tiers.js'

export const briefFor = (m) => modelBriefs[m.href.split('/').filter(Boolean).pop()]

function renderSpecs(brief) {
  if (!brief) return ''
  const jets = brief.massageJets
    ? `<span><b>${brief.massageJets.split(' + ')[0]}</b> masážních trysek</span>`
    : `<span><b>${brief.swimJets}</b></span>`
  return `
    <div class="model-card-specs" aria-hidden="true">
      <span><b>${formatNumber(brief.length)}</b> cm</span>
      <span><b>${formatNumber(brief.volume)}</b> l</span>
      ${jets}
    </div>
  `
}

function renderTools(models, seriesFilter) {
  const briefs = models.map(briefFor)
  if (models.length < 3 || briefs.some((b) => !b)) return ''
  const hasDuo = briefs.some((b) => b.duo)
  // Toolbar: series as a segmented control (left), "Duo" switch + sort menu (right).
  const series = seriesFilter?.length
    ? `
      <div class="seg" role="group" aria-label="Řada">
        <button type="button" class="seg-btn is-active" data-series-filter="" aria-pressed="true">Všechny</button>
        ${seriesFilter
          .map((n) => `<button type="button" class="seg-btn" data-series-filter="${n}" aria-pressed="false">${n}</button>`)
          .join('')}
      </div>`
    : '<span></span>'
  return `
    <div class="models-toolbar" data-reveal>
      ${series}
      <div class="models-toolbar-right">
        ${
          hasDuo
            ? `<button type="button" class="switch" data-filter-duo role="switch" aria-checked="false"><span class="switch-track"><span class="switch-knob"></span></span>Dvě teplotní zóny</button>`
            : ''
        }
        <label class="sort-select">
          <span class="sr-only">Řadit</span>
          <select data-sort-select aria-label="Řadit modely">
            <option value="default">Doporučené</option>
            <option value="price">Cena: od nejnižší</option>
            <option value="length">Nejdelší</option>
            <option value="volume">Největší objem</option>
          </select>
        </label>
      </div>
    </div>
  `
}

// The listed price belongs to one equipment level per model (the tag next to it), so the
// levels are explained right where the prices are compared.
function renderTierLegend(models) {
  const names = tierOrder.filter((n) => n !== 'Hydro' || models.some((m) => m.priceTier === 'Hydro'))
  if (!models.some((m) => m.priceTier)) return ''
  return `
    <details class="tier-legend" data-reveal>
      <summary>Co znamená ${names.join(', ').replace(/, ([^,]*)$/, ' a $1')}?</summary>
      <div class="tier-legend-body">
        <dl>
          ${names.map((n) => `<div><dt>${n}</dt><dd><strong>${tiers[n].summary}.</strong> ${tiers[n].who}</dd></div>`).join('')}
        </dl>
        <p>Štítek u ceny říká, pro kterou výbavu cena platí. Ostatní výbavy vám naceníme na dotaz — vana, izolace i ovládání jsou u všech stejné.</p>
      </div>
    </details>
  `
}

export function renderModelsGrid(hub) {
  const cards = hub.models
    .map((m, i) => {
      const brief = briefFor(m)
      return `
      <a class="model-card" href="${m.href}" data-reveal data-index="${i}" data-price="${m.price ?? ''}"
        data-length="${brief ? brief.length : 0}" data-volume="${brief ? brief.volume : 0}" data-duo="${brief && brief.duo ? 1 : 0}" data-series="${m.series || ''}"${
          m.external ? ' target="_blank" rel="noopener"' : ''
        }>
        <div class="model-card-media${m.external ? ' model-card-media--contain' : ''}${m.thumb ? ' model-card-media--thumb' : ''}">
          ${
            m.thumb
              ? `<img src="${m.thumb.src}" alt="${m.imageAlt}" width="${m.thumb.width}" height="${m.thumb.height}" loading="lazy" decoding="async" />`
              : `<img src="${m.image}" alt="${m.imageAlt}" loading="lazy" decoding="async" />`
          }
          ${m.brand ? `<span class="model-card-brand">${m.brand}</span>` : ''}
          ${m.external ? '' : renderSpecs(brief)}
        </div>
        <div class="model-card-content">
          <h3 class="model-card-name">${m.name}</h3>
          <p class="model-card-tagline">${m.tagline}</p>
          <div class="model-card-price">${formatPrice(m.price, m.currency)}${m.priceTier ? `<span class="model-card-tier">${m.priceTier}</span>` : ''}</div>
          <span class="model-card-cta">${m.external ? 'Zobrazit na SwimSpa.cz ↗' : 'Zobrazit detail →'}</span>
        </div>
      </a>
    `
    })
    .join('')

  return `
    <section class="section section--white" id="modely">
      <div class="container">
        ${
          hub.noHead
            ? `<div class="section-head" data-reveal><h2 class="h-section">Modely řady ${hub.breadcrumb[hub.breadcrumb.length - 1].label}.</h2></div>`
            : `<div class="section-head" data-reveal>
          <span class="eyebrow">${hub.intro.eyebrow}</span>
          <${hub.headingTag || 'h2'} class="h-section">${hub.intro.headline}</${hub.headingTag || 'h2'}>
          <p class="body-l">${hub.intro.text}</p>
        </div>`
        }
        ${renderTools(hub.models, hub.seriesFilter)}
        ${renderTierLegend(hub.models)}
        ${hub.seriesFilter ? `<p class="models-count" aria-live="polite" data-models-count></p>` : ''}
        <div class="models-grid">${cards}</div>
        ${hub.intro.note ? `<p class="models-note" data-reveal>${hub.intro.note}</p>` : ''}
      </div>
    </section>
  `
}

// Re-orders / filters the already-rendered cards in place (CSS `order` + [hidden]) —
// no re-render, so images, reveal state and scroll position are untouched.
export function bindModelsGrid() {
  const grid = document.querySelector('.models-grid')
  const tools = document.querySelector('.models-toolbar')
  if (!grid || !tools) return

  const cards = [...grid.querySelectorAll('.model-card')]
  let sort = 'default'
  let duoOnly = false
  let series = ''
  const countEl = document.querySelector('[data-models-count]')

  const num = (card, key) => (card.dataset[key] === '' ? Infinity : Number(card.dataset[key]))

  const apply = () => {
    const key = { price: 'price', length: 'length', volume: 'volume' }[sort]
    const ranked = [...cards].sort((a, b) =>
      key
        ? (key === 'price' ? 1 : -1) * (num(a, key) - num(b, key)) || a.dataset.index - b.dataset.index
        : a.dataset.index - b.dataset.index
    )
    ranked.forEach((card, i) => {
      card.style.order = i
      card.hidden = (duoOnly && card.dataset.duo !== '1') || (series && card.dataset.series !== series)
    })
    if (countEl) {
      const n = cards.filter((c) => !c.hidden).length
      countEl.textContent = `Zobrazeno ${n} z ${cards.length} modelů`
    }
  }

  tools.addEventListener('click', (e) => {
    const duoBtn = e.target.closest('[data-filter-duo]')
    const seriesBtn = e.target.closest('[data-series-filter]')
    if (seriesBtn) {
      series = seriesBtn.dataset.seriesFilter
      tools.querySelectorAll('[data-series-filter]').forEach((b) => {
        const on = b === seriesBtn
        b.classList.toggle('is-active', on)
        b.setAttribute('aria-pressed', String(on))
      })
    } else if (duoBtn) {
      duoOnly = !duoOnly
      duoBtn.classList.toggle('is-on', duoOnly)
      duoBtn.setAttribute('aria-checked', String(duoOnly))
    } else return
    apply()
  })
  tools.querySelector('[data-sort-select]')?.addEventListener('change', (e) => {
    sort = e.target.value
    apply()
  })
  apply()
}
