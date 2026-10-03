import { formatNumber } from '../utils/format.js'
import { startCountUp, resetCountUp } from '../utils/countUp.js'
import { sortVariants } from '../utils/variants.js'

const parseCm = (s) => parseFloat(s.replace(',', '.'))

// Scaled top + side outline of the model drawn from the spec-sheet dimensions, so
// "will it fit in my garden" is answered at a glance. Pure SVG, no assets.
export function renderModelDimensions(model) {
  const base = sortVariants(model.variants)[0]
  const m = base?.specs?.dimensions?.match(/([\d.,]+)\s*×\s*([\d.,]+)\s*×\s*([\d.,]+)/)
  if (!m) return ''
  const [L, Wd, H] = [m[1], m[2], m[3]].map(parseCm)

  // Seconds from the moment the plan scrolls into view: the drawing is a calm but brisk
  // sequence, each dimension line fading in as its outline completes. The figures on the
  // left count up on their own clock (see bindModelDimensions), starting as soon as the
  // block is reached.
  const T = { length: 2.4, width: 3, height: 4.8 }
  const padL = 40
  const padR = 120
  const vbW = 760
  const k = (vbW - padL - padR) / L
  const w = L * k
  const d = Wd * k
  const h = H * k
  const y0 = 64
  const y1 = y0 + d + 110
  const total = y1 + h + 96
  const r = Math.min(d * 0.14, 30)
  const label = (cm) => `${formatNumber(cm)} cm`
  const tick = (x1, y1_, x2, y2) => `<line x1="${x1}" y1="${y1_}" x2="${x2}" y2="${y2}" />`

  const svg = `
    <svg class="dim-svg" viewBox="0 0 ${vbW} ${total}" role="img" aria-label="Půdorys a boční pohled ${model.name} v měřítku: ${label(L)} × ${label(Wd)} × ${label(H)}">
      <text class="dim-cap dim-step" style="--d:0.15s" x="${padL}" y="24">PŮDORYS</text>
      <rect class="dim-shell draw" style="--d:0.2s;--t:2.4s" pathLength="1" x="${padL}" y="${y0}" width="${w}" height="${d}" rx="${r}" />
      <rect class="dim-inner draw" style="--d:1s;--t:1.9s" pathLength="1" x="${padL + 14}" y="${y0 + 14}" width="${w - 28}" height="${d - 28}" rx="${Math.max(r - 8, 6)}" />
      <g class="dim-line dim-step" style="--d:${T.length}s">
        ${tick(padL, y0 - 22, padL + w, y0 - 22)}${tick(padL, y0 - 30, padL, y0 - 14)}${tick(padL + w, y0 - 30, padL + w, y0 - 14)}
        <text x="${padL + w / 2}" y="${y0 - 32}" text-anchor="middle">${label(L)}</text>
      </g>
      <g class="dim-line dim-step" style="--d:${T.width}s">
        ${tick(padL + w + 24, y0, padL + w + 24, y0 + d)}${tick(padL + w + 16, y0, padL + w + 32, y0)}${tick(padL + w + 16, y0 + d, padL + w + 32, y0 + d)}
        <text x="${padL + w + 40}" y="${y0 + d / 2 + 6}">${label(Wd)}</text>
      </g>

      <text class="dim-cap dim-step" style="--d:3.3s" x="${padL}" y="${y1 - 40}">BOČNÍ POHLED</text>
      <rect class="dim-shell draw" style="--d:3.4s;--t:1.9s" pathLength="1" x="${padL}" y="${y1}" width="${w}" height="${h}" rx="6" />
      <g class="dim-line dim-step" style="--d:${T.height}s">
        ${tick(padL + w + 24, y1, padL + w + 24, y1 + h)}${tick(padL + w + 16, y1, padL + w + 32, y1)}${tick(padL + w + 16, y1 + h, padL + w + 32, y1 + h)}
        <text x="${padL + w + 40}" y="${y1 + h / 2 + 6}">${label(H)}</text>
      </g>
      <g class="dim-scale dim-step" style="--d:5.6s">
        ${tick(padL, y1 + h + 44, padL + 100 * k, y1 + h + 44)}${tick(padL, y1 + h + 38, padL, y1 + h + 50)}${tick(padL + 100 * k, y1 + h + 38, padL + 100 * k, y1 + h + 50)}
        <text x="${padL + 100 * k + 12}" y="${y1 + h + 49}">1 m</text>
      </g>
    </svg>`

  const fig = (value, unit, name) => `
    <div class="dim-fig">
      <span class="dim-fig-value" data-countup data-countup-manual>${formatNumber(value)}</span><span class="dim-fig-unit">${unit}</span>
      <span class="dim-fig-label">${name}</span>
    </div>`

  return `
    <section class="section section--white" id="rozmery">
      <div class="container dim-layout">
        <div class="dim-copy" data-reveal>
          <span class="eyebrow">ROZMĚRY</span>
          <h2 class="h-section">Vejde se vám na zahradu?</h2>
          <p class="body-l">Půdorys a boční pohled ${model.name} v měřítku. Metry jsou jen začátek — přístup na pozemek, podklad i vzdálenost od domu s vámi rádi projdeme při osobní konzultaci.</p>
          <div class="dim-figs">${fig(L, ' cm', 'délka')}${fig(Wd, ' cm', 'šířka')}${fig(H, ' cm', 'výška')}</div>
          <button class="btn btn-outline" data-open-inquiry>Domluvit konzultaci</button>
        </div>
        <div class="dim-plan" data-reveal>${svg}</div>
      </div>
    </section>
  `
}

// The plan's drawing plays when the plan is genuinely on screen (not when it is still a
// screen below, which is when the generic reveal fires). The figures count up slowly but
// start the moment the copy block comes into view, in order length → width → height.
// Both reset once fully out of view, so scrolling back plays them again.
export function bindModelDimensions() {
  const plan = document.querySelector('.dim-plan')
  const copy = document.querySelector('.dim-copy')
  if (!plan || !copy || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const figs = [...document.querySelectorAll('.dim-fig-value')]
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
  let drawing = false
  let counting = false

  const draw = () => {
    drawing = true
    plan.classList.add('is-drawing')
  }
  const count = () => {
    counting = true
    figs.forEach((el, i) => startCountUp(el, { delay: i * 350, duration: 3600, easing: easeOutCubic }))
  }
  const reset = () => {
    drawing = counting = false
    plan.classList.remove('is-drawing')
    figs.forEach(resetCountUp)
  }

  plan.classList.add('is-armed')
  // Start: plan ≥45 % visible / copy block's top has cleared the bottom ~8 % of the screen.
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45 && !drawing) draw()
    },
    { threshold: [0, 0.45] }
  ).observe(plan)
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !counting) count()
    },
    { rootMargin: '0px 0px -8% 0px' }
  ).observe(copy)
  // Reset: both fully gone.
  const out = new Set()
  const watchOut = (el) =>
    new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? out.delete(el) : out.add(el)
      if (out.size === 2 && (drawing || counting)) reset()
    }).observe(el)
  out.add(plan).add(copy)
  watchOut(plan)
  watchOut(copy)
}
