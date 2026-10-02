import { formatPrice } from '../utils/format.js'
import { tweenNumber } from '../utils/tween.js'

const LINKS = [
  ['parametry', 'Parametry'],
  ['provedeni', 'Provedení'],
  ['rozmery', 'Rozměry'],
  ['izolace', 'Izolace'],
  ['funkce', 'Technologie'],
  ['uspora', 'Úspora'],
  ['showroom', 'Showroom'],
]

// Desktop-only sticky bar that appears once the hero scrolls away: model + selected
// equipment level, a live price, section jump links (with scroll-spy) and the main CTA.
// Phones keep the existing bottom CTA bar instead.
export function renderModelBar(model) {
  const variants = [...model.variants].sort((a, b) => a.price - b.price)
  const initial = variants.find((v) => v.featured) || variants[0]
  return `
    <div class="model-bar" id="model-bar" data-currency="${model.currency}">
      <div class="container model-bar-inner">
        <div class="model-bar-title">
          <strong>${model.name}</strong>
          <span data-bar-variant>${initial.name}</span>
        </div>
        <nav class="model-bar-nav" aria-label="Sekce stránky">
          ${LINKS.map(([id, label]) => `<a href="#${id}" data-bar-link="${id}">${label}</a>`).join('')}
        </nav>
        <div class="model-bar-buy">
          <span class="model-bar-price" data-bar-price data-value="${initial.price}">${formatPrice(initial.price, model.currency)}</span>
          <button class="btn btn-primary" data-open-inquiry data-bar-cta data-variant-name="${initial.name}">Poptat</button>
        </div>
      </div>
    </div>
  `
}

export function bindModelBar() {
  const bar = document.getElementById('model-bar')
  const hero = document.getElementById('hero')
  if (!bar || !hero || !('IntersectionObserver' in window)) return

  new IntersectionObserver(([entry]) => bar.classList.toggle('is-visible', !entry.isIntersecting), { threshold: 0 }).observe(hero)

  const priceEl = bar.querySelector('[data-bar-price]')
  const variantEl = bar.querySelector('[data-bar-variant]')
  const cta = bar.querySelector('[data-bar-cta]')
  const mobilePrice = document.querySelector('.mobile-cta-price')
  const currency = bar.dataset.currency

  document.addEventListener('trim:change', (e) => {
    const { name, price } = e.detail
    const from = Number(priceEl.dataset.value)
    priceEl.dataset.value = price
    variantEl.textContent = name
    cta.dataset.variantName = name
    tweenNumber(from, price, (v) => (priceEl.textContent = formatPrice(v, currency)))
    if (mobilePrice) mobilePrice.textContent = formatPrice(price, currency)
  })

  // Scroll-spy: highlight the link of the section that crosses the middle of the viewport.
  const links = new Map([...bar.querySelectorAll('[data-bar-link]')].map((a) => [a.dataset.barLink, a]))
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        links.forEach((a, id) => a.classList.toggle('is-current', id === entry.target.id))
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  links.forEach((_, id) => {
    const target = document.getElementById(id)
    if (target) spy.observe(target)
  })
}
