export function renderTrustSection(home) {
  const t = home.trust
  if (!t) return ''

  const stats = t.stats
    .map(
      (s) => `
      <div class="trust-stat" data-reveal="scale">
        <span class="trust-stat-value">${s.value}</span>
        <span class="trust-stat-label">${s.label}</span>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--white">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${t.eyebrow}</span>
          <h2 class="h-section">${t.headline}</h2>
          <p class="body-l">${t.text}</p>
        </div>
        <div class="trust-stats">${stats}</div>
      </div>
    </section>
  `
}
