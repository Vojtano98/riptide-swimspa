// Scroll-scrubbed with a stacked sequence of <img> frames rather than a <video> +
// currentTime: a <video> that only ever gets seeked (never actually played) frequently
// never paints a frame at all in some browsers — readyState and currentTime report
// correctly, nothing visible changes. Swapping which frame <img> is visible has none
// of that risk and reuses the same base-path rewriting every other image on the site
// already relies on.
function renderFrames(section) {
  return section.frames
    .map(
      (src, i) => `
      <img
        class="jet-moment-frame${i === 0 ? ' is-active' : ''}"
        src="${src}"
        alt="${i === 0 ? section.posterAlt : ''}"
        data-frame
      />
    `
    )
    .join('')
}

export function renderJetMomentScroll(section) {
  if (!section) return ''
  return `
    <section class="jet-moment" id="jet-moment" data-jet-moment>
      <div class="jet-moment-stage">
        <div class="jet-moment-frames" data-jet-frames>${renderFrames(section)}</div>
        <div class="jet-moment-overlay"></div>
        <div class="container jet-moment-content" data-jet-content>
          <span class="eyebrow jet-moment-eyebrow">${section.eyebrow}</span>
          <h2 class="h-section jet-moment-claim">${section.claim}</h2>
          <p class="body-l jet-moment-text">${section.text}</p>
        </div>
      </div>
    </section>
  `
}

// Scrubs the frame sequence by scroll position: while the section is pinned (CSS
// position: sticky), each scroll tick maps how far through the pinned range we are
// onto a frame index, so the jets kick in exactly as fast or slow as the visitor
// scrolls — the sticky mechanics come free from CSS, this only swaps frames and
// fades the caption in/out at the edges of the pinned range.
export function bindJetMomentScroll() {
  const section = document.querySelector('[data-jet-moment]')
  const frames = section ? Array.from(section.querySelectorAll('[data-frame]')) : []
  const content = section?.querySelector('[data-jet-content]')
  if (!section || !frames.length || !content) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData
  if (prefersReducedMotion || saveData) {
    section.classList.add('is-static')
    return
  }

  let activeIndex = 0
  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const index = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))
      if (index !== activeIndex) {
        frames[activeIndex].classList.remove('is-active')
        frames[index].classList.add('is-active')
        activeIndex = index
      }

      const fadeIn = Math.min(1, progress / 0.15)
      const fadeOut = Math.min(1, (1 - progress) / 0.15)
      const opacity = Math.min(fadeIn, fadeOut)
      content.style.opacity = opacity
      content.style.transform = `translateY(${(1 - opacity) * 16}px)`
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
