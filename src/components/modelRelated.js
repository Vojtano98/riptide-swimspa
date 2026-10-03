import { formatPrice } from '../utils/format.js'
import { withShopData } from '../data/shared/shopData.js'
import { atlas } from '../data/series/atlas.js'
import { atlantis } from '../data/series/atlantis.js'
import { aquaLife } from '../data/series/aquaLife.js'
import { easyLife } from '../data/series/easyLife.js'

// "Next step" block at the end of a model page: the other sizes in the same line (real
// product pictures, e-shop price), a link to the line's side-by-side comparison and one to
// the full catalogue.
const SERIES = { Atlas: atlas, Atlantis: atlantis, 'Aqua Life': aquaLife, 'Easy Life': easyLife }

export function renderModelRelated(model) {
  const series = SERIES[model.series]
  if (!series) return ''
  const others = withShopData(series.models).filter((m) => !m.href.includes(`/${model.slug}/`))
  if (!others.length) return ''

  const cards = others
    .map(
      (m) => `
      <a class="model-card related-card" href="${m.href}">
        <div class="model-card-media${m.thumb ? ' model-card-media--thumb' : ''}">
          ${m.thumb ? `<img src="${m.thumb.src}" alt="${m.imageAlt}" width="${m.thumb.width}" height="${m.thumb.height}" loading="lazy" decoding="async" />` : ''}
        </div>
        <div class="model-card-content">
          <h3 class="model-card-name">${m.name}</h3>
          <div class="model-card-price">${formatPrice(m.price, m.currency)}${m.priceTier ? `<span class="model-card-tier">${m.priceTier}</span>` : ''}</div>
        </div>
      </a>`
    )
    .join('')

  const seriesHref = series.models[0].href.replace(/[^/]+\/$/, '')
  return `
    <section class="section section--white" id="dalsi-modely">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">DALŠÍ VELIKOSTI</span>
          <h2 class="h-section">Další modely řady ${model.series}.</h2>
        </div>
        <div class="related-grid" data-reveal>${cards}</div>
        <div class="related-links" data-reveal>
          <a class="btn btn-outline" href="${seriesHref}#srovnani">Porovnat modely řady ${model.series}</a>
          <a class="btn btn-text" href="/produkty/">Všechny produkty →</a>
        </div>
      </div>
    </section>
  `
}
