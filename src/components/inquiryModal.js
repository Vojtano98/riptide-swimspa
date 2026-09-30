import { icon } from '../utils/icons.js'
import { openModal } from '../utils/modal.js'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config/forms.js'
import { showroom } from '../data/shared/showroom.js'

const PLACEMENT_LABELS = {
  zahrada: 'Zahrada',
  terasa: 'Terasa',
  interier: 'Interiér',
  nevim: 'Zatím neví',
}

function subtitleFor(context) {
  return context.variantName ? `${context.name} — ${context.variantName} · odpovídáme do 24 hodin.` : `${context.name} — odpovídáme do 24 hodin.`
}

function buildSubject(context) {
  return context.variantName
    ? `Poptávka z webu — ${context.name} (${context.variantName})`
    : `Poptávka z webu — ${context.name}`
}

function formHTML(context) {
  return `
    <h3 class="modal-title" id="inquiry-modal-title">Nezávazná poptávka</h3>
    <p class="modal-subtitle">${subtitleFor(context)}</p>
    <form data-inquiry-form novalidate>
      <input type="checkbox" name="botcheck" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <div class="form-grid">
        <div class="form-field">
          <label for="f-name">Jméno</label>
          <input id="f-name" name="name" type="text" required autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="f-phone">Telefon</label>
          <input id="f-phone" name="phone" type="tel" required autocomplete="tel" />
        </div>
        <div class="form-field full">
          <label for="f-email">E-mail</label>
          <input id="f-email" name="email" type="email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="f-location">Lokalita</label>
          <input id="f-location" name="location" type="text" placeholder="Město, PSČ" />
        </div>
        <div class="form-field">
          <label for="f-placement">Umístění</label>
          <select id="f-placement" name="placement">
            <option value="zahrada">Zahrada</option>
            <option value="terasa">Terasa</option>
            <option value="interier">Interiér</option>
            <option value="nevim">Zatím nevím</option>
          </select>
        </div>
        <div class="form-field full">
          <label for="f-note">Poznámka</label>
          <textarea id="f-note" name="note" rows="3"></textarea>
        </div>
      </div>
      <p class="form-error" data-inquiry-error hidden></p>
      <button class="btn btn-primary modal-submit" type="submit" data-submit-btn>Odeslat poptávku</button>
    </form>
  `
}

function successHTML() {
  return `
    <div class="modal-success">
      <div class="modal-success-icon">${icon('check', 26)}</div>
      <h3 class="modal-title">Děkujeme za poptávku</h3>
      <p class="modal-subtitle">Ozveme se vám do 24 hodin s nezávaznou kalkulací.</p>
    </div>
  `
}

function bindForm(form, overlay, context) {
  const submitBtn = form.querySelector('[data-submit-btn]')
  const errorEl = form.querySelector('[data-inquiry-error]')

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    if (!form.reportValidity()) return

    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot tripped — silently drop, no request sent

    errorEl.hidden = true
    submitBtn.disabled = true
    submitBtn.textContent = 'Odesílám…'

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: buildSubject(context),
      from_name: 'Riptide Swim Spa — nová poptávka',
      replyto: data.get('email'),
      'Jméno zákazníka': data.get('name'),
      'Telefon zákazníka': data.get('phone'),
      'E-mail zákazníka': data.get('email'),
      Lokalita: data.get('location') || 'neuvedeno',
      'Plánované umístění': PLACEMENT_LABELS[data.get('placement')] || data.get('placement'),
      'Poznámka zákazníka': data.get('note') || 'bez poznámky',
      'Poptávaný model': context.name,
      'Vybraná výbava': context.variantName || 'obecná poptávka (výbava nevybrána)',
      'Zdrojová stránka': window.location.href,
      'Odesláno systémem': `${showroom.contact.company} · ${showroom.contact.phone} · ${showroom.contact.email}`,
    }

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok || !result.success) throw new Error(result.message || 'Odeslání se nezdařilo.')

      overlay.querySelector('.modal-body').innerHTML = successHTML()
    } catch (err) {
      errorEl.textContent = 'Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám zavolejte na +420 777 605 789.'
      errorEl.hidden = false
      submitBtn.disabled = false
      submitBtn.textContent = 'Odeslat poptávku'
    }
  })
}

export function bindInquiryModal(product) {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-inquiry]')
    if (!trigger) return

    const context = {
      name: product.name,
      variantName: trigger.dataset.variantName || null,
    }

    const overlay = openModal(formHTML(context), { labelledBy: 'inquiry-modal-title' })
    const form = overlay.querySelector('[data-inquiry-form]')
    bindForm(form, overlay, context)
  })
}
