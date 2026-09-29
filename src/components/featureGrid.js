export function renderFeatureGrid(product) {
  const b = product.benefits
  const images = product.images.feature
  const tone = b.sectionTone || 'white'

  return `
    <section class="section section--${tone}">
      <div class="container">
        <div class="section-head" data-reveal>
          <h2 class="h-section">${b.headline}</h2>
        </div>
        <div class="benefits-grid">
          <div class="benefit-card benefit-card-hero" data-reveal>
            <img src="${images[b.hero.image]}" alt="${b.hero.label}" loading="lazy" />
            <div class="benefit-card-content">
              <span class="benefit-label">${b.hero.label}</span>
              <p class="benefit-text">${b.hero.text}</p>
            </div>
          </div>

          <div class="benefits-row-secondary">
            ${b.secondary
              .map(
                (f) => `
                <div class="benefit-card benefit-card-secondary" data-reveal>
                  <img src="${images[f.image]}" alt="${f.label}" loading="lazy" />
                  <div class="benefit-card-content">
                    <span class="benefit-label">${f.label}</span>
                    <p class="benefit-text">${f.text}</p>
                  </div>
                </div>
              `
              )
              .join('')}
          </div>

          <div class="benefits-row-tertiary">
            ${b.tertiary
              .map(
                (f) => `
                <div class="benefit-card benefit-card-tertiary" data-reveal>
                  <img src="${images[f.image]}" alt="${f.label}" loading="lazy" />
                  <div class="benefit-card-content">
                    <span class="benefit-label">${f.label}</span>
                    <p class="benefit-text">${f.text}</p>
                  </div>
                </div>
              `
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `
}
