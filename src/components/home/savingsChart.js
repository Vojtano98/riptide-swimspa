export function renderSavingsSection(home) {
  const s = home.savings
  const maxValue = Math.max(...s.bars.map((b) => b.value))

  const bars = s.bars
    .map(
      (b) => `
      <div class="savings-bar-row">
        <div class="savings-bar-labels">
          <span class="savings-bar-label">${b.label}</span>
          <span class="savings-bar-sublabel">${b.sublabel}</span>
        </div>
        <div class="savings-bar-track">
          <div
            class="savings-bar-fill savings-bar-fill--${b.tone}"
            style="width: 0%"
            data-target-width="${(b.value / maxValue) * 100}"
            title="${b.label}: ${b.display}"
          ></div>
        </div>
        <span class="savings-bar-value">${b.display}</span>
      </div>
    `
    )
    .join('')

  const stats = s.stats
    .map(
      (st) => `
      <div class="savings-stat" data-reveal="scale">
        <span class="savings-stat-value">${st.value}</span>
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

export function bindSavingsSection() {
  const container = document.getElementById('savings-bars')
  if (!container) return

  const fills = container.querySelectorAll('.savings-bar-fill')

  if (!('IntersectionObserver' in window)) {
    fills.forEach((fill) => {
      fill.style.width = `${fill.dataset.targetWidth}%`
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = `${fill.dataset.targetWidth}%`
          }, i * 200)
        })
        observer.disconnect()
      })
    },
    { threshold: 0.4 }
  )
  observer.observe(container)
}
