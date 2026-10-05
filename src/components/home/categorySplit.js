import { photo } from '../../utils/photo.js'
import { formatPrice } from '../../utils/format.js'
import { withShopData } from '../../data/shared/shopData.js'
import { modelBriefs } from '../../data/shared/modelBriefs.js'
import { atlas } from '../../data/series/atlas.js'
import { atlantis } from '../../data/series/atlantis.js'
import { aquaLife } from '../../data/series/aquaLife.js'
import { easyLife } from '../../data/series/easyLife.js'

// Hard facts under each series tile come straight from the model data, so they can never
// drift from the product pages: number of sizes, length range and the lowest listed price.
const SERIES = { atlas, atlantis, 'aqua-life': aquaLife, 'easy-life': easyLife }
const metres = (cm) => (cm / 100).toFixed(1).replace('.', ',')
const sizes = (n) => `${n} ${n === 1 ? 'velikost' : n < 5 ? 'velikosti' : 'velikostí'}`

function facts(slug) {
  const series = SERIES[slug]
  if (!series) return []
  const models = withShopData(series.models)
  const lengths = models.map((m) => modelBriefs[m.href.split('/').filter(Boolean).pop()]?.length).filter(Boolean)
  const prices = models.map((m) => m.price).filter((p) => p != null)
  return [
    sizes(models.length),
    lengths.length ? `${metres(Math.min(...lengths))}–${metres(Math.max(...lengths))} m` : null,
    prices.length ? `od ${formatPrice(Math.min(...prices), 'Kč')}` : null,
  ].filter(Boolean)
}

export function renderCategorySplit(home) {
  const cards = home.categories
    .map(
      (c) => `
      <a class="category-tile" href="${c.href}" data-reveal="scale">
        ${photo(c.image, c.imageAlt, { sizes: '(max-width: 700px) 100vw, 50vw' })}
        <div class="category-tile-content">
          <span class="eyebrow">${c.eyebrow}</span>
          <h3 class="category-tile-title">${c.title}</h3>
          <p class="category-tile-text">${c.text}</p>
          <ul class="category-tile-facts">${facts(c.slug).map((f) => `<li>${f}</li>`).join('')}</ul>
          <span class="category-tile-cta">${c.cta} →</span>
        </div>
      </a>
    `
    )
    .join('')

  const intro = home.categoriesIntro
    ? `
      <div class="section-head" data-reveal>
        <span class="eyebrow">${home.categoriesIntro.eyebrow}</span>
        <h2 class="h-section">${home.categoriesIntro.headline}</h2>
        <p class="body-l">${home.categoriesIntro.text}</p>
      </div>
    `
    : ''

  return `
    <section class="section section--white" id="kategorie">
      <div class="container">
        ${intro}
        <div class="category-split">${cards}</div>
        <p class="category-split-foot" data-reveal>Nejste si jistí? <a href="#pruvodce">Odpovězte na čtyři otázky</a> a ukážeme modely, které vám sedí.</p>
      </div>
    </section>
  `
}
