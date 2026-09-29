export function renderShowroomSection(home) {
  const s = home.showroom
  const c = s.contact

  return `
    <section class="section section--white" id="showroom">
      <div class="container showroom-layout">
        <div class="showroom-media" data-reveal>
          <img src="${s.image}" alt="${s.imageAlt}" loading="lazy" />
        </div>
        <div data-reveal>
          <span class="eyebrow">${s.eyebrow}</span>
          <h2 class="h-section">${s.headline}</h2>
          <p class="body-l">${s.text}</p>
          <ul class="showroom-points">
            ${s.points.map((p) => `<li>${p}</li>`).join('')}
          </ul>
          <div class="showroom-contact-card">
            <div class="showroom-contact-row">
              <span class="showroom-contact-label">Adresa showroomu</span>
              <a class="showroom-contact-value" href="${c.mapHref}" target="_blank" rel="noopener">
                ${c.address.join(', ')} ↗
              </a>
            </div>
            <div class="showroom-contact-row">
              <span class="showroom-contact-label">Telefon</span>
              <a class="showroom-contact-value" href="${c.phoneHref}">${c.phone}</a>
            </div>
            <div class="showroom-contact-row">
              <span class="showroom-contact-label">E-mail</span>
              <a class="showroom-contact-value" href="mailto:${c.email}">${c.email}</a>
            </div>
          </div>
          <button class="btn btn-primary" data-open-inquiry>${s.cta.label}</button>
        </div>
      </div>
    </section>
  `
}
