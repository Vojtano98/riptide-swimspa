// Photo-card variant of textBenefitsGrid, used only for accessories (which now has real
// product photography). Renders nothing if the series has no accessories data.
export function renderAccessoryShowcase(section) {
  if (!section) return ''

  const cards = section.items
    .map(
      (item) => `
      <div class="accessory-card" data-reveal>
        <div class="accessory-card-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
        </div>
        <h3 class="accessory-card-title">${item.title}</h3>
        <p class="accessory-card-text">${item.text}</p>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--white">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">${section.eyebrow}</span>
          <h2 class="h-section">${section.headline}</h2>
          ${section.text ? `<p class="body-l">${section.text}</p>` : ''}
        </div>
        <div class="accessory-grid">${cards}</div>
      </div>
    </section>
  `
}
