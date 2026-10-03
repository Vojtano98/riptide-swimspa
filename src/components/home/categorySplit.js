import { photo } from '../../utils/photo.js'
export function renderCategorySplit(home) {
  const cards = home.categories
    .map(
      (c) => `
      <a class="category-tile" href="${c.href}" data-reveal="scale">
        ${photo(c.image, c.imageAlt, { sizes: '(max-width: 760px) 100vw, 50vw' })}
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

  const intro = home.categoriesIntro
    ? `
      <div class="section-head" data-reveal>
        <span class="eyebrow">${home.categoriesIntro.eyebrow}</span>
        <h2 class="h-section">${home.categoriesIntro.headline}</h2>
        <p class="body-l">${home.categoriesIntro.text}</p>
      </div>
    `
    : ''

  return `
    <section class="section section--white" id="kategorie">
      <div class="container">
        ${intro}
        <div class="category-split">${cards}</div>
      </div>
    </section>
  `
}
