import { icon } from './icons.js'

let activeModal = null
let lastFocused = null

export function openModal(bodyHTML, { labelledBy = '' } = {}) {
  closeModal()
  lastFocused = document.activeElement

  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" ${labelledBy ? `aria-labelledby="${labelledBy}"` : ''}>
      <button class="modal-close" type="button" aria-label="Zavřít">${icon('close', 20)}</button>
      <div class="modal-body">${bodyHTML}</div>
    </div>
  `
  document.body.appendChild(overlay)
  document.body.classList.add('modal-open')
  activeModal = overlay

  requestAnimationFrame(() => overlay.classList.add('is-open'))

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal()
  })
  overlay.querySelector('.modal-close').addEventListener('click', closeModal)
  document.addEventListener('keydown', onKeydown)

  // Everything behind the dialog becomes inert (no tabbing, no screen-reader access),
  // and Tab / Shift+Tab cycle inside the dialog.
  const app = document.getElementById('app')
  if (app) app.inert = true
  overlay.addEventListener('keydown', trapTab)

  // First form field if there is one (not the honeypot), otherwise the first button.
  const focusable =
    overlay.querySelector('input:not([tabindex="-1"]):not([type="checkbox"]), textarea, select') || overlay.querySelector('button')
  if (focusable) focusable.focus()

  return overlay
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'

function trapTab(e) {
  if (e.key !== 'Tab' || !activeModal) return
  const items = [...activeModal.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') closeModal()
}

export function closeModal() {
  if (!activeModal) return
  activeModal.classList.remove('is-open')
  document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', onKeydown)
  const app = document.getElementById('app')
  if (app) app.inert = false
  const el = activeModal
  activeModal = null
  setTimeout(() => el.remove(), 200)
  if (lastFocused && lastFocused.focus) lastFocused.focus()
}
