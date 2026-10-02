import { shop } from '../shop/easy-life-5-5.js'
import { buildModel } from '../shared/modelDefaults.js'
import { singleZoneSpecRows } from '../shared/specRows.js'

export const easyLife55 = buildModel({
  shop,
  slug: 'easy-life-5-5',
  series: 'Easy Life',
  category: 'Riptide Easy Life · Extra Depth',
  name: 'Easy Life 5.5',
  tagline: 'Střední velikost s extra hloubkou 154 cm — vyvážený poměr plaveckého tréninku a hydromasáže.',
  price: 539900,

  images: {
    hero: '/assets/photos/lifestyle-poolside-friends.jpg',
    heroAlt: 'Riptide Easy Life 5.5 — odpočinek u swim spa',
  },

  quickSpecs: [
    { value: '549,5', unit: 'cm', label: 'délka' },
    { value: '9 223', unit: 'l', label: 'objem vody' },
    { value: 'až 45', unit: '', label: 'masážních trysek' },
    { value: '154', unit: 'cm', label: 'hloubka' },
  ],

  specRows: singleZoneSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 559900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem.',
      highlights: ['35 masážních trysek', '10-stupňové plavání', '4× 3" turbo swim jety'],
      specs: {
        dimensions: '549,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '9 223 l',
        weight: '1 254 kg',
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
      price: 539900,
      description: 'Více masážních trysek a masážní stěna, jednorychlostní plavecký proud.',
      highlights: ['45 masážních trysek + masážní stěna', '4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40'],
      specs: {
        dimensions: '549,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '9 223 l',
        weight: '1 244 kg',
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
