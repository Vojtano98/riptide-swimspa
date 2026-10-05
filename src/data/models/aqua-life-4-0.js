import { shop } from '../shop/aqua-life-4-0.js'
import { buildModel } from '../shared/modelDefaults.js'
import { singleZoneSpecRows } from '../shared/specRows.js'

export const aquaLife40 = buildModel({
  shop,
  slug: 'aqua-life-4-0',
  series: 'Aqua Life',
  category: 'Riptide Aqua Life · Standard Depth',
  name: 'Aqua Life 4.0',
  tagline: 'Nejmenší a nejdostupnější model Riptide — 6 sedacích míst a plavecký proud na malou zahradu.',
  price: 419900,

  images: {
    hero: '/assets/photos/lifestyle-collage-family.jpg',
    heroAlt: 'Riptide Aqua Life 4.0 — rodinná zábava ve swim spa',
  },

  quickSpecs: [
    { value: '385', unit: 'cm', label: 'délka' },
    { value: '4 000', unit: 'l', label: 'objem vody' },
    { value: '44', unit: '', label: 'masážních trysek' },
    { value: '6', unit: '', label: 'sedacích míst' },
  ],

  specRows: singleZoneSpecRows,
  variants: [
    {
      id: 'pro-luxury',
      name: 'Pro Luxury',
      price: 449900,
      description: 'Plná hydromasážní výbava s 5 sedy a 1 lehátkem, silnější plavecký proud.',
      highlights: ['44 masážních trysek', '5 sedů + 1 lehátko', '4× 3" turbo plavecké trysky'],
      specs: {
        dimensions: '385 × 220 × 119 cm',
        seating: '5 sedů + 1 lehátko',
        capacity: '4 000 l',
        weight: '834 kg',
        power: '32 A',
        massageJets: '44',
        massageWall: '—',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
      featured: true,
    },
    {
      id: 'hydro',
      name: 'Hydro',
      price: 419900,
      description: 'Odlehčené provedení se 2 plavecké trysky a nejnižší pořizovací náklady v řadě.',
      highlights: ['44 masážních trysek', '2× 3" turbo plavecké trysky', 'Nejnižší nároky na přívod (25 A)'],
      specs: {
        dimensions: '385 × 220 × 119 cm',
        seating: '5 sedů + 1 lehátko',
        capacity: '4 000 l',
        weight: '804 kg',
        power: '25 A',
        massageJets: '44',
        massageWall: '—',
        swimJets: '3" Turbo jety × 2',
        tenSpeed: 'Ne',
        swimPumps: '2× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
    },
  ],
})
