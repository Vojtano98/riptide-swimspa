import { describeModel } from '../utils/describe.js'

// Model description and top-view picture, taken from the official SwimSpa.cz product page
// (see scripts/fetch-shop-content.py). The text is restructured by utils/describe.js: lead,
// a note, then numbered topic blocks (massage zone, swim section, current, entry) with the
// key facts in bold.
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
  const d = describeModel(shop.description)

  const blocks = d.blocks
    .map(
      (b, i) => `
      <section class="about-block" data-reveal style="--d:${i * 0.05}s">
        <h3 class="about-block-title"><span>${String(i + 1).padStart(2, '0')}</span>${b.label}</h3>
        ${b.paras.map((p) => `<p class="about-p">${p}</p>`).join('')}
      </section>
    `
    )
    .join('')

  return `
    <section class="section section--white" id="popis">
      <div class="container about-layout">
        <div class="about-head" data-reveal>
          <span class="eyebrow">POPIS MODELU</span>
          <h2 class="h-section">O modelu ${model.name}.</h2>
          ${renderFigure(model, shop)}
        </div>
        <div class="about-body">
          <div data-reveal>
            <p class="body-l about-lead">${d.lead}</p>
            ${d.intro.map((p) => `<p class="about-note">${p}</p>`).join('')}
          </div>
          ${blocks}
        </div>
      </div>
    </section>
  `
}
