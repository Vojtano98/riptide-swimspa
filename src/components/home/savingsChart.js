import { startCountUp, resetCountUp } from '../../utils/countUp.js'

export function renderSavingsSection(home) {
  const s = home.savings
  const maxValue = Math.max(...s.bars.map((b) => b.value))

  const bars = s.bars
    .map(
      (b) => `
      <div class="savings-bar-row">
        <div class="savings-bar-labels">
          <span class="savings-bar-label">${b.label}</span>
        </div>
        <div class="savings-bar-track">
          <div
            class="savings-bar-fill savings-bar-fill--${b.tone}"
            style="width: 0%"
            data-target-width="${(b.value / maxValue) * 100}"
            title="${b.label}: ${b.display}"
          ></div>
        </div>
        <span class="savings-bar-value"><span data-countup data-countup-manual>${b.display}</span> / den</span>
      </div>
    `
    )
    .join('')

  const stats = s.stats
    .map(
      (st) => `
      <div class="savings-stat" data-reveal="scale">
        <span class="savings-stat-value" data-countup>${st.value}</span>
        <span class="savings-stat-label">${st.label}</span>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--dark" id="uspora">
      <div class="container savings-layout">
        <div data-reveal>
          <span class="eyebrow">${s.eyebrow}</span>
          <h2 class="h-section">${s.headline}</h2>
          <p class="body-l">${s.text}</p>
          <div class="savings-stats">
            ${stats}
          </div>
        </div>
        <div class="savings-chart" data-reveal>
          <div class="savings-bars" id="savings-bars">
            ${bars}
          </div>
          <p class="savings-note">${s.note}</p>
        </div>
      </div>
    </section>
  `
}

// Bars fill slowly (≈3 s each, the second one starting as the first is finishing) and the
// kWh figures count up in step with them. Plays when the chart is properly in view and
// resets once it has left, so scrolling back replays it.
const FILL_MS = 3200
const STAGGER_MS = 1800
// Close to the bar's CSS curve, so the figure and the fill move together.
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function bindSavingsSection() {
  const container = document.getElementById('savings-bars')
  if (!container) return

  const fills = [...container.querySelectorAll('.savings-bar-fill')]
  const values = [...container.querySelectorAll('.savings-bar-value')]
  const setWidths = () => fills.forEach((f) => (f.style.width = `${f.dataset.targetWidth}%`))

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setWidths()
    return
  }

  let timers = []
  const play = () => {
    container.classList.remove('is-reset')
    fills.forEach((fill, i) => {
      timers.push(setTimeout(() => (fill.style.width = `${fill.dataset.targetWidth}%`), i * STAGGER_MS))
      if (values[i]) startCountUp(values[i], { delay: i * STAGGER_MS, duration: FILL_MS, easing: easeInOut })
    })
  }
  const reset = () => {
    timers.forEach(clearTimeout)
    timers = []
    container.classList.add('is-reset')
    fills.forEach((f) => (f.style.width = '0%'))
    values.forEach(resetCountUp)
  }

  let playing = false
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !playing) {
        playing = true
        play()
      } else if (!entry.isIntersecting && playing) {
        playing = false
        reset()
      }
    },
    { threshold: 0.5 }
  ).observe(container)
}
