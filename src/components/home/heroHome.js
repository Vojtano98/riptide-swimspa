import { splitWords } from '../../utils/splitWords.js'
import { heroMedia, bindHeroReady } from '../../utils/heroMedia.js'

export function renderHeroHome(home) {
  const h = home.hero
  return `
    <section class="hero hero--home" id="hero">
      ${heroMedia(h.image, h.imageAlt)}
      <div class="container hero-content">
        <span class="eyebrow hero-eyebrow">${h.eyebrow}</span>
        <h1 class="hero-title has-words">${splitWords(h.title)}</h1>
        <p class="hero-tagline">${h.tagline}</p>
        <div class="hero-actions hero-home-actions">
          <a class="btn btn-primary" href="${h.primaryCta.href}">${h.primaryCta.label}</a>
          <a class="btn btn-outline" href="${h.secondaryCta.href}">${h.secondaryCta.label}</a>
        </div>
      </div>
    </section>
  `
}

export function bindHeroHome() {
  bindHeroReady(document.getElementById('hero'))
}
