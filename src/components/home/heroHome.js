import { icon } from '../../utils/icons.js'
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
      </div>
      <div class="hero-scroll-cue">
        Scroll
        ${icon('chevron', 16)}
      </div>
    </section>
  `
}

export function bindHeroHome() {
  bindHeroReady(document.getElementById('hero'))
}
