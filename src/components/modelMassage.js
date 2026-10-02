import { shopDetail } from '../data/shared/shopDetail.js'

// Hydromassage cards (photo + the shop's own title and text). The official SwimSpa.cz page
// shows this block, identically, on every model — Atlas and Atlantis included — so it is
// shown on every model page here too.

export function renderModelMassage(model) {
  const cards = shopDetail.massage
    .map(
      (c, i) => `
      <article class="massage-card" data-reveal style="--d:${i * 0.09}s">
        <div class="massage-card-media">
          <img src="${c.image.src}" alt="${c.title}" width="${c.image.width}" height="${c.image.height}" loading="lazy" decoding="async" />
        </div>
        <div class="massage-card-body">
          <h3>${c.title}</h3>
          <p>${c.text}</p>
        </div>
      </article>
    `
    )
    .join('')

  return `
    <section class="section section--tint" id="masaz">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">HYDROMASÁŽ</span>
          <h2 class="h-section">Masážní zóna ${model.name}.</h2>
        </div>
        <div class="massage-grid">${cards}</div>
      </div>
    </section>
  `
}
