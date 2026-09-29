import { icon } from '../utils/icons.js'
import { openModal } from '../utils/modal.js'

function formHTML(product) {
  return `
    <h3 class="modal-title" id="inquiry-modal-title">Nezávazná poptávka</h3>
    <p class="modal-subtitle">${product.name} — odpovídáme do 24 hodin.</p>
    <form data-inquiry-form>
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
      <button class="btn btn-primary modal-submit" type="submit">Odeslat poptávku</button>
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

export function bindInquiryModal(product) {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-open-inquiry]')) return
    const overlay = openModal(formHTML(product), { labelledBy: 'inquiry-modal-title' })
    const form = overlay.querySelector('[data-inquiry-form]')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      overlay.querySelector('.modal-body').innerHTML = successHTML()
    })
  })
}
