import { featureImages, featureBenefits } from './features.js'
import { savings } from './savings.js'
import { showroom } from './showroom.js'

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
