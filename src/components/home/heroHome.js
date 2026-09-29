import { icon } from '../../utils/icons.js'

export function renderHeroHome(home) {
  const h = home.hero
  return `
    <section class="hero" id="hero">
      <div class="hero-media">
        <img src="${h.image}" alt="${h.imageAlt}" fetchpriority="high" />
      </div>
      <div class="container hero-content">
        <span class="eyebrow hero-eyebrow">${h.eyebrow}</span>
        <h1 class="hero-title">${h.title}</h1>
        <p class="hero-tagline">${h.tagline}</p>
      </div>
      <div class="hero-scroll-cue">
        Scroll
        ${icon('chevron', 16)}
      </div>
    </section>
  `
}

export function bindHeroHome() {
  const hero = document.getElementById('hero')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('is-loaded'))
  })
}
