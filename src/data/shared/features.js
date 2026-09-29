// Shared technology & feature copy used across every model page (via featureGrid.js /
// whyStatements.js). Content is paraphrased from the real Riptide / Oasis product
// catalogues (2026) — swim jets, Quickwater training system, Platinum Lock insulation,
// SpaTech control, filtration and Dream Time lighting are genuine, catalogue-sourced
// features shared across the whole product range, not invented per model.

const photo = (name) => `/assets/photos/${name}`

// images.feature map — referenced by key from benefits.hero/secondary/tertiary below.
export const featureImages = {
  swimJets: photo('action-swimmer-underwater.jpg'),
  quickwater: photo('hero-aerial-swimmer.jpg'),
  insulation: photo('lifestyle-winter-spa.jpg'),
  control: photo('product-duo-terrace.jpg'),
  filtration: photo('shell-jets-detail.jpg'),
  lighting: photo('lifestyle-collage-family.jpg'),
}

// featureGrid.js layout: 1 hero card + 2 secondary + 3 tertiary.
export const featureBenefits = {
  headline: 'Technologie, na kterých záleží.',
  hero: {
    label: '5stupňová izolace Platinum Lock + Full Foaming',
    text: 'Uzamykatelný kryt z vysokohustotní pěny, celoplošná pěnová izolace, třívrstvá tepelná bariéra bednění a pryžová izolační vata s hliníkovou fólií drží teplo ve vodě — až o 26 % nižší náklady na ohřev než standard CEC.',
    image: 'insulation',
  },
  secondary: [
    {
      label: 'Patentované 3" swim jety',
      text: 'Voštinová konstrukce trysek a power-flow čerpadla s vysokým průtokem dávají silný, ale hladký proud bez turbulencí, cílený přesně na ramena a hrudník.',
      image: 'swimJets',
    },
    {
      label: 'Quickwater 10-Speed systém',
      text: 'Desetirychlostní plavecké čerpadlo a inteligentní ovládání proudu — každý si najde svoje tempo, od rodinného plavání po profesionální trénink.',
      image: 'quickwater',
    },
  ],
  tertiary: [
    {
      label: 'Ovládání SpaTech',
      text: 'Dotykový panel i aplikace, 6 režimů tepelného čerpadla a Wi-Fi/Bluetooth připojení. 5 let záruky na řídicí systém.',
      image: 'control',
    },
    {
      label: 'Filtrace a ozonizace',
      text: 'Vysoce účinné modré filtry a mixovaná ozonizace drží vodu čistou a hygienickou při nižší spotřebě chemie.',
      image: 'filtration',
    },
    {
      label: 'Dream Time Lighting',
      text: 'Hladinové světlo, velké LED, světelná fontánka a podsvícené ovládání pro dokonalou večerní atmosféru.',
      image: 'lighting',
    },
  ],
}
