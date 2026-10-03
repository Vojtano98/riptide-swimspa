// Scroll-scrubbed with a stacked sequence of <img> frames rather than a <video> +
// currentTime: a <video> that only ever gets seeked (never actually played) frequently
// never paints a frame at all in some browsers — readyState and currentTime report
// correctly, nothing visible changes. Swapping which frame <img> is visible has none
// of that risk and reuses the same base-path rewriting every other image on the site
// already relies on.
// Frame 0 loads eagerly as a poster so the section never shows blank if the
// visitor reaches it before the lazy-load observer (below) has fired. Frames
// 1..n carry their URL in data-src instead of src: with 120 frames in the DOM,
// setting src on all of them up front means the browser fires 120 requests the
// instant the homepage parses, competing with the hero image for bandwidth
// even though this section is well below the fold. bindJetMomentScroll() only
// promotes data-src -> src once the section is about to enter the viewport.
function renderFrames(section) {
  return section.frames
    .map(
      (src, i) => `
      <img
        class="jet-moment-frame${i === 0 ? ' is-active' : ''}"
        ${i === 0 ? `src="${src}" loading="lazy" fetchpriority="low"` : `data-src="${src}"`}
        alt="${i === 0 ? section.posterAlt : ''}"
        decoding="async"
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
// position: sticky), how far through the pinned range we are maps onto a frame index,
// so the jets kick in exactly as fast or slow as the visitor scrolls — the sticky
// mechanics come free from CSS, this only swaps frames and fades the caption in/out
// at the edges of the pinned range.
//
// The raw scroll position is only ever a *target* — a continuous rAF loop eases a
// separately-tracked "displayed" progress toward it every frame (exponential lerp),
// instead of jumping straight to wherever the scroll event landed. A mouse wheel or
// a trackpad fling delivers scroll in big, uneven jumps; easing toward the target
// smooths those out into a steady glide without touching native scrolling itself
// (position: sticky, IntersectionObserver, etc. all keep working untouched).
export function bindJetMomentScroll() {
  const section = document.querySelector('[data-jet-moment]')
  const frames = section ? Array.from(section.querySelectorAll('[data-frame]')) : []
  const content = section?.querySelector('[data-jet-content]')
  const stage = section?.querySelector('.jet-moment-stage')
  if (!section || !frames.length || !content || !stage) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = navigator.connection
  const slow = conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType))
  if (prefersReducedMotion || slow) {
    section.classList.add('is-static')
    return
  }

  // The 119 deferred frames (~2 MB) are fetched progressively and never before the page
  // has had its say: nothing starts until the visitor first scrolls (or, failing that,
  // ~2.5 s after load). A coarse pass (every 4th frame) goes first so the sequence already
  // plays — a little choppier — by the time the section is reached; the rest fills in after.
  // Six requests at a time keep the network free for whatever the visitor is looking at.
  const loaded = new Set()
  const markLoaded = (i) => loaded.add(i)
  if (frames[0].complete && frames[0].naturalWidth) markLoaded(0)
  else frames[0].addEventListener('load', () => markLoaded(0), { once: true })

  const order = [...frames.keys()].slice(1).sort((a, b) => (a % 4 === 0 ? 0 : 1) - (b % 4 === 0 ? 0 : 1) || a - b)
  const loadFrame = (i) =>
    new Promise((resolve) => {
      const f = frames[i]
      if (!f.dataset.src) return resolve()
      f.addEventListener('load', () => (markLoaded(i), resolve()), { once: true })
      f.addEventListener('error', resolve, { once: true })
      f.src = f.dataset.src
      delete f.dataset.src
    })
  let started = false
  const startLoading = async () => {
    if (started) return
    started = true
    window.removeEventListener('scroll', startLoading)
    frames[0].loading = 'eager'
    for (let k = 0; k < order.length; k += 6) await Promise.all(order.slice(k, k + 6).map(loadFrame))
  }
  window.addEventListener('scroll', startLoading, { passive: true, once: true })
  const afterLoad = () => setTimeout(startLoading, 2500)
  if (document.readyState === 'complete') afterLoad()
  else window.addEventListener('load', afterLoad, { once: true })

  // Show the closest frame that has actually arrived, so a half-loaded sequence never
  // flashes an empty stage.
  const nearestLoaded = (i) => {
    if (loaded.has(i)) return i
    for (let d = 1; d < frames.length; d++) {
      if (loaded.has(i - d)) return i - d
      if (loaded.has(i + d)) return i + d
    }
    return null
  }

  let activeIndex = 0
  let zCounter = 1
  frames[0].style.zIndex = zCounter

  const applyProgress = (progress) => {
    const wanted = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))
    const index = nearestLoaded(wanted) ?? activeIndex
    if (index !== activeIndex) {
      // Only the incoming frame ever fades (0 -> 1); the outgoing one is left at
      // opacity 1 and simply covered by the next frame's higher z-index, so there's
      // never a moment with no fully-opaque frame on top (which is what caused the
      // white flashes — two frames fading in opposite directions both briefly
      // translucent, letting the page background show through between them).
      zCounter += 1
      frames[index].style.zIndex = zCounter
      frames[index].classList.add('is-active')
      activeIndex = index
    }

    const fadeIn = Math.min(1, progress / 0.15)
    const fadeOut = Math.min(1, (1 - progress) / 0.15)
    const opacity = Math.min(fadeIn, fadeOut)
    content.style.opacity = opacity
    content.style.transform = `translateY(${(1 - opacity) * 16}px)`
    // Drives the closing gradient into the next (light) section — see .jet-moment-stage::after.
    stage.style.setProperty('--end-fade', Math.min(1, Math.max(0, (progress - 0.8) / 0.2)).toFixed(3))
  }

  let targetProgress = 0
  let displayedProgress = 0
  let rafId = null

  const settleThreshold = 0.5 / frames.length // a fraction of a single frame step

  const tick = () => {
    const delta = targetProgress - displayedProgress
    if (Math.abs(delta) < settleThreshold) {
      displayedProgress = targetProgress
      applyProgress(displayedProgress)
      rafId = null
      return
    }
    displayedProgress += delta * 0.15
    applyProgress(displayedProgress)
    rafId = requestAnimationFrame(tick)
  }

  const onScroll = () => {
    const rect = section.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    targetProgress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : targetProgress
    if (rafId === null) rafId = requestAnimationFrame(tick)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
