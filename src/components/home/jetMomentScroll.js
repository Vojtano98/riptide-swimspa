export function renderJetMomentScroll(section) {
  if (!section) return ''
  return `
    <section class="jet-moment" id="jet-moment" data-jet-moment>
      <div class="jet-moment-stage">
        <video
          class="jet-moment-video"
          data-jet-video
          src="${section.video}"
          poster="${section.poster}"
          muted
          playsinline
          preload="auto"
        ></video>
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

// Scrubs the video by scroll position instead of playing it in real time: while the
// section is pinned (CSS position: sticky), each scroll tick maps how far through the
// pinned range we are onto video.currentTime, so the jets kick in exactly as fast or
// slow as the visitor scrolls — the sticky mechanics come free from CSS, this only
// drives the video and fades the caption in/out at the edges of the pinned range.
export function bindJetMomentScroll() {
  const section = document.querySelector('[data-jet-moment]')
  const video = section?.querySelector('[data-jet-video]')
  const content = section?.querySelector('[data-jet-content]')
  if (!section || !video || !content) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData
  if (prefersReducedMotion || saveData) {
    section.classList.add('is-static')
    return
  }

  let ready = false
  video.addEventListener('loadedmetadata', () => { ready = true }, { once: true })

  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      if (!ready || !video.duration) return

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      video.currentTime = progress * video.duration

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
