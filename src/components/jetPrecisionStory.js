// Renders nothing if the series has no jetPrecision data — Atlas/Atlantis (pure swim
// pools, no hydrotherapy seating) get their own swim-jet-focused copy + a cropped image
// instead (see data/shared/poolPrecision.js), never this hydrotherapy-specific version.
export function renderJetPrecisionStory(section) {
  if (!section) return ''

  const stats = section.stats.map((s) => `<span class="story-stat">${s}</span>`).join('')

  return `
    <section class="section section--white">
      <div class="container">
        <div class="precision-media" data-reveal="scale">
          <img src="${section.image}" alt="${section.imageAlt}" loading="lazy" decoding="async" />
        </div>
        <div class="precision-copy" data-reveal>
          <span class="eyebrow">${section.eyebrow}</span>
          <h2 class="h-section">${section.claim}</h2>
          <p class="body-l">${section.text}</p>
          <div class="story-stats">${stats}</div>
        </div>
      </div>
    </section>
  `
}
