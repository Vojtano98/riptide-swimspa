import { formatPrice } from '../utils/format.js'
import { icon } from '../utils/icons.js'

export function renderVariantSelector(product) {
  const cards = product.variants
    .map(
      (v, i) => `
      <button class="variant-card${i === 0 ? ' is-active' : ''}" data-variant="${v.id}" type="button" aria-pressed="${i === 0}">
        ${v.featured ? '<span class="variant-badge">Doporučeno</span>' : ''}
        <div class="variant-card-top">
          <span class="variant-name">${v.name}</span>
          <span class="variant-price">${formatPrice(v.price, product.currency)}</span>
        </div>
        <p class="variant-desc">${v.description}</p>
        <ul class="variant-highlights">
          ${v.highlights.map((h) => `<li>${icon('check', 16)}${h}</li>`).join('')}
        </ul>
      </button>
    `
    )
    .join('')

  return `
    <section class="section section--white" id="varianty">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Konfigurace</span>
          <h2 class="h-section">Vyberte si výbavu.</h2>
        </div>
        <div class="variants" data-reveal>${cards}</div>
        <div class="variants-footer" data-reveal>
          <button class="btn btn-primary" data-open-inquiry>Nezávazně poptat</button>
          <p class="variants-footer-note">Ozveme se vám do 24 hodin.</p>
        </div>
      </div>
    </section>
  `
}

export function bindVariantSelector(product) {
  const section = document.getElementById('varianty')
  if (!section) return
  const cards = section.querySelectorAll('.variant-card')

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.variant
      cards.forEach((c) => {
        const active = c === card
        c.classList.toggle('is-active', active)
        c.setAttribute('aria-pressed', String(active))
      })
      document.dispatchEvent(new CustomEvent('variant:change', { detail: { id } }))
    })
  })
}
