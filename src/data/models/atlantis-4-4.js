import { shop } from '../shop/atlantis-4-4.js'
import { buildModel } from '../shared/modelDefaults.js'
import { poolSpecRows } from '../shared/specRows.js'

export const atlantis44 = buildModel({
  shop,
  slug: 'atlantis-4-4',
  series: 'Atlantis',
  category: 'Riptide Atlantis · Extra Depth',
  name: 'Atlantis 4.4',
  tagline: 'Nejkompaktnější extra hluboký plavecký bazén řady Atlantis — 154 cm hloubky na malý pozemek.',
  price: 549900,

  images: {
    hero: '/assets/photos/lifestyle-poolside-friends.jpg',
    heroAlt: 'Riptide Atlantis 4.4 — relax u bazénu',
  },

  quickSpecs: [
    { value: '443', unit: 'cm', label: 'délka' },
    { value: '154', unit: 'cm', label: 'hloubka' },
    { value: '7 722', unit: 'l', label: 'objem vody' },
    { value: '4×', unit: '', label: '3" turbo swim jety' },
  ],

  specRows: poolSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 579900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a nejtlustší skořepinou na trhu.',
      highlights: ['4× 3" turbo swim jety', '10-stupňové plavání', 'Nejtlustší skořepina na trhu'],
      specs: {
        dimensions: '443 × 235 × 154 cm',
        capacity: '7 722 l',
        weight: '958 kg',
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
      price: 549900,
      description: 'Stejný výkon trysek, jednorychlostní plavecký proud, nižší nároky na přívod.',
      highlights: ['4× 3" turbo swim jety', 'Nižší nároky na přívod (32 A)', 'Kompaktnější provedení'],
      specs: {
        dimensions: '443 × 235 × 154 cm',
        capacity: '7 722 l',
        weight: '948 kg',
        power: '32 A',
        swimJets: '3" Turbo jety × 4',
        tenSpeed: 'Ne',
        swimPumps: '3× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10',
      },
    },
  ],
})
