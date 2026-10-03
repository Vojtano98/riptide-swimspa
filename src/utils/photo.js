import { heroImages as sets } from '../data/shared/heroImages.js'

// Content photo as <picture>: responsive WebP (widths from scripts/gen-hero-images.py) with
// the original JPEG as fallback, and real width/height so nothing shifts while it loads.
// Anything without generated variants (already-WebP shop pictures, etc.) stays a plain <img>.
const nameOf = (src) => src.replace(/^.*\//, '').replace(/\.\w+$/, '')

export function photo(src, alt, { sizes = '(max-width: 760px) 100vw, 50vw', eager = false } = {}) {
  const meta = /\.jpe?g$/i.test(src) ? sets[nameOf(src)] : null
  const load = eager ? '' : ' loading="lazy"'
  if (!meta) return `<img src="${src}" alt="${alt}"${load} decoding="async" />`
  const base = src.replace(/\.\w+$/, '')
  const srcset = meta.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
  return `<picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}" /><img src="${src}" alt="${alt}" width="${meta.w}" height="${meta.h}"${load} decoding="async" /></picture>`
}
