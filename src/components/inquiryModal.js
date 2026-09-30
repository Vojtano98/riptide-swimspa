import { icon } from '../utils/icons.js'
import { openModal } from '../utils/modal.js'
import { INQUIRY_ENDPOINT } from '../config/forms.js'

// Submitted as a native form POST into a hidden iframe (not fetch) because FormSubmit's
// AJAX endpoint rejects cross-origin requests from origins it hasn't seen before —
// a plain form submission has no such restriction, so this works everywhere immediately.
const RELAY_FRAME_NAME = 'inquiry-relay'

function ensureRelayFrame() {
  if (document.querySelector(`iframe[name="${RELAY_FRAME_NAME}"]`)) return
  const frame = document.createElement('iframe')
  frame.name = RELAY_FRAME_NAME
  frame.style.display = 'none'
  frame.setAttribute('aria-hidden', 'true')
  document.body.appendChild(frame)
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
    <form data-inquiry-form novalidate action="${INQUIRY_ENDPOINT}" method="POST" target="${RELAY_FRAME_NAME}">
      <input type="text" name="_honey" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <input type="hidden" name="_subject" value="${buildSubject(context)}" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="Swim spa" value="${context.name}" />
      <input type="hidden" name="Vybraná výbava" value="${context.variantName || 'nevybráno (obecná poptávka)'}" />
      <input type="hidden" name="Stránka" value="${window.location.href}" />
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

function bindForm(form, overlay) {
  const submitBtn = form.querySelector('[data-submit-btn]')
  const errorEl = form.querySelector('[data-inquiry-error]')
  const honey = form.querySelector('[name="_honey"]')
  const frame = document.querySelector(`iframe[name="${RELAY_FRAME_NAME}"]`)

  form.addEventListener('submit', (ev) => {
    if (honey.value) {
      ev.preventDefault() // bot filled the hidden field — drop silently
      return
    }
    if (!form.reportValidity()) {
      ev.preventDefault()
      return
    }

    errorEl.hidden = true
    submitBtn.disabled = true
    submitBtn.textContent = 'Odesílám…'

    let settled = false
    const finishSuccess = () => {
      if (settled) return
      settled = true
      frame.removeEventListener('load', finishSuccess)
      overlay.querySelector('.modal-body').innerHTML = successHTML()
    }
    frame.addEventListener('load', finishSuccess)

    setTimeout(() => {
      if (settled) return
      settled = true
      frame.removeEventListener('load', finishSuccess)
      errorEl.textContent = 'Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám zavolejte na +420 777 605 789.'
      errorEl.hidden = false
      submitBtn.disabled = false
      submitBtn.textContent = 'Odeslat poptávku'
    }, 10000)

    // no preventDefault here — the browser submits the form natively into the hidden iframe
  })
}

export function bindInquiryModal(product) {
  ensureRelayFrame()

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-inquiry]')
    if (!trigger) return

    const context = {
      name: product.name,
      variantName: trigger.dataset.variantName || null,
    }

    const overlay = openModal(formHTML(context), { labelledBy: 'inquiry-modal-title' })
    const form = overlay.querySelector('[data-inquiry-form]')
    bindForm(form, overlay)
  })
}
