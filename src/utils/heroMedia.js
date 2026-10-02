import { heroImages } from '../data/shared/heroImages.js'

// Full-bleed hero photo: responsive WebP (JPEG fallback) over a tiny blurred copy of the
// same photo. The blurred copy is a data URI, so the hero shows the picture on the very
// first paint and the sharp image simply fades in over it — no bare-text moment while the
// real file downloads. The preload hint that fetches it early lives in index.html
// (injected by the heroPreload plugin in vite.config.js).
const nameOf = (src) => src.replace(/^.*\//, '').replace(/\.\w+$/, '')

export function heroMedia(src, alt) {
  const meta = heroImages[nameOf(src)]
  if (!meta) {
    return `<div class="hero-media"><img src="${src}" alt="${alt}" fetchpriority="high" decoding="async" /></div>`
  }
  const base = src.replace(/\.\w+$/, '')
  const srcset = meta.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
  return `
    <div class="hero-media" style="--lqip:url(${meta.lqip})">
      <picture>
        <source type="image/webp" srcset="${srcset}" sizes="100vw" />
        <img src="${src}" alt="${alt}" width="${meta.w}" height="${meta.h}" fetchpriority="high" decoding="async" />
      </picture>
    </div>
  `
}

// Reveals the hero as one moment: the sharp photo fades in once decoded, and the title /
// tagline rise in together with it — but never wait longer than MAX_WAIT_MS (slow network),
// in which case the text comes in over the blurred photo and the sharp one fades in later.
const MAX_WAIT_MS = 900

export function bindHeroReady(hero) {
  if (!hero) return
  const img = hero.querySelector('.hero-media img')
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS))

  const imageReady = img
    ? (img.decode ? img.decode() : new Promise((r) => (img.complete ? r() : img.addEventListener('load', r, { once: true }))))
        .catch(() => {})
        .then(() => hero.classList.add('is-ready'))
    : Promise.resolve()
  const fontsReady = document.fonts?.ready ?? Promise.resolve()
  // Failsafe: whatever happens to decode(), the photo must never stay invisible.
  setTimeout(() => hero.classList.add('is-ready'), MAX_WAIT_MS + 3000)

  Promise.race([Promise.all([imageReady, fontsReady]), timeout]).then(() =>
    requestAnimationFrame(() => hero.classList.add('is-loaded'))
  )
}
