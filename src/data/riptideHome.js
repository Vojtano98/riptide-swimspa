import { savings } from './shared/savings.js'
import { showroom } from './shared/showroom.js'

export const home = {
  hero: {
    eyebrow: 'RIPTIDE SWIM SPA',
    title: 'Plavání bez konce. Na pár metrech.',
    tagline: 'Swim spa je bazén s protiproudem — plavete na místě proti proudu vody. Místo 25metrové dráhy stačí 4 až 8 metrů zahrady.',
    image: '/assets/photos/hero-aerial-swimmer.jpg',
    imageAlt: 'Riptide swim spa — pohled shora na plavce v zahradním bazénu',
    primaryCta: { label: 'Najít svůj model', href: '#pruvodce' },
    secondaryCta: { label: 'Prohlédnout řady', href: '#kategorie' },
  },

  // "What is a swim spa" — the first thing a newcomer needs before any technology talk.
  explainer: {
    eyebrow: 'CO JE SWIM SPA',
    headline: 'Bazén, ve kterém nikdy nedoplavete na konec.',
    text: 'Plavecké trysky vytvářejí proud a vy proti němu plavete na místě — jako na běžeckém pásu, jen ve vodě. Vana je krátká a dobře izolovaná, takže ji vyhřejete a zakryjete jako vířivku.',
    image: '/assets/photos/swim-spa-cutaway.jpg',
    imageAlt: 'Půdorys swim spa Riptide — vlevo hydromasážní zóna, vpravo plavecká dráha',
    zones: [
      { label: 'Hydromasážní zóna', note: 'sezení a lehátko s tryskami — u řad Aqua Life a Easy Life' },
      { label: 'Plavecká dráha', note: 'plavete na místě proti proudu z plaveckých trysek' },
    ],
    points: [
      { title: 'Plavete na místě', text: 'Proud z plaveckých trysek nahrazuje délku bazénu. Žádné otáčky u stěny.' },
      { title: 'Vejde se na zahradu', text: 'Podle modelu měří 3,9 až 8 metrů na délku a 2,2 až 2,35 metru na šířku.' },
      { title: 'Plavání i relax', text: 'Řady Aqua Life a Easy Life mají navíc hydromasážní sezení. Modely Duo ho oddělují do vlastní zóny s teplejší vodou.' },
    ],
  },

  categoriesIntro: {
    eyebrow: 'ŘADY RIPTIDE',
    headline: 'Čtyři řady. Dvě otázky.',
    text: 'Chcete jen plavat, nebo i relaxovat v hydromasáži? A stačí vám standardní hloubka, nebo chcete hlubší vodu? Odpovědi vás dovedou k jedné ze čtyř řad.',
  },

  categories: [
    {
      slug: 'atlas',
      eyebrow: 'JEN PLAVÁNÍ · STANDARDNÍ HLOUBKA',
      title: 'Atlas',
      text: 'Plavecký bazén bez masážního sezení — celá vana patří plavání. Vana vysoká 129 cm.',
      cta: 'Prohlédnout Atlas',
      href: '/atlas/',
      image: '/assets/photos/action-swimmer-underwater.jpg',
      imageAlt: 'Riptide Atlas',
    },
    {
      slug: 'atlantis',
      eyebrow: 'JEN PLAVÁNÍ · EXTRA HLOUBKA',
      title: 'Atlantis',
      text: 'Plavecký bazén s hlubší vodou pro náročnější trénink. Vana vysoká 154 cm, hloubka vody přes 140 cm.',
      cta: 'Prohlédnout Atlantis',
      href: '/atlantis/',
      image: '/assets/photos/hero-aerial-swimmer.jpg',
      imageAlt: 'Riptide Atlantis',
    },
    {
      slug: 'aqua-life',
      eyebrow: 'PLAVÁNÍ + HYDROMASÁŽ · STANDARDNÍ HLOUBKA',
      title: 'Aqua Life',
      text: 'Plavání i hydromasáž v jedné vaně — od kompaktní 4.0 po dvouzónovou 6.0 Duo.',
      cta: 'Prohlédnout Aqua Life',
      href: '/aqua-life/',
      image: '/assets/photos/lifestyle-poolside-friends.jpg',
      imageAlt: 'Riptide Aqua Life',
    },
    {
      slug: 'easy-life',
      eyebrow: 'PLAVÁNÍ + HYDROMASÁŽ · EXTRA HLOUBKA',
      title: 'Easy Life',
      text: 'Plavání i hydromasáž s hlubší vodou. Nejširší výběr velikostí — až po vlajkovou 8.0 Duo.',
      cta: 'Prohlédnout Easy Life',
      href: '/easy-life/',
      image: '/assets/photos/product-duo-terrace.jpg',
      imageAlt: 'Riptide Easy Life',
    },
  ],

  jetMoment: {
    eyebrow: 'HYDROMASÁŽ · ŘADY AQUA LIFE A EASY LIFE',
    claim: 'Plavání i masáž. V jedné vaně.',
    text: 'Na jednom konci plavecký proud, na druhém hydromasážní sezení s lehátkem. Teplá voda a cílené trysky uvolní svaly po plavání i po dni v práci.',
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
      text: 'Plavejte ve <em>29 °C</em>. Relaxujte ve <em>37 °C</em>. {pause} Ve stejnou chvíli.',
    },
    afterAdvantages: {
      tone: 'dark',
      eyebrow: 'HLOUBKA',
      text: 'Standardní hloubka, nebo <em>extra</em>. {br} {pause} Voda hluboká <em>přes 140 cm</em>.',
    },
  },

  why: {
    eyebrow: 'TECHNOLOGIE RIPTIDE',
    headline: 'Proč se v Riptide plave jinak.',
    statements: [
      {
        layout: 'image-left',
        image: '/assets/photos/detail-water-step.jpg',
        eyebrow: 'PATENTOVANÉ PLAVECKÉ TRYSKY',
        claim: 'Silný, ale hladký proud — bez turbulencí.',
        text: 'Běžné trysky vodu jen vystřelí a proud se láme. Trysky Riptide ji rozprostřou do šířky, takže plavete v rovnoměrném proudu, který míří na ramena a hrudník.',
      },
      {
        layout: 'image-right',
        image: '/assets/photos/lifestyle-winter-spa.jpg',
        eyebrow: 'PĚTIVRSTVÁ IZOLACE PLATINUM LOCK',
        claim: 'Teplo zůstává ve vodě — celý rok.',
        text: 'Uzamykatelný termokryt, celoplošná pěnová izolace a třívrstvé bednění drží teplo tam, kam patří. I v zimě.',
      },
      {
        layout: 'image-left',
        image: '/assets/photos/spatech-app.jpg',
        eyebrow: 'OVLÁDÁNÍ SPATECH',
        claim: 'Dotykový panel i aplikace — vše pod kontrolou.',
        text: 'Teplotu, proud i filtraci nastavíte na panelu nebo z telefonu přes Wi-Fi a Bluetooth. 6 režimů tepelného čerpadla, 4 přednastavené profily a 5 let záruky na řídicí systém.',
      },
    ],
  },

  trust: {
    eyebrow: 'PROČ DŮVĚŘOVAT RIPTIDE',
    headline: 'Za Riptide stojí jeden z největších výrobních závodů na světě.',
    text: 'Riptide vyrábí společnost Oasis Spas ve vlastním závodě Crystal Island. V Česku značku výhradně zastupuje SwimSpa.cz se showroomem v Praze.',
    stats: [
      { value: '150 000 m²', label: 'výrobní závod Crystal Island' },
      { value: '300 000+', label: 'vyrobených spa a swim spa ročně' },
      { value: '46 zemí', label: 'kam se značka Oasis/Riptide dodává' },
    ],
  },

  savings,
  showroom,

  finalCta: {
    headline: 'Pojďme najít vaše Riptide swim spa.',
    text: 'Poradíme s výběrem řady, velikosti i výbavy — podle zahrady, rozpočtu a toho, jestli chcete hlavně plavat, relaxovat, nebo obojí.',
    primaryCta: { label: 'Poptat cenu', inquiry: true },
    secondaryCta: { label: 'Zavolat +420 777 605 789', href: 'tel:+420777605789' },
    note: 'Odpovídáme do 24 hodin. Nezávazná konzultace zdarma.',
  },
}
