// Click a content photo to view it full screen (arrows / swipe / Esc). The <dialog> is
// built lazily on first click, so pages that never open it pay nothing but one
// delegated listener.
const SELECTOR = [
  '.benefits-grid img',
  '.trust-media img',
  '.showroom-media img',
  '.tech-feature-media img',
  '.advantage-card-media img',
  '.about-img',
].join(',')

// Prefer the largest candidate of a <picture> over whichever size the page loaded.
function bestSrc(img) {
  const set = img.closest('picture')?.querySelector('source[type="image/webp"]')?.getAttribute('srcset')
  if (set) {
    const last = set.split(',').pop().trim().split(/\s+/)[0]
    if (last) return new URL(last, document.baseURI).href
  }
  return img.currentSrc || img.src
}

export function initLightbox() {
  let dialog = null
  let imgEl = null
  let counter = null
  let items = []
  let index = 0

  const show = (i) => {
    index = (i + items.length) % items.length
    imgEl.classList.remove('is-in')
    imgEl.src = bestSrc(items[index])
    imgEl.alt = items[index].alt
    counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : ''
    dialog.classList.toggle('lb--single', items.length < 2)
    requestAnimationFrame(() => imgEl.classList.add('is-in'))
  }

  const build = () => {
    dialog = document.createElement('dialog')
    dialog.className = 'lb'
    dialog.setAttribute('aria-label', 'Zvětšená fotografie')
    dialog.innerHTML = `
      <button type="button" class="lb-btn lb-close" aria-label="Zavřít">×</button>
      <button type="button" class="lb-btn lb-prev" aria-label="Předchozí fotografie">‹</button>
      <img class="lb-img" alt="" />
      <button type="button" class="lb-btn lb-next" aria-label="Další fotografie">›</button>
      <span class="lb-count"></span>
    `
    imgEl = dialog.querySelector('.lb-img')
    counter = dialog.querySelector('.lb-count')
    document.body.appendChild(dialog)

    dialog.addEventListener('click', (e) => {
      if (e.target.closest('.lb-close') || e.target === dialog) dialog.close()
      else if (e.target.closest('.lb-prev')) show(index - 1)
      else if (e.target.closest('.lb-next')) show(index + 1)
    })
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(index - 1)
      if (e.key === 'ArrowRight') show(index + 1)
    })

    let startX = null
    dialog.addEventListener('pointerdown', (e) => (startX = e.clientX))
    dialog.addEventListener('pointerup', (e) => {
      if (startX === null) return
      const dx = e.clientX - startX
      startX = null
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1))
    })
    dialog.addEventListener('close', () => document.documentElement.classList.remove('lb-open'))
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest(SELECTOR)
    if (!img || e.target.closest('a')) return
    if (!dialog) build()
    items = [...document.querySelectorAll(SELECTOR)].filter((el, i, all) => all.findIndex((o) => bestSrc(o) === bestSrc(el)) === i)
    const start = items.findIndex((el) => bestSrc(el) === bestSrc(img))
    document.documentElement.classList.add('lb-open')
    dialog.showModal()
    show(Math.max(0, start))
  })
}
