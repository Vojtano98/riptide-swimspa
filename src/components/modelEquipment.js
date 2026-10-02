// Equipment lists from the official SwimSpa.cz product page: water care, additional
// equipment and the five Platinum Lock insulation layers.
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

export function renderModelEquipment(model) {
  const shop = model.shop
  if (!shop?.equipment) return ''
  const { water, extras } = shop.equipment
  const ins = model.insulation

  const layers = ins.layers
    .map(
      (l, i) => `
      <li class="equip-layer">
        <span class="equip-layer-n">${i + 1}</span>
        <h4 class="equip-layer-name">${l.name}</h4>
        <p class="equip-layer-text">${l.text}</p>
      </li>`
    )
    .join('')

  return `
    <section class="section section--tint" id="vybava-detail">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">VÝBAVA</span>
          <h2 class="h-section">Výbava ${model.name} do detailu.</h2>
        </div>
        <div class="equip-grid">
          <div class="equip-card" data-reveal>
            <h3 class="equip-title">Vodní péče</h3>
            <dl class="equip-list">${rows(water)}</dl>
          </div>
          <div class="equip-card" data-reveal>
            <h3 class="equip-title">Doplňková výbava</h3>
            <dl class="equip-list">${rows(extras)}</dl>
          </div>
        </div>
        <div class="equip-ins" data-reveal>
          <h3 class="equip-title">${ins.label}</h3>
          <ol class="equip-layers">${layers}</ol>
        </div>
      </div>
    </section>
  `
}
