import { formatPrice } from '../utils/format.js'

export function renderMobileStickyCTA(product) {
  return `
    <div class="mobile-cta" id="mobile-cta">
      <div>
        <div class="mobile-cta-price-label">Cena${product.priceTier ? ` · ${product.priceTier}` : ''}</div>
        <div class="mobile-cta-price">${formatPrice(product.price, product.currency)}</div>
      </div>
      <button class="btn btn-primary" data-open-inquiry>Poptat cenu</button>
    </div>
  `
}

export function bindMobileStickyCTA() {
  const bar = document.getElementById('mobile-cta')
  const hero = document.getElementById('hero')
  if (!bar || !hero || !('IntersectionObserver' in window)) return

  // Shown once the hero has scrolled away, hidden again while the closing call-to-action
  // (which has its own button) or the footer is on screen — never two CTAs at once.
  const state = { hero: true, end: false }
  const sync = () => bar.classList.toggle('is-visible', !state.hero && !state.end)
  new IntersectionObserver(([entry]) => {
    state.hero = entry.isIntersecting
    sync()
  }).observe(hero)

  const ends = [document.getElementById('kontakt'), document.querySelector('.site-footer')].filter(Boolean)
  const visible = new Set()
  const endObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
    state.end = visible.size > 0
    sync()
  })
  ends.forEach((el) => endObserver.observe(el))
}
