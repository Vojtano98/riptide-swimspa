import { savings } from '../shared/savings.js'
import { showroom } from '../shared/showroom.js'
import { swimJetPrecision as jetPrecision } from '../shared/poolPrecision.js'

export const atlas = {
  breadcrumb: [{ label: 'Domů', href: '/' }, { label: 'Atlas' }],

  intro: {
    eyebrow: 'RIPTIDE · ATLAS',
    headline: 'Atlas — plavecký bazén pro každý den.',
    text: 'Standardní hloubka 129 cm, šířka 235 cm a patentované 3" turbo swim jety. Řada Atlas je vstupní branou do světa Riptide swim spa — plný plavecký zážitek bez kompromisů na kvalitě.',
    note: 'Obě velikosti jsou dostupné ve třech úrovních výbavy — Pro Premium, Pro Luxury a Hydro.',
  },

  models: [
    {
      name: 'Atlas 4.4',
      tagline: 'Kompaktní 443 cm dlouhý bazén pro menší zahrady.',
      price: 489900,
      currency: 'Kč',
      image: '/assets/photos/action-swimmer-underwater.jpg',
      imageAlt: 'Riptide Atlas 4.4',
      href: '/atlas/atlas-4-4/',
    },
    {
      name: 'Atlas 6.0',
      tagline: 'Prostorných 591,5 cm pro celoroční trénink i rodinu.',
      price: 559900,
      currency: 'Kč',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Atlas 6.0',
      href: '/atlas/atlas-6-0/',
    },
  ],

  jetPrecision,
  savings,
  showroom,

  finalCta: {
    headline: 'Nejste si jistí velikostí?',
    text: 'Poradíme s výběrem mezi Atlas 4.4 a 6.0 podle velikosti zahrady i vašich plaveckých cílů — nebo doporučíme hlubší řadu Atlantis.',
    primaryCta: { label: 'Nezávazná poptávka', inquiry: true },
    secondaryCta: { label: 'Prohlédnout Atlantis', href: '/atlantis/' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
