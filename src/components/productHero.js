import { formatPrice } from '../utils/format.js'
import { icon } from '../utils/icons.js'

function renderLifestyleHero(product) {
  return `
    <section class="hero" id="hero">
      <div class="hero-media">
        <img src="${product.images.hero}" alt="${product.images.heroAlt}" fetchpriority="high" />
      </div>
      <div class="container hero-content">
        <span class="eyebrow hero-eyebrow">${product.category}</span>
        <h1 class="hero-title">${product.name}</h1>
        <p class="hero-tagline">${product.tagline}</p>
        <div class="hero-meta">
          <div>
            <div class="hero-price-label">Cena</div>
            <div class="hero-price">od ${formatPrice(product.price, product.currency)}</div>
          </div>
          <div class="hero-actions">
            <button class="btn btn-primary" data-open-inquiry>Spočítat finální cenu</button>
            <a href="#specifikace" class="btn btn-outline">Technické parametry</a>
          </div>
        </div>
      </div>
      <div class="hero-scroll-cue">
        Scroll
        ${icon('chevron', 16)}
      </div>
    </section>
  `
}

function renderCutoutHero(product) {
  return `
    <section class="hero hero--cutout" id="hero">
      <div class="hero-media">
        <img src="${product.images.hero}" alt="${product.images.heroAlt}" fetchpriority="high" />
      </div>
      <div class="container hero-content">
        <span class="eyebrow hero-eyebrow">${product.category}</span>
        <h1 class="hero-title">${product.name}</h1>
        <p class="hero-tagline">${product.tagline}</p>
        <div class="hero-meta">
          <div>
            <div class="hero-price-label">Cena</div>
            <div class="hero-price">od ${formatPrice(product.price, product.currency)}</div>
          </div>
          <div class="hero-actions">
            <button class="btn btn-primary" data-open-inquiry>Spočítat finální cenu</button>
            <a href="#specifikace" class="btn btn-outline">Technické parametry</a>
          </div>
        </div>
      </div>
      <div class="hero-scroll-cue">
        Scroll
        ${icon('chevron', 16)}
      </div>
    </section>
  `
}

export function renderProductHero(product) {
  return product.heroStyle === 'cutout' ? renderCutoutHero(product) : renderLifestyleHero(product)
}

export function bindProductHero() {
  const hero = document.getElementById('hero')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('is-loaded'))
  })
}
