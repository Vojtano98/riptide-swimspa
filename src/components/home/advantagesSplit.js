export function renderAdvantagesSplit(home) {
  const a = home.advantages

  const columns = a.columns
    .map(
      (c) => `
      <div class="advantage-card" data-reveal>
        <div class="advantage-card-media">
          <img src="${c.image}" alt="${c.imageAlt}" loading="lazy" />
        </div>
        <div class="advantage-card-body">
          <span class="eyebrow">${c.eyebrow}</span>
          <h3 class="advantage-card-title">${c.title}</h3>
          <p class="body-l">${c.text}</p>
          <ul class="advantage-card-points">
            ${c.points.map((p) => `<li>${p}</li>`).join('')}
          </ul>
          <a class="btn btn-outline" href="${c.href}">${c.cta}</a>
        </div>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--tint" id="reseni">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${a.eyebrow}</span>
          <h2 class="h-section">${a.headline}</h2>
          <p class="body-l">${a.text}</p>
        </div>
        <div class="advantages-grid">
          ${columns}
        </div>
      </div>
    </section>
  `
}
