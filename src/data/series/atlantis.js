import { savings } from '../shared/savings.js'
import { showroom } from '../shared/showroom.js'
import { swimJetPrecision as jetPrecision } from '../shared/poolPrecision.js'

export const atlantis = {
  breadcrumb: [{ label: 'Domů', href: '/' }, { label: 'Atlantis' }],

  intro: {
    eyebrow: 'RIPTIDE · ATLANTIS',
    headline: 'Atlantis — extra hloubka pro seriózní plavce.',
    text: 'Čistě plavecký bazén s hlubší vodou: vana vysoká 154 cm, hloubka vody přes 140 cm a nejtlustší skořepina na trhu. Řada Atlantis nabízí realističtější a náročnější plavecký zážitek než standardní hloubka — ideální pro vyšší postavy a intenzivní trénink.',
    note: 'Tři velikosti (4.4, 6.0 a 7.0), dvě výbavy: Pro Luxury a Pro Premium.',
  },

  models: [
    {
      name: 'Atlantis 4.4',
      tagline: 'Nejkompaktnější extra hluboký bazén na malý pozemek.',
      price: 549900,
      currency: 'Kč',
      image: '/assets/photos/lifestyle-poolside-friends.jpg',
      imageAlt: 'Riptide Atlantis 4.4',
      href: '/atlantis/atlantis-4-4/',
    },
    {
      name: 'Atlantis 6.0',
      tagline: 'Vyvážená velikost pro náročnější trénink.',
      price: 629900,
      currency: 'Kč',
      image: '/assets/photos/detail-water-step.jpg',
      imageAlt: 'Riptide Atlantis 6.0',
      href: '/atlantis/atlantis-6-0/',
    },
    {
      name: 'Atlantis 7.0',
      tagline: 'Vlajková loď řady — nejdelší dráha, nejtlustší skořepina.',
      price: 699900,
      currency: 'Kč',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Atlantis 7.0',
      href: '/atlantis/atlantis-7-0/',
    },
  ],

  jetPrecision,
  savings,
  showroom,

  finalCta: {
    headline: 'Nejste si jistí, zda chcete standardní, nebo extra hloubku?',
    text: 'Standardní hloubka (řada Atlas, vana vysoká 129 cm) znamená méně vody k ohřevu. Extra hloubka (Atlantis, vana 154 cm) dá realističtější pocit plavání. Poradíme podle vašich cílů.',
    primaryCta: { label: 'Poptat cenu', inquiry: true },
    secondaryCta: { label: 'Prohlédnout Atlas', href: '/atlas/' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
