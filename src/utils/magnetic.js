// Subtle "magnetic" pull on primary CTAs: the button drifts a few px toward the
// pointer. Fine-pointer + no-reduced-motion only, one rAF-coalesced listener per
// hovered button, transform-only (no layout) — zero cost on touch devices.
export function initMagneticButtons(root = document) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const calm = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || !calm) return

  root.querySelectorAll('.hero-actions .btn, .final-cta-actions .btn').forEach((btn) => {
    let frame = null
    let x = 0
    let y = 0

    const apply = () => {
      frame = null
      btn.style.transform = `translate(${x}px, ${y}px)`
    }
    const onMove = (e) => {
      const r = btn.getBoundingClientRect()
      x = ((e.clientX - (r.left + r.width / 2)) / r.width) * 10
      y = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8
      if (frame === null) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      if (frame === null) frame = requestAnimationFrame(apply)
    }

    btn.addEventListener('pointermove', onMove)
    btn.addEventListener('pointerleave', onLeave)
  })
}
