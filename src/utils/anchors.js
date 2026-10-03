// Reliable in-page anchors. The pages are rendered client-side and full of lazy images and
// pinned scroll tracks, so a plain `#hash` jump lands in the wrong place two ways: arriving
// from another page the browser scrolls to the hash before the content exists (so you stay
// at the top), and a smooth scroll through lazily loading images ends up above or below the
// target once they pop in. This scrolls to the target, then re-measures and nudges until it
// really sits where it should (top of the section, honouring scroll-margin-top).
const MAX_FIXES = 8

function settle(el, tries = 0) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const delta = el.getBoundingClientRect().top - margin
  if (Math.abs(delta) <= 2 || tries >= MAX_FIXES) return
  window.scrollBy({ top: delta, behavior: 'instant' })
  setTimeout(() => settle(el, tries + 1), 140)
}

const focusTarget = (el) => {
  if (el.matches('main, [tabindex="-1"]')) el.focus({ preventScroll: true })
}

export function scrollToTarget(el, { smooth = true } = {}) {
  focusTarget(el)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const top = el.getBoundingClientRect().top + window.scrollY - margin
  if (!smooth || reduced) {
    window.scrollTo({ top, behavior: 'instant' })
    settle(el)
    return
  }
  window.scrollTo({ top, behavior: 'smooth' })
  let done = false
  const finish = () => {
    if (done) return
    done = true
    settle(el)
  }
  window.addEventListener('scrollend', finish, { once: true })
  setTimeout(finish, 1600)
}

export function initAnchors() {
  const find = (hash) => {
    if (!hash || hash === '#') return null
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)))
    } catch {
      return null
    }
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest('a[href*="#"]')
    if (!a || a.target === '_blank') return
    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin || url.pathname !== location.pathname) return
    const el = find(url.hash)
    if (!el) return
    e.preventDefault()
    history.pushState(null, '', url.hash)
    scrollToTarget(el)
  })

  // Arriving with #hash (from another page or a shared link): the content was only just
  // rendered, so wait for images/fonts and then land on the section.
  const initial = find(location.hash)
  if (initial) {
    const go = () => scrollToTarget(initial, { smooth: false })
    if (document.readyState === 'complete') requestAnimationFrame(go)
    else window.addEventListener('load', () => requestAnimationFrame(go), { once: true })
  }
}
