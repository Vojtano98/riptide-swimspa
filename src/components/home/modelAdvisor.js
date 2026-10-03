import { formatPrice } from '../../utils/format.js'
import { withShopData } from '../../data/shared/shopData.js'
import { modelBriefs } from '../../data/shared/modelBriefs.js'
import { atlas } from '../../data/series/atlas.js'
import { atlantis } from '../../data/series/atlantis.js'
import { aquaLife } from '../../data/series/aquaLife.js'
import { easyLife } from '../../data/series/easyLife.js'

// "Find your model": four quick questions narrow the 18 models down using the spec-sheet
// data only (length, depth, massage zone, two temperature zones). No answer = no filter.
const slugOf = (href) => href.split('/').filter(Boolean).pop()
const models = [atlas, atlantis, aquaLife, easyLife]
  .flatMap((s) => withShopData(s.models))
  .map((m) => {
    const b = modelBriefs[slugOf(m.href)]
    return b ? { ...m, length: b.length, duo: !!b.duo, massage: !!b.massageJets, deep: b.height >= 150 } : null
  })
  .filter(Boolean)

const QUESTIONS = [
  { key: 'use', label: 'Co s ním budete dělat?', options: [['swim', 'Hlavně plavat'], ['both', 'Plavat i relaxovat v hydromasáži']] },
  { key: 'depth', label: 'Jakou hloubku chcete?', options: [['std', 'Standardní (do 129 cm)'], ['deep', 'Extra (154 cm)']] },
  { key: 'len', label: 'Kolik máte místa na délku?', options: [['s', 'Do 5 m'], ['m', '5–6 m'], ['l', 'Přes 6 m']] },
  { key: 'zones', label: 'Teplotní zóny', options: [['one', 'Jedna'], ['two', 'Dvě (Duo)']], onlyWhen: (a) => a.use !== 'swim' },
]

const matches = (m, a) =>
  (!a.use || (a.use === 'swim' ? !m.massage : m.massage)) &&
  (!a.depth || (a.depth === 'deep') === m.deep) &&
  (!a.len || (a.len === 's' ? m.length < 500 : a.len === 'm' ? m.length >= 500 && m.length <= 600 : m.length > 600)) &&
  (!a.zones || a.use === 'swim' || (a.zones === 'two') === m.duo)

export function renderModelAdvisor() {
  const qs = QUESTIONS.map(
    (q) => `
      <div class="adv-q" data-q="${q.key}">
        <span class="adv-q-label">${q.label}</span>
        <div class="seg adv-seg" role="group" aria-label="${q.label}">
          ${q.options.map(([v, l]) => `<button type="button" class="seg-btn" data-val="${v}" aria-pressed="false">${l}</button>`).join('')}
        </div>
      </div>`
  ).join('')

  return `
    <section class="section section--white" id="pruvodce">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">NAJDĚTE SVŮJ MODEL</span>
          <h2 class="h-section">Který swim spa se hodí vám?</h2>
          <p class="body-l">Odpovězte na pár otázek a ukážeme modely, které odpovídají. Na otázky, které vás nezajímají, můžete odpověď přeskočit.</p>
        </div>
        <div class="adv" data-advisor data-reveal>
          <div class="adv-questions">${qs}</div>
          <p class="adv-status" data-adv-status aria-live="polite">Vyberte alespoň jednu odpověď.</p>
          <div class="related-grid adv-results" data-adv-results></div>
        </div>
      </div>
    </section>
  `
}

export function bindModelAdvisor() {
  const root = document.querySelector('[data-advisor]')
  if (!root) return
  const status = root.querySelector('[data-adv-status]')
  const out = root.querySelector('[data-adv-results]')
  const answers = {}

  const card = (m) => `
    <a class="model-card related-card" href="${m.href}">
      <div class="model-card-media${m.thumb ? ' model-card-media--thumb' : ''}">
        ${m.thumb ? `<img src="${m.thumb.src}" alt="${m.imageAlt}" width="${m.thumb.width}" height="${m.thumb.height}" loading="lazy" decoding="async" />` : ''}
      </div>
      <div class="model-card-content">
        <h3 class="model-card-name">${m.name}</h3>
        <div class="model-card-price">${formatPrice(m.price, m.currency)}${m.priceTier ? `<span class="model-card-tier">${m.priceTier}</span>` : ''}</div>
      </div>
    </a>`

  const update = () => {
    // The Duo question only makes sense when hydromassage is wanted.
    const zones = root.querySelector('[data-q="zones"]')
    const showZones = answers.use !== 'swim'
    zones.hidden = !showZones
    if (!showZones) delete answers.zones
    zones.querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('is-active', answers.zones === b.dataset.val))

    const chosen = Object.keys(answers).length
    if (!chosen) {
      status.textContent = 'Vyberte alespoň jednu odpověď.'
      out.innerHTML = ''
      return
    }
    const found = models.filter((m) => matches(m, answers)).sort((a, b) => a.length - b.length)
    status.textContent = found.length
      ? `${found.length === 1 ? 'Odpovídá 1 model' : `Odpovídá ${found.length} ${found.length < 5 ? 'modely' : 'modelů'}`} — seřazeno od nejkratšího.`
      : 'Takový model zatím v nabídce není — zkuste některou odpověď změnit.'
    out.innerHTML = found.map(card).join('')
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    out.querySelectorAll('a[href^="/"]').forEach((a) => a.setAttribute('href', base + a.getAttribute('href')))
  }

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn')
    if (!btn) return
    const key = btn.closest('[data-q]').dataset.q
    // Clicking the chosen answer again clears it.
    if (answers[key] === btn.dataset.val) delete answers[key]
    else answers[key] = btn.dataset.val
    root.querySelectorAll(`[data-q="${key}"] .seg-btn`).forEach((b) => {
      const on = answers[key] === b.dataset.val
      b.classList.toggle('is-active', on)
      b.setAttribute('aria-pressed', String(on))
    })
    update()
  })
}
