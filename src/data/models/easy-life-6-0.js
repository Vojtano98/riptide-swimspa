import { buildModel } from '../shared/modelDefaults.js'
import { singleZoneSpecRows } from '../shared/specRows.js'

export const easyLife60 = buildModel({
  slug: 'easy-life-6-0',
  series: 'Easy Life',
  category: 'Riptide Easy Life · Extra Depth',
  name: 'Easy Life 6.0',
  tagline: 'Největší jednozónový Easy Life — extra hloubka 154 cm pro intenzivní plavecký trénink.',
  price: 579900,

  images: {
    hero: '/assets/photos/action-swimmer-underwater.jpg',
    heroAlt: 'Riptide Easy Life 6.0 — plavání proti proudu',
  },

  quickSpecs: [
    { value: '591,5', unit: 'cm', label: 'délka' },
    { value: '9 975', unit: 'l', label: 'objem vody' },
    { value: 'až 45', unit: '', label: 'masážních trysek' },
    { value: '154', unit: 'cm', label: 'hloubka' },
  ],

  specRows: singleZoneSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 599900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem.',
      highlights: ['35 masážních trysek', '10-stupňové plavání', '4× 3" turbo swim jety'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '9 975 l',
        weight: '1 297 kg',
        power: '40 A',
        massageJets: '35',
        massageWall: '—',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ano',
        swimPumps: '2× 3,5 HP (10-stupňové) + 1× 3 HP',
        swimPipe: '3″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
    },
    {
      id: 'pro-luxury',
      name: 'Pro Luxury',
      price: 579900,
      description: 'Více masážních trysek a masážní stěna, jednorychlostní plavecký proud.',
      highlights: ['45 masážních trysek + masážní stěna', '4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '9 975 l',
        weight: '1 287 kg',
        power: '32 A',
        massageJets: '45',
        massageWall: 'Ano',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10 + AP40',
      },
      featured: true,
    },
  ],
})
