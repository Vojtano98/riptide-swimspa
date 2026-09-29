import { buildModel } from '../shared/modelDefaults.js'
import { poolSpecRows } from '../shared/specRows.js'

export const atlantis60 = buildModel({
  slug: 'atlantis-6-0',
  series: 'Atlantis',
  category: 'Riptide Atlantis · Extra Depth',
  name: 'Atlantis 6.0',
  tagline: 'Extra hluboký plavecký bazén 154 cm pro náročnější trénink a realističtější pocit plavání.',
  price: 629900,

  images: {
    hero: '/assets/photos/detail-water-step.jpg',
    heroAlt: 'Riptide Atlantis 6.0 — detail nástupních schodů',
  },

  quickSpecs: [
    { value: '591,5', unit: 'cm', label: 'délka' },
    { value: '154', unit: 'cm', label: 'hloubka' },
    { value: '11 004', unit: 'l', label: 'objem vody' },
    { value: '4×', unit: '', label: '3" turbo swim jety' },
  ],

  specRows: poolSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 659900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a nejtlustší skořepinou na trhu.',
      highlights: ['4× 3" turbo swim jety', '10-stupňové plavání', 'Nejtlustší skořepina na trhu'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        capacity: '11 004 l',
        weight: '1 280 kg',
        power: '40 A',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ano',
        swimPumps: '2× 3,5 HP (10-stupňové) + 1× 3 HP',
        swimPipe: '3″',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
      featured: true,
    },
    {
      id: 'pro-luxury',
      name: 'Pro Luxury',
      price: 629900,
      description: 'Stejný výkon trysek, jednorychlostní plavecký proud, rozšířený panel AP40.',
      highlights: ['4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40', 'Nižší nároky na přívod (32 A)'],
      specs: {
        dimensions: '591,5 × 235 × 154 cm',
        capacity: '11 004 l',
        weight: '1 270 kg',
        power: '32 A',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10 + AP40',
      },
    },
  ],
})
