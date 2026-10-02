export function renderTrustSection(home) {
  const t = home.trust
  if (!t) return ''

  const stats = t.stats
    .map(
      (s) => `
      <div class="trust-stat" data-reveal="scale">
        <span class="trust-stat-value" data-countup>${s.value}</span>
        <span class="trust-stat-label">${s.label}</span>
      </div>
    `
    )
    .join('')

  const img = t.image
  const media = img
    ? `
      <div class="trust-media" data-reveal="right">
        <picture>
          <source
            type="image/webp"
            srcset="${img.webp['800']} 800w, ${img.webp['1200']} 1200w, ${img.webp['1800']} 1800w"
            sizes="(max-width: 760px) 100vw, 46vw"
          />
          <img
            src="${img.src}"
            alt="${img.alt}"
            loading="lazy"
            decoding="async"
            width="1800"
            height="1170"
          />
        </picture>
      </div>
    `
    : ''

  return `
    <section class="section section--white">
      <div class="container">
        <div class="trust-layout">
          <div class="trust-copy">
            <div class="section-head section-head--tight" data-reveal>
              <span class="eyebrow">${t.eyebrow}</span>
              <h2 class="h-section">${t.headline}</h2>
              <p class="body-l">${t.text}</p>
            </div>
            <div class="trust-stats">${stats}</div>
          </div>
          ${media}
        </div>
      </div>
    </section>
  `
}
