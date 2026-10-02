import { formatPrice, formatNumber } from '../../utils/format.js'
import { modelBriefs } from '../../data/shared/modelBriefs.js'

export const briefFor = (m) => modelBriefs[m.href.split('/').filter(Boolean).pop()]

function renderSpecs(brief) {
  if (!brief) return ''
  const jets = brief.massageJets
    ? `<span><b>${brief.massageJets}</b> masážních trysek</span>`
    : `<span><b>${brief.swimJets}</b></span>`
  return `
    <div class="model-card-specs" aria-hidden="true">
      <span><b>${formatNumber(brief.length)}</b> cm</span>
      <span><b>${formatNumber(brief.volume)}</b> l</span>
      ${jets}
    </div>
  `
}

function renderTools(models) {
  const briefs = models.map(briefFor)
  if (models.length < 3 || briefs.some((b) => !b)) return ''
  const hasDuo = briefs.some((b) => b.duo)
  return `
    <div class="models-tools" data-reveal>
      <div class="models-tools-group" role="group" aria-label="Řazení modelů">
        <span class="models-tools-label">Řadit</span>
        <button type="button" class="chip is-active" data-sort="default" aria-pressed="true">Doporučené</button>
        <button type="button" class="chip" data-sort="price" aria-pressed="false">Nejlevnější</button>
        <button type="button" class="chip" data-sort="length" aria-pressed="false">Nejdelší</button>
        <button type="button" class="chip" data-sort="volume" aria-pressed="false">Největší objem</button>
      </div>
      ${
        hasDuo
          ? `<button type="button" class="chip chip--filter" data-filter-duo aria-pressed="false">Dvě teplotní zóny (Duo)</button>`
          : ''
      }
    </div>
  `
}

export function renderModelsGrid(hub) {
  const cards = hub.models
    .map((m, i) => {
      const brief = briefFor(m)
      return `
      <a class="model-card" href="${m.href}" data-reveal data-index="${i}" data-price="${m.price}"
        data-length="${brief ? brief.length : 0}" data-volume="${brief ? brief.volume : 0}" data-duo="${brief && brief.duo ? 1 : 0}"${
          m.external ? ' target="_blank" rel="noopener"' : ''
        }>
        <div class="model-card-media${m.external ? ' model-card-media--contain' : ''}">
          <img src="${m.image}" alt="${m.imageAlt}" loading="lazy" decoding="async" />
          ${m.brand ? `<span class="model-card-brand">${m.brand}</span>` : ''}
          ${m.external ? '' : renderSpecs(brief)}
        </div>
        <div class="model-card-content">
          <h3 class="model-card-name">${m.name}</h3>
          <p class="model-card-tagline">${m.tagline}</p>
          <div class="model-card-price">od ${formatPrice(m.price, m.currency)}</div>
          <span class="model-card-cta">${m.external ? 'Zobrazit na SwimSpa.cz ↗' : 'Zobrazit detail →'}</span>
        </div>
      </a>
    `
    })
    .join('')

  return `
    <section class="section section--white" id="modely">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${hub.intro.eyebrow}</span>
          <h2 class="h-section">${hub.intro.headline}</h2>
          <p class="body-l">${hub.intro.text}</p>
        </div>
        ${renderTools(hub.models)}
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
  const tools = document.querySelector('.models-tools')
  if (!grid || !tools) return

  const cards = [...grid.querySelectorAll('.model-card')]
  let sort = 'default'
  let duoOnly = false

  const apply = () => {
    const key = { price: 'price', length: 'length', volume: 'volume' }[sort]
    const ranked = [...cards].sort((a, b) =>
      key
        ? (key === 'price' ? 1 : -1) * (Number(a.dataset[key]) - Number(b.dataset[key])) || a.dataset.index - b.dataset.index
        : a.dataset.index - b.dataset.index
    )
    ranked.forEach((card, i) => {
      card.style.order = i
      card.hidden = duoOnly && card.dataset.duo !== '1'
    })
  }

  tools.addEventListener('click', (e) => {
    const sortBtn = e.target.closest('[data-sort]')
    const duoBtn = e.target.closest('[data-filter-duo]')
    if (sortBtn) {
      sort = sortBtn.dataset.sort
      tools.querySelectorAll('[data-sort]').forEach((b) => {
        const on = b === sortBtn
        b.classList.toggle('is-active', on)
        b.setAttribute('aria-pressed', String(on))
      })
    } else if (duoBtn) {
      duoOnly = !duoOnly
      duoBtn.classList.toggle('is-active', duoOnly)
      duoBtn.setAttribute('aria-pressed', String(duoOnly))
    } else return
    apply()
  })
}
