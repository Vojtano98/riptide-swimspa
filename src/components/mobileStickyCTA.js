import { formatPrice } from '../utils/format.js'

export function renderMobileStickyCTA(product) {
  return `
    <div class="mobile-cta" id="mobile-cta">
      <div>
        <div class="mobile-cta-price-label">Cena</div>
        <div class="mobile-cta-price">od ${formatPrice(product.price, product.currency)}</div>
      </div>
      <button class="btn btn-primary" data-open-inquiry>Spočítat cenu</button>
    </div>
  `
}

export function bindMobileStickyCTA() {
  const bar = document.getElementById('mobile-cta')
  const hero = document.getElementById('hero')
  if (!bar || !hero || !('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    ([entry]) => bar.classList.toggle('is-visible', !entry.isIntersecting),
    { threshold: 0 }
  )
  observer.observe(hero)
}
