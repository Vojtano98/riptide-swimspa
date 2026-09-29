import { savings } from '../shared/savings.js'
import { showroom } from '../shared/showroom.js'
import { hydrotherapy } from '../shared/hydrotherapy.js'
import { accessories } from '../shared/accessories.js'

export const aquaLife = {
  breadcrumb: [{ label: 'Domů', href: '/' }, { label: 'Aqua Life' }],

  intro: {
    eyebrow: 'RIPTIDE · AQUA LIFE',
    headline: 'Aqua Life — swim spa pro plavání i hydromasáž.',
    text: 'Standardní hloubka 129 cm doplněná o hydromasážní posezení s lehátkem — Aqua Life spojuje plavecký trénink s každodenní relaxací. K dispozici od kompaktní 4.0 po dvouzónovou 6.0 Duo se dvěma nezávislými teplotami.',
    note: 'Modely 4.4 až 6.0 Duo nabízí až tři úrovně výbavy — Pro Premium, Pro Luxury a Hydro. Modely 4.4 až 6.0 Duo lze na přání provést i jako semi-inground (částečně zapuštěné do terénu) — rychlejší a levnější instalace než klasická zapuštěná bazénová vana.',
  },

  models: [
    {
      name: 'Aqua Life 4.0',
      tagline: 'Nejmenší a nejdostupnější model — 6 sedacích míst.',
      price: 419900,
      currency: 'Kč',
      image: '/assets/photos/lifestyle-collage-family.jpg',
      imageAlt: 'Riptide Aqua Life 4.0',
      href: '/aqua-life/aqua-life-4-0/',
    },
    {
      name: 'Aqua Life 4.4',
      tagline: '3 sedy + lehátko a plný plavecký proud.',
      price: 429900,
      currency: 'Kč',
      image: '/assets/photos/lifestyle-poolside-friends.jpg',
      imageAlt: 'Riptide Aqua Life 4.4',
      href: '/aqua-life/aqua-life-4-4/',
    },
    {
      name: 'Aqua Life 5.5',
      tagline: 'Střední velikost, vyvážený poměr plavání a masáže.',
      price: 469900,
      currency: 'Kč',
      image: '/assets/photos/action-swimmer-underwater.jpg',
      imageAlt: 'Riptide Aqua Life 5.5',
      href: '/aqua-life/aqua-life-5-5/',
    },
    {
      name: 'Aqua Life 6.0',
      tagline: 'Největší jednozónový model v řadě.',
      price: 499900,
      currency: 'Kč',
      image: '/assets/photos/lifestyle-winter-spa.jpg',
      imageAlt: 'Riptide Aqua Life 6.0',
      href: '/aqua-life/aqua-life-6-0/',
    },
    {
      name: 'Aqua Life 6.0 Duo',
      tagline: 'Dvě nezávislé zóny — plavání 29 °C, relax 37 °C.',
      price: 579900,
      currency: 'Kč',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Aqua Life 6.0 Duo',
      href: '/aqua-life/aqua-life-6-0-duo/',
    },
  ],

  hydrotherapy,
  accessories,
  savings,
  showroom,

  finalCta: {
    headline: 'Plavání, relaxace, nebo obojí zároveň?',
    text: 'Jednozónové modely Aqua Life kombinují plavání a hydromasáž v jedné vodě, Duo verze je rozděluje do dvou nezávislých teplot. Poradíme, co bude sedět vaší rodině.',
    primaryCta: { label: 'Nezávazná poptávka', inquiry: true },
    secondaryCta: { label: 'Prohlédnout Easy Life', href: '/easy-life/' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
