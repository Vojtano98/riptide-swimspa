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

// The title and tagline rise in right away over the blurred photo (so the largest, slowest
// element — the sharp image — is what defines load time, not an animation we delayed), and
// the sharp image fades in over the blur as soon as it is decoded.
const FAILSAFE_MS = 4000

export function bindHeroReady(hero) {
  if (!hero) return
  const img = hero.querySelector('.hero-media img')
  requestAnimationFrame(() => hero.classList.add('is-loaded'))

  const ready = () => hero.classList.add('is-ready')
  if (!img) return ready()
  if (img.decode) img.decode().then(ready, ready)
  else if (img.complete) ready()
  else img.addEventListener('load', ready, { once: true })
  // Whatever happens to decode(), the photo must never stay invisible.
  setTimeout(ready, FAILSAFE_MS)
}
