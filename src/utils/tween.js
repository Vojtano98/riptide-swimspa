// Eases a number from one value to another and calls `write` each frame.
// Respects prefers-reduced-motion by jumping straight to the end value.
export function tweenNumber(from, to, write, duration = 600) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || from === to) {
    write(to)
    return
  }
  const start = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration)
    write(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
