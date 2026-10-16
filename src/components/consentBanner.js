import { CONSENT_KEY, PRIVACY_URL } from '../config/analytics.js'
import { pushEvent } from '../utils/analytics.js'

// Cookie consent for Google Consent Mode v2. The <head> (see vite.config.js → analyticsHead)
// already set everything to "denied" and re-applied a stored choice before GTM loaded; this
// is the visible part: ask once, store the answer, and let it be changed from the footer.
// Shown only when a GTM container is configured (src/config/analytics.js).
const enabled = () => typeof window !== 'undefined' && !!window.__riptideGTM

function read() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
  } catch {
    return null
  }
}

// Consent commands must reach the dataLayer as an `arguments` object (what gtag() pushes),
// not as a plain array — GTM ignores the latter.
function gtag() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(arguments)
}

function apply({ analytics, marketing }) {
  const v = (on) => (on ? 'granted' : 'denied')
  gtag('consent', 'update', {
    analytics_storage: v(analytics),
    ad_storage: v(marketing),
    ad_user_data: v(marketing),
    ad_personalization: v(marketing),
  })
}

function save(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...choice, t: Date.now() }))
  } catch {
    /* private mode: the choice still applies for this page view */
  }
  apply(choice)
  pushEvent('riptide_consent_update', {
    riptide_consent_analytics: choice.analytics ? 'granted' : 'denied',
    riptide_consent_marketing: choice.marketing ? 'granted' : 'denied',
  })
}

function render(current) {
  const wrap = document.createElement('div')
  wrap.className = 'consent'
  wrap.innerHTML = `
    <section class="consent-card" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <h2 class="consent-title" id="consent-title">Cookies, které dávají smysl</h2>
      <p class="consent-text">Nezbytné cookies drží web v chodu. S vaším souhlasem použijeme i analytické (Google Analytics) a marketingové (Meta, Google), abychom věděli, co vás zajímá, a mohli vám ukázat relevantní nabídku. Volbu můžete kdykoli změnit v patičce webu. <a href="${PRIVACY_URL}" target="_blank" rel="noopener">Ochrana osobních údajů</a></p>
      <div class="consent-prefs" data-consent-prefs hidden>
        <label class="consent-pref"><span><strong>Nezbytné</strong>Chod webu a uložení této volby.</span><input type="checkbox" checked disabled /></label>
        <label class="consent-pref"><span><strong>Analytické</strong>Google Analytics — návštěvnost a co na webu funguje.</span><input type="checkbox" data-consent-analytics ${current?.analytics ? 'checked' : ''} /></label>
        <label class="consent-pref"><span><strong>Marketingové</strong>Meta a Google — měření reklam a relevantní nabídka.</span><input type="checkbox" data-consent-marketing ${current?.marketing ? 'checked' : ''} /></label>
      </div>
      <div class="consent-actions">
        <button type="button" class="btn btn-primary" data-consent="all">Přijmout vše</button>
        <button type="button" class="btn btn-outline" data-consent="necessary">Jen nezbytné</button>
        <button type="button" class="consent-more" data-consent="settings">Nastavení</button>
      </div>
    </section>
  `
  document.body.appendChild(wrap)
  requestAnimationFrame(() => wrap.classList.add('is-open'))

  const close = () => {
    wrap.classList.remove('is-open')
    setTimeout(() => wrap.remove(), 400)
  }
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-consent]')
    if (!btn) return
    const prefs = wrap.querySelector('[data-consent-prefs]')
    if (btn.dataset.consent === 'all') save({ analytics: true, marketing: true })
    else if (btn.dataset.consent === 'necessary') save({ analytics: false, marketing: false })
    else if (prefs.hidden) {
      prefs.hidden = false
      btn.textContent = 'Uložit výběr'
      return
    } else {
      save({
        analytics: wrap.querySelector('[data-consent-analytics]').checked,
        marketing: wrap.querySelector('[data-consent-marketing]').checked,
      })
    }
    close()
  })
  return wrap
}

export function initConsent() {
  if (!enabled()) return
  // Footer "Nastavení cookies" reopens the dialog with the current choice preselected.
  document.querySelectorAll('[data-consent-open]').forEach((a) => {
    a.hidden = false
    a.addEventListener('click', (e) => {
      e.preventDefault()
      if (document.querySelector('.consent')) return
      const wrap = render(read())
      wrap.querySelector('[data-consent-prefs]').hidden = false
      wrap.querySelector('[data-consent="settings"]').textContent = 'Uložit výběr'
    })
  })
  if (!read()) render(null)
}
