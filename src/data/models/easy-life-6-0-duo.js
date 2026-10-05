import { shop } from '../shop/easy-life-6-0-duo.js'
import { buildModel } from '../shared/modelDefaults.js'
import { duoSpecRows } from '../shared/specRows.js'

export const easyLife60Duo = buildModel({
  shop,
  slug: 'easy-life-6-0-duo',
  series: 'Easy Life',
  category: 'Riptide Easy Life · Dual Zone',
  name: 'Easy Life 6.0 Duo',
  tagline: 'Dvouzónové swim spa s extra hloubkou (vana vysoká 154 cm) — plavecký trénink i vyhřátá relaxace ve dvou oddělených zónách.',
  price: 649900,

  images: {
    hero: '/assets/photos/product-duo-terrace.jpg',
    heroAlt: 'Riptide Easy Life 6.0 Duo — dvouzónové swim spa',
  },

  quickSpecs: [
    { value: '591,5', unit: 'cm', label: 'délka' },
    { value: '8 550', unit: 'l', label: 'objem vody' },
    { value: '2', unit: '', label: 'nezávislé teplotní zóny' },
    { value: '154', unit: 'cm', label: 'výška vany' },
  ],

  specRows: duoSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 679900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a samostatným ovládáním obou zón.',
      highlights: ['Spa zóna 29 °C + Swim zóna 37 °C', '10-stupňové plavání', '4× 3" turbo plavecké trysky'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '8 550 l',
        weight: '1 384 kg',
        power: 'Spa zóna 20 A + Swim zóna 40 A',
        massagePump: '2× 2 HP',
        massageJets: '35 + 12 vzduchových trysek',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ano',
        swimPumps: '2× 3,5 HP (10-stupňové) + 1× 3 HP',
        swimPipe: '3″',
        swimPole: 'Ano',
        spaControl: 'Spatech CA300-3KW',
        spaPanel: 'Touch Screen TP10',
        swimControl: 'Spatech CA300-3KW',
        swimPanel: 'Touch Screen TP10',
      },
      featured: true,
    },
    {
      id: 'pro-luxury',
      name: 'Pro Luxury',
      price: 649900,
      description: 'Stejná dvouzónová výbava, jednorychlostní plavecký proud, nižší nároky na přívod.',
      highlights: ['Spa zóna 29 °C + Swim zóna 37 °C', '4× 3" turbo plavecké trysky', 'Nižší nároky na přívod'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '8 550 l',
        weight: '1 374 kg',
        power: 'Spa zóna 20 A + Swim zóna 32 A',
        massagePump: '2× 2 HP',
        massageJets: '35 + 12 vzduchových trysek',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        spaControl: 'Spatech CA300-3KW',
        spaPanel: 'Touch Screen TP10',
        swimControl: 'Spatech CA300-3KW',
        swimPanel: 'Touch Screen TP10',
      },
    },
  ],
})
