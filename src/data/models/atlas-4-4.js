import { buildModel } from '../shared/modelDefaults.js'
import { poolSpecRows } from '../shared/specRows.js'

export const atlas44 = buildModel({
  slug: 'atlas-4-4',
  series: 'Atlas',
  category: 'Riptide Atlas · Standard Depth',
  name: 'Atlas 4.4',
  tagline: 'Kompaktnější plavecký bazén standardní hloubky 129 cm pro menší zahrady.',
  price: 489900,

  images: {
    hero: '/assets/photos/action-swimmer-underwater.jpg',
    heroAlt: 'Riptide Atlas 4.4 — plavání proti proudu',
  },

  quickSpecs: [
    { value: '443', unit: 'cm', label: 'délka' },
    { value: '235', unit: 'cm', label: 'šířka' },
    { value: '5 690', unit: 'l', label: 'objem vody' },
    { value: 'až 4×', unit: '', label: '3" turbo swim jety' },
  ],

  specRows: poolSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 549900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem.',
      highlights: ['4× 3" turbo swim jety', '10-stupňové plavání', 'Plavecké potrubí 3"'],
      specs: {
        dimensions: '443 × 235 × 129 cm',
        capacity: '5 690 l',
        weight: '775 kg',
        power: '40 A',
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
      price: 529900,
      description: 'Stejný výkon trysek, jednorychlostní plavecký proud, nižší nároky na přívod.',
      highlights: ['4× 3" turbo swim jety', 'Nižší nároky na přívod (32 A)', 'Kompaktnější provedení'],
      specs: {
        dimensions: '443 × 235 × 129 cm',
        capacity: '5 690 l',
        weight: '765 kg',
        power: '32 A',
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
      price: 489900,
      description: 'Odlehčené provedení se 2 swim jety a nejnižší pořizovací náklady.',
      highlights: ['2× 3" turbo swim jety', 'Nejnižší nároky na přívod (25 A)', 'Stejná izolace Platinum Lock'],
      specs: {
        dimensions: '443 × 235 × 129 cm',
        capacity: '5 690 l',
        weight: '735 kg',
        power: '25 A',
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
