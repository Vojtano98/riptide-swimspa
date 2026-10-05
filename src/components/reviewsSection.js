import { reviews } from '../data/shared/reviews.js'

// Store ratings from SwimSpa.cz (see scripts/fetch-shop-reviews.py), attributed. The summary
// is the shop's own average and count. Several customers typed without diacritics; the
// display copy below only restores the accents — wording and names are untouched.
const ACCENTED = {
  'Vse fungovalo skvele. Doporucujeme.': 'Vše fungovalo skvěle. Doporučujeme.',
  'Dobrá cena, rychlé a férové jednáni, profesionalita.': 'Dobrá cena, rychlé a férové jednání, profesionalita.',
  'Vahali jsme pri vyberu, ale pan Nosak nam poradil a pak uz slo vse jak na dratkach. Jsme moc spokojeni s komunikaci i jednanim. Dekujeme a vsem budeme urcite doporucovat!':
    'Váhali jsme při výběru, ale pan Nosak nám poradil a pak už šlo vše jak na drátkách. Jsme moc spokojeni s komunikací i jednáním. Děkujeme a všem budeme určitě doporučovat!',
  'Snadna komunikace, profesionalni pristup, rychle jednani-presne, co jsme potrebovali!':
    'Snadná komunikace, profesionální přístup, rychlé jednání — přesně, co jsme potřebovali!',
}
const STAR = '<svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9 4.8 17.7l1-5.9L1.5 7.7l5.9-.8L10 1.5z" fill="currentColor"/></svg>'
const stars = (n) => `<span class="rv-stars" role="img" aria-label="${n} z 5 hvězdiček">${STAR.repeat(n)}</span>`

export function renderReviews() {
  const cards = reviews.items
    .map(
      (r, i) => `
      <figure class="rv-card" data-reveal style="--d:${i * 0.06}s">
        ${stars(r.stars)}
        <blockquote>${ACCENTED[r.text] || r.text}</blockquote>
        <figcaption><strong>${r.name}</strong><span>${r.date}</span></figcaption>
      </figure>`
    )
    .join('')

  return `
    <section class="section section--white" id="hodnoceni">
      <div class="container">
        <div class="rv-head" data-reveal>
          <div>
            <span class="eyebrow">HODNOCENÍ ZÁKAZNÍKŮ</span>
            <h2 class="h-section">Co o nás říkají zákazníci.</h2>
          </div>
          <div class="rv-summary">
            <span class="rv-score">${reviews.average}</span>
            <div>
              ${stars(5)}
              <span class="rv-count">z 5 · ${reviews.count} hodnocení obchodu SwimSpa.cz</span>
            </div>
          </div>
        </div>
        <div class="rv-grid">${cards}</div>
        <p class="rv-source" data-reveal><a href="${reviews.source}" target="_blank" rel="noopener">Všechna hodnocení na SwimSpa.cz ↗</a></p>
      </div>
    </section>
  `
}
