import { shop } from '../shop/atlantis-7-0.js'
import { buildModel } from '../shared/modelDefaults.js'
import { poolSpecRows } from '../shared/specRows.js'

export const atlantis70 = buildModel({
  shop,
  slug: 'atlantis-7-0',
  series: 'Atlantis',
  category: 'Riptide Atlantis · Extra Depth',
  name: 'Atlantis 7.0',
  tagline: 'Vlajková loď řady Atlantis — extra hloubka 154 cm a nejtlustší skořepina na trhu pro nejnáročnější plavce.',
  price: 699900,

  images: {
    hero: '/assets/photos/hero-aerial-swimmer.jpg',
    heroAlt: 'Riptide Atlantis 7.0 — extra hluboký plavecký bazén',
  },

  quickSpecs: [
    { value: '706,5', unit: 'cm', label: 'délka' },
    { value: '154', unit: 'cm', label: 'hloubka' },
    { value: '13 554', unit: 'l', label: 'objem vody' },
    { value: '4×', unit: '', label: '3" turbo swim jety' },
  ],

  specRows: poolSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 729900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a nejtlustší skořepinou na trhu.',
      highlights: ['4× 3" turbo swim jety', '10-stupňové plavání', 'Nejtlustší skořepina na trhu'],
      specs: {
        dimensions: '706,5 × 235 × 154 cm',
        capacity: '13 554 l',
        weight: '1 530 kg',
        power: '40 A',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ano',
        swimPumps: '2× 3,5 HP (10-stupňové) + 1× 3 HP',
        swimPipe: '3″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
      featured: true,
    },
    {
      id: 'pro-luxury',
      name: 'Pro Luxury',
      price: 699900,
      description: 'Stejný výkon trysek, jednorychlostní plavecký proud, rozšířený panel AP40.',
      highlights: ['4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40', 'Nižší nároky na přívod (32 A)'],
      specs: {
        dimensions: '706,5 × 235 × 154 cm',
        capacity: '13 554 l',
        weight: '1 520 kg',
        power: '32 A',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10 + AP40',
      },
    },
  ],
})
