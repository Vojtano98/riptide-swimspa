function renderCtaButton(cta, cls) {
  return cta.inquiry
    ? `<button class="btn ${cls}" data-open-inquiry>${cta.label}</button>`
    : `<a class="btn ${cls}" href="${cta.href}">${cta.label}</a>`
}

export function renderFinalCtaHome(home) {
  const c = home.finalCta

  return `
    <section class="section section--dark" id="kontakt">
      <div class="container final-cta">
        <h2 class="h-section final-cta-headline" data-reveal>${c.headline}</h2>
        <p class="body-l final-cta-text" data-reveal>${c.text}</p>
        <div class="final-cta-actions" data-reveal>
          ${renderCtaButton(c.primaryCta, 'btn-primary')}
          ${renderCtaButton(c.secondaryCta, 'btn-outline')}
        </div>
        <p class="final-cta-note" data-reveal>${c.note}</p>
      </div>
    </section>
  `
}
