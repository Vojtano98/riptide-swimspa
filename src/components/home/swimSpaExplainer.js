import { photo } from '../../utils/photo.js'

// "What is a swim spa" — the newcomer's first question, answered before any technology:
// one sentence, the manufacturer's own top-view plan with the two zones named, and three
// plain facts. Everything here comes from the spec sheets (lengths, widths, series).
export function renderSwimSpaExplainer(home) {
  const e = home.explainer
  if (!e) return ''

  const zones = e.zones
    .map(
      (z, i) => `
      <div class="explain-zone explain-zone--${i === 0 ? 'spa' : 'swim'}">
        <strong>${z.label}</strong>
        <span>${z.note}</span>
      </div>`
    )
    .join('')

  const points = e.points
    .map(
      (p, i) => `
      <div class="explain-point" data-reveal>
        <span class="explain-point-n">0${i + 1}</span>
        <h3 class="explain-point-title">${p.title}</h3>
        <p>${p.text}</p>
      </div>`
    )
    .join('')

  return `
    <section class="section section--white" id="swim-spa">
      <div class="container">
        <div class="section-head explain-head" data-reveal>
          <span class="eyebrow">${e.eyebrow}</span>
          <h2 class="h-section">${e.headline}</h2>
          <p class="body-l">${e.text}</p>
        </div>
        <figure class="explain-plan" data-reveal>
          <div class="explain-plan-media">
            ${photo(e.image, e.imageAlt, { sizes: '(max-width: 1100px) 92vw, 1000px' })}
          </div>
          <figcaption class="explain-zones">${zones}</figcaption>
        </figure>
        <div class="explain-points">${points}</div>
      </div>
    </section>
  `
}
