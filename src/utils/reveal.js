export function initScrollReveal(root = document) {
  const targets = root.querySelectorAll('[data-reveal]')
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  // Stagger siblings that reveal together (grids/rows) for a snappier, less flat entrance.
  const groups = new Map()
  targets.forEach((el) => {
    const siblings = groups.get(el.parentElement) || []
    siblings.push(el)
    groups.set(el.parentElement, siblings)
  })
  groups.forEach((siblings) => {
    if (siblings.length < 2) return
    siblings.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`
    })
  })

  // Positive bottom margin starts the animation before the element is actually on
  // screen (while it's still ~15% of a viewport below the fold), so the fade/scale
  // has time to finish before the user's eye gets there — instead of visibly racing
  // to catch up mid-scroll, which is what reads as stutter.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px 15% 0px' }
  )
  targets.forEach((el) => observer.observe(el))
}
