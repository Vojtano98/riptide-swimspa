export function renderWhyStatements(home) {
  const w = home.why

  const blocks = w.statements
    .map(
      (s) => `
      <div class="tech-feature layout-${s.layout}" data-reveal>
        <div class="tech-feature-media">
          <img src="${s.image}" alt="${s.claim}" loading="lazy" />
        </div>
        <div>
          <span class="eyebrow">${s.eyebrow}</span>
          <h3 class="tech-feature-claim">${s.claim}</h3>
          <p class="body-l">${s.text}</p>
        </div>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--tint">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${w.eyebrow}</span>
          <h2 class="h-section">${w.headline}</h2>
        </div>
        ${blocks}
      </div>
    </section>
  `
}
