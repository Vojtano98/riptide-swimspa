import { formatPrice, formatNumber } from '../../utils/format.js'
import { modelBriefs } from '../../data/shared/modelBriefs.js'
import { home } from '../../data/riptideHome.js'
import { photo } from '../../utils/photo.js'

// Header of a series page: the line's photo, its headline (the page's h1), a few facts taken
// from the spec sheets / e-shop prices, and a switch to the other lines.
const slugOf = (href) => href.split('/').filter(Boolean).pop()
const LINES = [
  ['Atlas', '/atlas/'],
  ['Atlantis', '/atlantis/'],
  ['Aqua Life', '/aqua-life/'],
  ['Easy Life', '/easy-life/'],
]

export function renderSeriesHero(series) {
  const name = series.breadcrumb[series.breadcrumb.length - 1].label
  const href = LINES.find(([n]) => n === name)?.[1]
  const tile = home.categories.find((c) => c.href === href)
  const briefs = series.models.map((m) => modelBriefs[slugOf(m.href)]).filter(Boolean)
  const prices = series.models.map((m) => m.price).filter((p) => p != null)

  const facts = []
  facts.push(`${series.models.length} ${series.models.length < 5 ? 'modely' : 'modelů'}`)
  if (briefs.length) {
    const len = briefs.map((b) => b.length)
    const h = briefs.map((b) => b.height)
    facts.push(`délka ${formatNumber(Math.round(Math.min(...len)))}–${formatNumber(Math.round(Math.max(...len)))} cm`)
    facts.push(Math.min(...h) === Math.max(...h) ? `výška ${Math.min(...h)} cm` : `výška ${Math.min(...h)}–${Math.max(...h)} cm`)
    facts.push(briefs.some((b) => b.massageJets) ? 'plavání + hydromasáž' : 'čistě plavecký bazén')
  }
  if (prices.length) facts.push(`od ${formatPrice(Math.min(...prices))}`)

  const switcher = LINES.map(
    ([n, h]) => `<a class="seg-btn${n === name ? ' is-active' : ''}" href="${h}"${n === name ? ' aria-current="page"' : ''}>${n}</a>`
  ).join('')

  return `
    <section class="series-hero" aria-labelledby="series-title">
      <div class="series-hero-card">
        <div class="series-hero-media">${tile ? photo(tile.image, '', { sizes: '100vw', eager: true }) : ''}</div>
        <div class="series-hero-body">
          <span class="eyebrow">${series.intro.eyebrow}</span>
          <h1 class="series-hero-title" id="series-title">${series.intro.headline}</h1>
          <p class="series-hero-text">${series.intro.text}</p>
          <ul class="series-hero-facts">${facts.map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>
      </div>
      <nav class="container series-switch" aria-label="Řady Riptide">
        <div class="seg">${switcher}<a class="seg-btn" href="/produkty/">Všechny produkty</a></div>
      </nav>
    </section>
  `
}

// On a phone the line switcher scrolls sideways: bring the current line into view.
export function bindSeriesHero() {
  document.querySelector('.series-switch .is-active')?.scrollIntoView({ inline: 'center', block: 'nearest' })
}
