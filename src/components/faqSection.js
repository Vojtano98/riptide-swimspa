import { faq } from '../data/shared/faq.js'

// Accordion of answers built from facts already on the site (see data/shared/faq.js).
export function renderFaq({ limit } = {}) {
  const items = (limit ? faq.slice(0, limit) : faq)
    .map(
      (f) => `
      <details class="about-block faq-item">
        <summary class="about-block-title">
          <span class="about-block-label">${f.q}</span>
          <svg class="about-block-chev" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div class="about-block-body"><p class="about-p">${f.a}</p></div>
      </details>`
    )
    .join('')

  return `
    <section class="section section--tint" id="faq">
      <div class="container faq-layout">
        <div class="faq-head" data-reveal>
          <span class="eyebrow">ČASTÉ OTÁZKY</span>
          <h2 class="h-section">Než se rozhodnete.</h2>
          <p class="body-l">Odpovědi, které se hodí vědět před poptávkou. Chybí vám něco? Napište nebo zavolejte.</p>
          <button class="btn btn-outline" data-open-inquiry data-inquiry-intent="question">Zeptat se poradce</button>
        </div>
        <div class="faq-list" data-reveal>${items}</div>
      </div>
    </section>
  `
}
