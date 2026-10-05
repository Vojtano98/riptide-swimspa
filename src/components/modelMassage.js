import { shopDetail } from '../data/shared/shopDetail.js'
import { modelBriefs } from '../data/shared/modelBriefs.js'

// Hydromassage cards (photo + the shop's own title and text). The official SwimSpa.cz page
// shows this block, identically, on every model — Atlas and Atlantis included — so it is
// shown on every model page here too.

export function renderModelMassage(model) {
  // Atlas and Atlantis are pure swimming pools (no massage seating in the spec sheet), so a
  // "massage zone" section would contradict the rest of the page. Remove this guard to show
  // the block on every model again.
  if (!modelBriefs[model.slug]?.massageJets) return ''
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
          <h2 class="h-section">Hydromasážní zóna.</h2>
        </div>
        <div class="massage-grid">${cards}</div>
      </div>
    </section>
  `
}
