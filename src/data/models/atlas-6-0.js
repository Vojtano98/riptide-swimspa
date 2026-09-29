import { buildModel } from '../shared/modelDefaults.js'
import { poolSpecRows } from '../shared/specRows.js'

export const atlas60 = buildModel({
  slug: 'atlas-6-0',
  series: 'Atlas',
  category: 'Riptide Atlas · Standard Depth',
  name: 'Atlas 6.0',
  tagline: 'Prostorný plavecký bazén se standardní hloubkou 129 cm — pro celoroční plavání i rodinnou zábavu.',
  price: 559900,

  images: {
    hero: '/assets/photos/hero-aerial-swimmer.jpg',
    heroAlt: 'Riptide Atlas 6.0 — plavecký bazén v zahradě, pohled shora na plavce',
  },

  quickSpecs: [
    { value: '591,5', unit: 'cm', label: 'délka' },
    { value: '235', unit: 'cm', label: 'šířka' },
    { value: '8 970', unit: 'l', label: 'objem vody' },
    { value: 'až 4×', unit: '', label: '3" turbo swim jety' },
  ],

  specRows: poolSpecRows,
  variants: [
    {
      id: 'pro-premium',
      name: 'Pro Premium',
      price: 629900,
      description: 'Plná výbava s 10-stupňovým plaveckým systémem a nejsilnějším proudem v řadě.',
      highlights: ['4× 3" turbo swim jety', '10-stupňové plavání', 'Plavecké potrubí 3"'],
      specs: {
        dimensions: '591,5 × 235 × 129 cm',
        capacity: '8 970 l',
        weight: '1 060 kg',
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
      price: 599900,
      description: 'Stejný výkon trysek, jednorychlostní plavecký proud a rozšířený dotykový panel AP40.',
      highlights: ['4× 3" turbo swim jety', 'Ovládací panel TP10 + AP40', 'Nižší nároky na přívod (32 A)'],
      specs: {
        dimensions: '591,5 × 235 × 129 cm',
        capacity: '8 970 l',
        weight: '1 050 kg',
        power: '32 A',
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
    {
      id: 'hydro',
      name: 'Hydro',
      price: 559900,
      description: 'Odlehčené provedení se 2 swim jety pro rekreační plavání a nejnižší pořizovací náklady.',
      highlights: ['2× 3" turbo swim jety', 'Nejnižší nároky na přívod (25 A)', 'Stejná izolace Platinum Lock'],
      specs: {
        dimensions: '591,5 × 235 × 129 cm',
        capacity: '8 970 l',
        weight: '1 020 kg',
        power: '25 A',
        swimJets: '3" Turbo jety × 2',
        tenSpeed: 'Ne',
        swimPumps: '2× 3 HP',
        swimPipe: '2″',
        swimPole: 'Ano',
        control: 'Spatech CA300-3KW',
        panel: 'Touch Screen TP10 + AP40',
      },
    },
  ],
})
