import { buildModel } from '../shared/modelDefaults.js'
import { singleZoneSpecRows } from '../shared/specRows.js'

export const easyLife70 = buildModel({
  slug: 'easy-life-7-0',
  series: 'Easy Life',
  category: 'Riptide Easy Life · Extra Depth',
  name: 'Easy Life 7.0',
  tagline: 'Velkorysá plavecká dráha s extra hloubkou 154 cm — prostor pro naplno rozvinutý plavecký styl.',
  price: 619900,

  images: {
    hero: '/assets/photos/hero-aerial-swimmer.jpg',
    heroAlt: 'Riptide Easy Life 7.0 — pohled shora na plavce',
  },

  quickSpecs: [
    { value: '706,5', unit: 'cm', label: 'délka' },
    { value: '12 230', unit: 'l', label: 'objem vody' },
    { value: 'až 45', unit: '', label: 'masážních trysek' },
    { value: '154', unit: 'cm', label: 'hloubka' },
  ],

  specRows: singleZoneSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 649900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem.',
      highlights: ['35 masážních trysek', '10-stupňové plavání', '4× 3" turbo swim jety'],
      specs: {
        dimensions: '706,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '12 230 l',
        weight: '1 550 kg',
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
      price: 619900,
      description: 'Více masážních trysek a masážní stěna, jednorychlostní plavecký proud.',
      highlights: ['45 masážních trysek + masážní stěna', '4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40'],
      specs: {
        dimensions: '706,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '12 230 l',
        weight: '1 530 kg',
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
