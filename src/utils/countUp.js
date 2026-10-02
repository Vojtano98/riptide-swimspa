// Counts the first number inside an element up from zero the first time it scrolls
// into view ("150 000 m²", "−26 %", "591,5" + unit span, …). The markup already
// contains the final value, so no-JS / reduced-motion / old browsers just see it.
const NUMBER = /^(\D*?)(\d+(?:[\s ]\d{3})*)(?:,(\d+))?([\s\S]*)$/

function format(value, decimals, sep) {
  const [int, dec] = value.toFixed(decimals).split('.')
  const grouped = sep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : int
  return dec ? `${grouped},${dec}` : grouped
}

export function initCountUp(root = document) {
  if (!('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const items = []
  root.querySelectorAll('[data-countup]').forEach((el) => {
    const node = Array.from(el.childNodes).find((n) => n.nodeType === 3 && n.nodeValue.trim())
    const m = node && node.nodeValue.match(NUMBER)
    if (!m) return
    const sepMatch = m[2].match(/[\s ]/)
    // Show same-width zeros up front so the final value never flashes before the count starts.
    node.nodeValue = m[1] + m[2].replace(/\d/g, '0') + (m[3] ? `,${m[3].replace(/\d/g, '0')}` : '') + m[4]
    items.push({
      el,
      node,
      prefix: m[1],
      suffix: m[4],
      target: parseFloat(m[2].replace(/[\s ]/g, '') + (m[3] ? `.${m[3]}` : '')),
      decimals: m[3] ? m[3].length : 0,
      sep: sepMatch ? sepMatch[0] : '',
    })
  })
  if (!items.length) return

  const run = ({ node, prefix, suffix, target, decimals, sep }) => {
    const start = performance.now()
    const duration = 1400
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 4)
      node.nodeValue = prefix + format(target * eased, decimals, sep) + suffix
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        const item = items.find((i) => i.el === entry.target)
        if (item) run(item)
      })
    },
    { threshold: 0.3 }
  )
  items.forEach((i) => observer.observe(i.el))
}
