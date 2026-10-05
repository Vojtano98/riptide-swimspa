import { savings } from '../shared/savings.js'
import { showroom } from '../shared/showroom.js'
import { hydrotherapy } from '../shared/hydrotherapy.js'
import { accessories } from '../shared/accessories.js'
import { jetPrecision } from '../shared/jetPrecision.js'

export const easyLife = {
  breadcrumb: [{ label: 'Domů', href: '/' }, { label: 'Easy Life' }],

  intro: {
    eyebrow: 'RIPTIDE · EASY LIFE',
    headline: 'Easy Life — plavání i hydromasáž s extra hloubkou.',
    text: 'Plavecká dráha, masážní sezení a hlubší voda: vana vysoká 154 cm ve všech osmi velikostech — od kompaktní 4.4 po nejdelší swim spa v nabídce Riptide, Easy Life 8.0. Dostupné jako jednozónové i dvouzónové (Duo) provedení pro plavání a relaxaci současně.',
    note: 'Všechny modely se dodávají ve dvou výbavách: Pro Luxury a Pro Premium. Na přání je lze částečně zapustit do terénu.',
  },

  models: [
    {
      name: 'Easy Life 4.4',
      tagline: 'Nejkompaktnější Easy Life s extra hloubkou.',
      price: 499900,
      currency: 'Kč',
      image: '/assets/photos/detail-water-step.jpg',
      imageAlt: 'Riptide Easy Life 4.4',
      href: '/easy-life/easy-life-4-4/',
    },
    {
      name: 'Easy Life 5.5',
      tagline: 'Střední velikost pro plavání i rodinu.',
      price: 539900,
      currency: 'Kč',
      image: '/assets/photos/lifestyle-poolside-friends.jpg',
      imageAlt: 'Riptide Easy Life 5.5',
      href: '/easy-life/easy-life-5-5/',
    },
    {
      name: 'Easy Life 6.0',
      tagline: 'Největší jednozónový model s extra hloubkou.',
      price: 579900,
      currency: 'Kč',
      image: '/assets/photos/action-swimmer-underwater.jpg',
      imageAlt: 'Riptide Easy Life 6.0',
      href: '/easy-life/easy-life-6-0/',
    },
    {
      name: 'Easy Life 6.0 Duo',
      tagline: 'Dvě nezávislé zóny — plavání i relax zvlášť.',
      price: 649900,
      currency: 'Kč',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Easy Life 6.0 Duo',
      href: '/easy-life/easy-life-6-0-duo/',
    },
    {
      name: 'Easy Life 7.0',
      tagline: 'Velkorysá plavecká dráha pro naplno rozvinutý styl.',
      price: 619900,
      currency: 'Kč',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Easy Life 7.0',
      href: '/easy-life/easy-life-7-0/',
    },
    {
      name: 'Easy Life 7.0 Duo',
      tagline: 'Dlouhá plavecká dráha + samostatná relaxační zóna.',
      price: 699900,
      currency: 'Kč',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Easy Life 7.0 Duo',
      href: '/easy-life/easy-life-7-0-duo/',
    },
    {
      name: 'Easy Life 8.0',
      tagline: 'Nejdelší jednozónové swim spa v nabídce.',
      price: 669900,
      currency: 'Kč',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Easy Life 8.0',
      href: '/easy-life/easy-life-8-0/',
    },
    {
      name: 'Easy Life 8.0 Duo',
      tagline: 'Vlajková loď Riptide — plavání i relaxace pro celou rodinu.',
      price: 749900,
      currency: 'Kč',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Easy Life 8.0 Duo',
      href: '/easy-life/easy-life-8-0-duo/',
    },
  ],

  hydrotherapy,
  jetPrecision,
  accessories,
  savings,
  showroom,

  finalCta: {
    headline: 'Osm velikostí, jedna správná volba.',
    text: 'Poradíme s výběrem délky, provedení i výbavy podle velikosti zahrady, rozpočtu a toho, jak budete swim spa využívat.',
    primaryCta: { label: 'Poptat cenu', inquiry: true },
    secondaryCta: { label: 'Prohlédnout Aqua Life', href: '/aqua-life/' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
