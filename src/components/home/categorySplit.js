export function renderCategorySplit(home) {
  const cards = home.categories
    .map(
      (c) => `
      <a class="category-tile" href="${c.href}" data-reveal="scale">
        <img src="${c.image}" alt="${c.imageAlt}" loading="lazy" />
        <div class="category-tile-content">
          <span class="eyebrow">${c.eyebrow}</span>
          <h3 class="category-tile-title">${c.title}</h3>
          <p class="category-tile-text">${c.text}</p>
          <span class="category-tile-cta">${c.cta} →</span>
        </div>
      </a>
    `
    )
    .join('')

  return `
    <section class="section section--white" id="kategorie">
      <div class="container">
        <div class="category-split">${cards}</div>
      </div>
    </section>
  `
}
