// Model description, taken from the official SwimSpa.cz product page (see
// scripts/fetch-shop-content.py). First paragraph reads as the lead; the rest is
// collapsed in a native <details> so the page stays scannable and works without JS.
export function renderModelAbout(model) {
  const shop = model.shop
  if (!shop?.description?.length) return ''
  const [lead, ...rest] = shop.description
  const visible = rest.slice(0, 2)
  const more = rest.slice(2)

  return `
    <section class="section section--white" id="popis">
      <div class="container about-layout">
        <div class="about-head" data-reveal>
          <span class="eyebrow">POPIS MODELU</span>
          <h2 class="h-section">O modelu ${model.name}.</h2>
        </div>
        <div class="about-body" data-reveal>
          <p class="body-l about-lead">${lead}</p>
          ${visible.map((p) => `<p class="about-p">${p}</p>`).join('')}
          ${
            more.length
              ? `<details class="about-more">
                  <summary><span class="about-more-open">Zobrazit celý popis</span><span class="about-more-close">Skrýt</span></summary>
                  ${more.map((p) => `<p class="about-p">${p}</p>`).join('')}
                </details>`
              : ''
          }
          <a class="about-source" href="${shop.source}" target="_blank" rel="noopener">Popis modelu na SwimSpa.cz ↗</a>
        </div>
      </div>
    </section>
  `
}
