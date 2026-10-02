// Model description and top-view picture, taken from the official SwimSpa.cz product page
// (see scripts/fetch-shop-content.py). First paragraph reads as the lead; the rest is
// collapsed in a native <details> so the page stays scannable and works without JS.
// Main picture: 3/4 view of the model (default, where the shop has one) and the top view,
// switched with a small segmented control. Both sit in one fixed-ratio frame so the card
// never changes height when switching.
function renderFigure(model, shop) {
  if (!shop.image) return ''
  const img = (v, kind, active) =>
    `<img class="about-img${active ? ' is-active' : ''}" data-view="${kind}" src="${v.src}" alt="${model.name} — ${
      kind === 'top' ? 'pohled shora' : 'pohled na model'
    }" width="${v.width}" height="${v.height}" loading="lazy" decoding="async" />`

  if (!shop.imageSide) {
    return `<figure class="about-figure"><div class="about-stage">${img(shop.image, 'top', true)}</div></figure>`
  }
  return `
    <figure class="about-figure" data-about-figure>
      <div class="about-stage">${img(shop.imageSide, 'side', true)}${img(shop.image, 'top', false)}</div>
      <div class="about-switch" role="group" aria-label="Pohled na model">
        <button type="button" class="is-active" data-view-btn="side" aria-pressed="true">Model</button>
        <button type="button" data-view-btn="top" aria-pressed="false">Pohled shora</button>
      </div>
    </figure>`
}

export function bindModelAbout() {
  const fig = document.querySelector('[data-about-figure]')
  if (!fig) return
  fig.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-view-btn]')
    if (!btn) return
    fig.querySelectorAll('[data-view-btn]').forEach((b) => {
      const on = b === btn
      b.classList.toggle('is-active', on)
      b.setAttribute('aria-pressed', String(on))
    })
    fig.querySelectorAll('.about-img').forEach((i) => i.classList.toggle('is-active', i.dataset.view === btn.dataset.viewBtn))
  })
}

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
          ${renderFigure(model, shop)}
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
        </div>
      </div>
    </section>
  `
}
