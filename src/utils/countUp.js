// Counts the first number inside an element up from zero the first time it scrolls
// into view ("150 000 m²", "−26 %", "591,5" + unit span, …). The markup already
// contains the final value, so no-JS / reduced-motion / old browsers just see it.
//
// Elements marked data-countup-manual are parsed (and zeroed) too but are started by
// code via startCountUp()/resetCountUp() — used where the count belongs to a choreographed
// sequence, e.g. the dimensions plan.
const NUMBER = /^(\D*?)(\d+(?:[\s ]\d{3})*)(?:,(\d+))?([\s\S]*)$/
const parsed = new WeakMap()

function format(value, decimals, sep) {
  const [int, dec] = value.toFixed(decimals).split('.')
  const grouped = sep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : int
  return dec ? `${grouped},${dec}` : grouped
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function parse(el) {
  const node = Array.from(el.childNodes).find((n) => n.nodeType === 3 && n.nodeValue.trim())
  const m = node && node.nodeValue.match(NUMBER)
  if (!m) return null
  const sepMatch = m[2].match(/[\s ]/)
  const item = {
    el,
    node,
    prefix: m[1],
    suffix: m[4],
    target: parseFloat(m[2].replace(/[\s ]/g, '') + (m[3] ? `.${m[3]}` : '')),
    decimals: m[3] ? m[3].length : 0,
    sep: sepMatch ? sepMatch[0] : '',
    zero: m[1] + m[2].replace(/\d/g, '0') + (m[3] ? `,${m[3].replace(/\d/g, '0')}` : '') + m[4],
    final: node.nodeValue,
    token: 0,
    timer: null,
  }
  parsed.set(el, item)
  return item
}

const outQuart = (t) => 1 - Math.pow(1 - t, 4)

function run(item, duration, easing = outQuart) {
  const token = ++item.token
  const start = performance.now()
  const step = (now) => {
    if (token !== item.token) return
    const t = Math.min(1, (now - start) / duration)
    const eased = easing(t)
    item.node.nodeValue = item.prefix + format(item.target * eased, item.decimals, item.sep) + item.suffix
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function startCountUp(el, { delay = 0, duration = 1400, easing } = {}) {
  const item = parsed.get(el)
  if (!item) return
  clearTimeout(item.timer)
  item.token++
  item.node.nodeValue = item.zero
  item.timer = setTimeout(() => run(item, duration, easing), delay)
}

export function resetCountUp(el) {
  const item = parsed.get(el)
  if (!item) return
  clearTimeout(item.timer)
  item.token++
  item.node.nodeValue = item.zero
}

export function initCountUp(root = document) {
  if (!('IntersectionObserver' in window) || reduced()) return

  const auto = []
  root.querySelectorAll('[data-countup]').forEach((el) => {
    const item = parse(el)
    if (!item) return
    // Show same-width zeros up front so the final value never flashes before the count starts.
    item.node.nodeValue = item.zero
    if (el.dataset.countupManual === undefined) auto.push(item)
  })
  if (!auto.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        const item = parsed.get(entry.target)
        if (item) run(item, 1400)
      })
    },
    { threshold: 0.3 }
  )
  auto.forEach((i) => observer.observe(i.el))
}
