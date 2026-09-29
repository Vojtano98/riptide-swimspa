import { buildModel } from '../shared/modelDefaults.js'
import { duoSpecRows } from '../shared/specRows.js'

export const easyLife80Duo = buildModel({
  slug: 'easy-life-8-0-duo',
  series: 'Easy Life',
  category: 'Riptide Easy Life · Dual Zone',
  name: 'Easy Life 8.0 Duo',
  tagline: 'Vlajková loď celé nabídky Riptide — nejdelší dvouzónové swim spa pro plavání i rodinnou relaxaci zároveň.',
  price: 749900,

  images: {
    hero: '/assets/photos/product-duo-terrace.jpg',
    heroAlt: 'Riptide Easy Life 8.0 Duo — největší dvouzónové swim spa',
  },

  quickSpecs: [
    { value: '798,5', unit: 'cm', label: 'délka' },
    { value: '13 530', unit: 'l', label: 'objem vody' },
    { value: '2', unit: '', label: 'nezávislé teplotní zóny' },
    { value: '154', unit: 'cm', label: 'hloubka' },
  ],

  specRows: duoSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 779900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a samostatným ovládáním obou zón.',
      highlights: ['Spa zóna 29 °C + Swim zóna 37 °C', '10-stupňové plavání', '4× 3" turbo swim jety'],
      specs: {
        dimensions: '798,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '13 530 l',
        weight: '1 870 kg',
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
      price: 749900,
      description: 'Stejná dvouzónová výbava, jednorychlostní plavecký proud, rozšířený panel plavecké zóny.',
      highlights: ['Spa zóna 29 °C + Swim zóna 37 °C', '4× 3" turbo swim jety', 'Ovládací panel swim zóny TP10 + AP40'],
      specs: {
        dimensions: '798,5 × 235 × 154 cm',
        seating: '3 sedy + 1 lehátko',
        capacity: '13 530 l',
        weight: '1 856 kg',
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
        swimPanel: 'Touch Screen TP10 + AP40',
      },
    },
  ],
})
