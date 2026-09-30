// Renders nothing if the series has no jetPrecision data — Atlas/Atlantis (pure swim
// pools, no hydrotherapy seating) don't get this section. See data/shared/jetPrecision.js.
export function renderJetPrecisionStory(section) {
  if (!section) return ''

  const stats = section.stats.map((s) => `<span class="story-stat">${s}</span>`).join('')

  return `
    <section class="section section--white">
      <div class="container">
        <div class="story" data-reveal>
          <div class="story-media" data-reveal="scale">
            <img src="${section.image}" alt="${section.imageAlt}" loading="lazy" decoding="async" />
          </div>
          <div>
            <span class="eyebrow">${section.eyebrow}</span>
            <h2 class="h-section story-headline">${section.claim}</h2>
            <p class="story-text body-l">${section.text}</p>
            <div class="story-stats">${stats}</div>
          </div>
        </div>
      </div>
    </section>
  `
}
