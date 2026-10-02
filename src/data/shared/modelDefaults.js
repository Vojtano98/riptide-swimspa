import { featureImages, featureBenefits } from './features.js'
import { savings } from './savings.js'
import { insulation } from './insulation.js'
import { showroom } from './showroom.js'

// Shell + cabinet colour options — identical swatch row on every Riptide spec
// sheet in the catalogues (Atlas, Atlantis, Aqua Life and Easy Life alike).
const materials = {
  note: 'Skořepina se dodává v odstínu Alpine White, bednění na výběr ve dvou odstínech. Barvy jsou orientační — konečný odstín se může mírně lišit dle nastavení monitoru.',
  shell: {
    label: 'Skořepina',
    options: [{ id: 'alpine-white', name: 'Alpine White', color: '#F4F1EA' }],
  },
  cabinet: {
    label: 'Bednění',
    options: [
      { id: 'ice-grey', name: 'Ice Grey', color: '#9CA3AA' },
      { id: 'ash-black', name: 'Ash Black', color: '#2B2E30' },
    ],
  },
}

// Merges the boilerplate every model page needs (shared technology photos/copy,
// savings + showroom sections, mobile CTA) with the model-specific fields
// (name, dimensions, variants, spec table) defined in each model's own file.
export function buildModel(model) {
  return {
    currency: 'Kč',
    heroStyle: 'lifestyle',
    ...model,
    images: {
      feature: featureImages,
      ...model.images,
    },
    benefits: featureBenefits,
    materials,
    insulation,
    savings,
    showroom,
    finalCta: model.finalCta ?? {
      headline: `Kolik bude stát váš ${model.name}?`,
      text: 'Připravíme vám nezávaznou nabídku včetně dopravy, instalace a doporučeného příslušenství.',
      primaryCta: { label: 'Spočítat finální cenu', inquiry: true },
      secondaryCta: { label: 'Domluvit konzultaci', href: '/#showroom' },
      note: 'Odpovídáme do 24 hodin. Nezávazná kalkulace.',
    },
  }
}
