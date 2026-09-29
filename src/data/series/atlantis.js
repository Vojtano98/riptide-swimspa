import { savings } from '../shared/savings.js'
import { showroom } from '../shared/showroom.js'

export const atlantis = {
  breadcrumb: [{ label: 'Domů', href: '/' }, { label: 'Atlantis' }],

  intro: {
    eyebrow: 'RIPTIDE · ATLANTIS',
    headline: 'Atlantis — extra hloubka pro seriózní plavce.',
    text: 'Extra hloubka 154 cm a nejtlustší skořepina na trhu. Řada Atlantis nabízí realističtější a náročnější plavecký zážitek než standardní hloubka — ideální pro vyšší postavy a intenzivní trénink.',
    note: 'K dispozici ve třech velikostech (4.4 / 6.0 / 7.0) a dvou úrovních výbavy — Pro Premium a Pro Luxury.',
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

  savings,
  showroom,

  finalCta: {
    headline: 'Nejste si jistí, zda chcete standardní, nebo extra hloubku?',
    text: 'Standardní hloubka 129 cm (řada Atlas) je levnější na provoz, extra hloubka 154 cm (Atlantis) dá realističtější pocit plavání. Poradíme podle vašich cílů.',
    primaryCta: { label: 'Nezávazná poptávka', inquiry: true },
    secondaryCta: { label: 'Prohlédnout Atlas', href: '/atlas/' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
