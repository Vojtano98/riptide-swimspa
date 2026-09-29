import { icon } from '../utils/icons.js'

// Icon + title + short text grid — used for content that doesn't have (and doesn't
// need) a photo per point: hydrotherapy health benefits, swim accessories. Renders
// nothing if the section isn't defined on the page's data (e.g. Atlas/Atlantis have
// no massage seating, so they don't get a hydrotherapy section).
export function renderTextBenefitsGrid(section, { tone = 'white', id } = {}) {
  if (!section) return ''

  const items = section.items
    .map(
      (item) => `
      <div class="text-benefit" data-reveal>
        <span class="text-benefit-icon">${icon(item.icon, 24)}</span>
        <h3 class="text-benefit-title">${item.title}</h3>
        <p class="text-benefit-text">${item.text}</p>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--${tone}"${id ? ` id="${id}"` : ''}>
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${section.eyebrow}</span>
          <h2 class="h-section">${section.headline}</h2>
          ${section.text ? `<p class="body-l">${section.text}</p>` : ''}
        </div>
        <div class="text-benefits-grid">${items}</div>
      </div>
    </section>
  `
}
