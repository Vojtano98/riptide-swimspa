import { describeModel } from '../utils/describe.js'
import { modelBriefs } from '../data/shared/modelBriefs.js'
import { formatNumber } from '../utils/format.js'

// Opening paragraph written from the spec sheet (what it is, how big, what is inside), so
// every model starts with the same clear facts. The shop's own prose follows in the blocks.
const m2 = (cm) => (cm / 100).toFixed(2).replace(/0$/, '').replace('.', ',')
function summary(model) {
  const b = modelBriefs[model.slug]
  if (!b) return ''
  const size = `Měří <strong>${m2(b.length)} × ${m2(b.width)} m</strong>, vana je vysoká <strong>${b.height} cm</strong> a pojme <strong>${formatNumber(b.volume)} l</strong> vody.`
  if (!b.massageJets) {
    return `${model.name} je čistě plavecký bazén — bez masážního sezení, celá vana patří plavání. ${size}`
  }
  const spa = `${b.seating}, ${b.massageJets.split(' + ')[0]} masážních trysek`
  return b.duo
    ? `${model.name} má dvě oddělené zóny, každou s vlastní teplotou: plaveckou dráhu a hydromasážní část (${spa}). ${size}`
    : `${model.name} spojuje plaveckou dráhu s hydromasážní zónou (${spa}) v jedné vaně. ${size}`
}

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

function bindAboutBlocks() {
  const all = [...document.querySelectorAll('[data-about-block]')]
  const btn = document.querySelector('[data-about-toggle-all]')
  if (!btn || !all.length) return
  const sync = () => {
    const open = all.every((d) => d.open)
    btn.textContent = open ? 'Sbalit vše' : 'Rozbalit vše'
    btn.setAttribute('aria-pressed', String(open))
  }
  btn.addEventListener('click', () => {
    const open = !all.every((d) => d.open)
    all.forEach((d) => (d.open = open))
    sync()
  })
  all.forEach((d) => d.addEventListener('toggle', sync))
}

export function bindModelAbout() {
  bindAboutBlocks()
  const fig = document.querySelector('[data-about-figure]')
  if (!fig) return
  // Swipe left/right on the picture flips between the views (same as the buttons).
  let startX = null
  fig.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true })
  fig.addEventListener('touchend', (e) => {
    if (startX == null) return
    const dx = e.changedTouches[0].clientX - startX
    startX = null
    if (Math.abs(dx) < 45) return
    const buttons = [...fig.querySelectorAll('[data-view-btn]')]
    const current = buttons.findIndex((b) => b.classList.contains('is-active'))
    const next = buttons[(current + (dx < 0 ? 1 : buttons.length - 1)) % buttons.length]
    next.click()
  })
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

  // Topic blocks are collapsed by default (native <details>, works without JS) so the section
  // stays short; "Rozbalit vše" opens or closes all of them.
  const lead = summary(model)
  // With a spec-based lead, the shop's intro becomes the first collapsible block.
  const all = lead ? [{ id: 'popis', label: 'Popis od prodejce', paras: [d.lead, ...d.intro] }, ...d.blocks] : d.blocks
  const blocks = all
    .map(
      (b, i) => `
      <details class="about-block" data-about-block>
        <summary class="about-block-title">
          <span class="about-block-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="about-block-label">${b.label}</span>
          <svg class="about-block-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div class="about-block-body">
          ${b.paras.map((p) => `<p class="about-p">${p}</p>`).join('')}
        </div>
      </details>
    `
    )
    .join('')

  return `
    <section class="section section--white" id="popis">
      <div class="container about-layout">
        <div class="about-head" data-reveal>
          <span class="eyebrow">POPIS MODELU</span>
          <h2 class="h-section">${model.name} v kostce.</h2>
          ${renderFigure(model, shop)}
        </div>
        <div class="about-body">
          <div data-reveal>
            <p class="body-l about-lead">${lead || d.lead}</p>
            ${lead ? '' : d.intro.map((p) => `<p class="about-note">${p}</p>`).join('')}
          </div>
          ${
            all.length
              ? `<div class="about-acc" data-reveal>
                  <div class="about-acc-head">
                    <span>Podrobnosti</span>
                    <button type="button" class="about-toggle-all" data-about-toggle-all aria-pressed="false">Rozbalit vše</button>
                  </div>
                  ${blocks}
                </div>`
              : ''
          }
        </div>
      </div>
    </section>
  `
}
