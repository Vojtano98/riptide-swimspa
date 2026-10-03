import { photo } from '../../utils/photo.js'
export function renderWhyStatements(home) {
  const w = home.why

  const blocks = w.statements
    .map(
      (s) => `
      <div class="tech-feature layout-${s.layout}" data-reveal>
        <div class="tech-feature-media">
          ${photo(s.image, s.claim, { sizes: '(max-width: 900px) 100vw, 50vw' })}
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
    <section class="section section--tint" id="technologie">
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
