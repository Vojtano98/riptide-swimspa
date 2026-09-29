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

  const focusable = overlay.querySelector('input, button, textarea, select')
  if (focusable) focusable.focus()

  return overlay
}

function onKeydown(e) {
  if (e.key === 'Escape') closeModal()
}

export function closeModal() {
  if (!activeModal) return
  activeModal.classList.remove('is-open')
  document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', onKeydown)
  const el = activeModal
  activeModal = null
  setTimeout(() => el.remove(), 200)
  if (lastFocused && lastFocused.focus) lastFocused.focus()
}
