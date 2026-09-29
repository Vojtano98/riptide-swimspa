export function renderQuickSpecs(product) {
  const items = product.quickSpecs
    .map(
      (s) => `
      <div class="quick-spec">
        <div class="quick-spec-value">${s.value}<span class="quick-spec-unit">${s.unit}</span></div>
        <div class="quick-spec-label">${s.label}</div>
      </div>
    `
    )
    .join('')

  return `
    <section class="section section--tight section--white" id="parametry">
      <div class="container">
        <div class="quick-specs" data-reveal>${items}</div>
        <div class="quick-specs-footer" data-reveal>
          <a href="#specifikace" class="btn btn-text">
            Zobrazit všechny specifikace
            ${'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'}
          </a>
        </div>
      </div>
    </section>
  `
}
