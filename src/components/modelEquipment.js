// Equipment lists from the official SwimSpa.cz product page: water care and additional
// equipment (the five insulation layers have their own scroll section, modelInsulation.js).
const rows = (pairs) =>
  pairs
    .map(
      ([k, v]) => `
      <div class="equip-row">
        <dt>${k}</dt>
        <dd>${v.split('; ').join('<br />')}</dd>
      </div>`
    )
    .join('')

const acc = (title, pairs, open = false) => `
  <details class="equip-acc"${open ? ' open' : ''}>
    <summary class="equip-acc-title">
      <span>${title}</span>
      <svg class="about-block-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </summary>
    <dl class="equip-list">${rows(pairs)}</dl>
  </details>`

// One "Výbava" section: the headline numbers for the selected equipment level, the full
// lists (collapsed) and the colour options — what used to be three separate sections.
export function renderModelEquipment(model, { highlights = '', materials = '' } = {}) {
  const shop = model.shop
  const equipment = shop?.equipment
  if (!equipment && !highlights) return ''
  return `
    <section class="section section--tint" id="vybava">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">VÝBAVA</span>
          <h2 class="h-section">Co dostanete.</h2>
        </div>
        ${highlights}
        ${
          equipment
            ? `<div class="equip-accs" id="vybava-detail" data-reveal>
                ${acc('Vodní péče', equipment.water)}
                ${acc('Doplňková výbava', equipment.extras)}
              </div>`
            : ''
        }
        ${materials ? `<div class="equip-materials">${materials}</div>` : ''}
      </div>
    </section>
  `
}
