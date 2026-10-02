import { savings } from './shared/savings.js'
import { showroom } from './shared/showroom.js'

export const home = {
  hero: {
    eyebrow: 'FOR FITNESS, RELAXATION AND FUN',
    title: 'Plavání, relaxace, zábava.',
    tagline: 'Riptide swim spa — exkluzivně v ČR přes SwimSpa.cz.',
    image: '/assets/photos/hero-aerial-swimmer.jpg',
    imageAlt: 'Riptide swim spa — pohled shora na plavce v zahradním bazénu',
  },

  categoriesIntro: {
    eyebrow: 'ŘADY RIPTIDE',
    headline: 'Čtyři řady. Jedno plavecké jádro.',
    text: 'Standardní i extra hloubka, čistě plavecké bazény i swim spa s hydromasáží — vyberte řadu podle toho, jak budete plavat, relaxovat, nebo obojí.',
  },

  categories: [
    {
      eyebrow: 'STANDARDNÍ HLOUBKA · POOL',
      title: 'Atlas',
      text: 'Vstupní řada plaveckých bazénů se standardní hloubkou 129 cm a patentovanými swim jety.',
      cta: 'Prohlédnout Atlas',
      href: '/atlas/',
      image: '/assets/photos/action-swimmer-underwater.jpg',
      imageAlt: 'Riptide Atlas',
    },
    {
      eyebrow: 'EXTRA HLOUBKA · POOL',
      title: 'Atlantis',
      text: 'Extra hloubka 154 cm a nejtlustší skořepina na trhu pro seriózní plavecký trénink.',
      cta: 'Prohlédnout Atlantis',
      href: '/atlantis/',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Atlantis',
    },
    {
      eyebrow: 'STANDARDNÍ HLOUBKA · SWIM SPA',
      title: 'Aqua Life',
      text: 'Plavání i hydromasáž v jednom — od kompaktní 4.0 po dvouzónovou 6.0 Duo.',
      cta: 'Prohlédnout Aqua Life',
      href: '/aqua-life/',
      image: '/assets/photos/lifestyle-poolside-friends.jpg',
      imageAlt: 'Riptide Aqua Life',
    },
    {
      eyebrow: 'EXTRA HLOUBKA · SWIM SPA',
      title: 'Easy Life',
      text: 'Nejširší nabídka velikostí — osm modelů od 4.4 po vlajkovou 8.0 Duo.',
      cta: 'Prohlédnout Easy Life',
      href: '/easy-life/',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Easy Life',
    },
  ],

  jetMoment: {
    eyebrow: 'HYDROMASÁŽNÍ ZÓNA',
    claim: 'Stovky litrů vody v pohybu. Klid pro tělo i mysl.',
    text: 'Teplá voda a cílené masážní trysky uvolňují svaly, zmírňují stres a zlepšují krevní oběh — přesně to nabízí hydromasážní zóny u řad Aqua Life a Easy Life.',
    posterAlt: 'Hydromasážní trysky Riptide v provozu — voda vířící v bazénku swim spa',
    frames: Array.from(
      { length: 120 },
      (_, i) => `/assets/video/jet-frames/frame-${String(i + 1).padStart(3, '0')}.webp`
    ),
  },

  quiet: {
    afterCategories: {
      tone: 'white',
      eyebrow: 'MODELY DUO',
      text: 'Plavejte ve <em>29 °C</em>. Relaxujte ve <em>37 °C</em>. Ve stejnou chvíli.',
    },
    afterAdvantages: {
      tone: 'dark',
      eyebrow: 'HLOUBKA',
      text: '<em>129 cm</em> nebo <em>154 cm</em>. Vyberte hloubku, která sedí vašemu plavání.',
    },
  },

  advantages: {
    eyebrow: 'PROČ RIPTIDE',
    headline: 'Jedno plavecké jádro. Čtyři řady na míru.',
    text: 'Všechny řady Riptide sdílí stejnou patentovanou plaveckou technologii a 5stupňovou izolaci — liší se hloubkou, rozměry a tím, jestli chcete čistě plavecký bazén, nebo i hydromasážní posezení.',
    columns: [
      {
        image: '/assets/photos/action-swimmer-underwater.jpg',
        imageAlt: 'Plavání proti proudu Riptide',
        eyebrow: 'PRO SPORT',
        title: 'Atlas & Atlantis',
        text: 'Čisté plavecké bazény bez hydromasážního posezení — maximum prostoru pro plavecký styl, standardní i extra hloubka.',
        points: ['129 cm nebo 154 cm hloubka', 'Až 4× 3" turbo swim jety', 'Nejtlustší skořepina na trhu (Atlantis)'],
        href: '/atlas/',
        cta: 'Prohlédnout plavecké bazény',
      },
      {
        image: '/assets/photos/lifestyle-collage-family.jpg',
        imageAlt: 'Rodinná zábava v Riptide swim spa',
        eyebrow: 'PRO RODINU',
        title: 'Aqua Life & Easy Life',
        text: 'Swim spa s hydromasážním posezením a lehátkem — plavání i relaxace ve stejné vodě, u Duo verzí ve dvou zónách zvlášť.',
        points: ['Až 45 hydromasážních trysek', 'Duo verze: 29 °C a 37 °C zároveň', '6 až 8 velikostí v každé řadě'],
        href: '/easy-life/',
        cta: 'Prohlédnout swim spa',
      },
    ],
  },

  why: {
    eyebrow: 'TECHNOLOGIE RIPTIDE',
    headline: 'Co dělá Riptide plavecké jádro jiným.',
    statements: [
      {
        layout: 'image-left',
        image: '/assets/photos/action-swimmer-underwater.jpg',
        eyebrow: 'PATENTOVANÉ 3" SWIM JETY',
        claim: 'Silný, ale hladký plavecký proud — bez turbulencí.',
        text: 'Voštinová konstrukce trysek rozprostírá proud rovnoměrně, na rozdíl od běžných přímo-vstřikovaných trysek na trhu. Power-flow čerpadla cílí proud přesně na ramena a hrudník.',
      },
      {
        layout: 'image-right',
        image: '/assets/photos/lifestyle-winter-spa.jpg',
        eyebrow: '5STUPŇOVÁ IZOLACE PLATINUM LOCK',
        claim: 'Až o 26 % nižší náklady na ohřev než standard CEC.',
        text: 'Uzamykatelný kryt z vysokohustotní pěny, celoplošná pěnová izolace a třívrstvá tepelná bariéra drží teplo tam, kam patří — ve vodě, celý rok.',
      },
      {
        layout: 'image-left',
        image: '/assets/photos/spatech-app.jpg',
        eyebrow: 'OVLÁDÁNÍ SPATECH',
        claim: 'Dotykový panel i aplikace — vše pod kontrolou.',
        text: '6 režimů tepelného čerpadla, 4 přednastavené profily a Wi-Fi/Bluetooth připojení. Devatenáct let vývoje, 5 let záruky na řídicí systém.',
      },
    ],
  },

  trust: {
    eyebrow: 'PROČ DŮVĚŘOVAT RIPTIDE',
    headline: 'Výroba a servisní zázemí, na které se dá spolehnout.',
    text: 'Riptide vyrábí Oasis Spas ve vlastním výrobním závodě Crystal Island — jedné z největších výrobních hal na spa a swim spa na světě — s vybudovanou servisní sítí napříč Evropou i Austrálií.',
    stats: [
      { value: '150 000 m²', label: 'výrobní závod Crystal Island' },
      { value: '300 000+', label: 'vyrobených spa a swim spa ročně' },
      { value: '46 zemí', label: 'kam se značka Oasis/Riptide dodává' },
    ],
    image: {
      src: '/assets/photos/trust-factory.jpg',
      webp: {
        '800': '/assets/photos/trust-factory-800.webp',
        '1200': '/assets/photos/trust-factory-1200.webp',
        '1800': '/assets/photos/trust-factory-1800.webp',
      },
      alt: 'Showroom a distribuční zázemí swim spa Riptide',
    },
  },

  savings,
  showroom,

  finalCta: {
    headline: 'Pojďme najít vaše Riptide swim spa.',
    text: 'Poradíme s výběrem řady, velikosti i výbavy — podle zahrady, rozpočtu a toho, jestli chcete hlavně plavat, relaxovat, nebo obojí.',
    primaryCta: { label: 'Nezávazná poptávka', inquiry: true },
    secondaryCta: { label: 'Domluvit prohlídku showroomu', href: '/#showroom' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
