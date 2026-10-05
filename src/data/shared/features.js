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
  control: photo('spatech-panel.jpg'),
  filtration: photo('shell-jets-detail.jpg'),
  lighting: photo('shop-lighting.webp'), // official SwimSpa.cz Dream Time Lighting photo
}

// featureGrid.js layout: 1 hero card + 2 secondary + 3 tertiary.
export const featureBenefits = {
  headline: 'Technologie, na kterých záleží.',
  hero: {
    label: 'Pětivrstvá izolace Platinum Lock',
    text: 'Uzamykatelný kryt z vysokohustotní pěny, celoplošná pěnová izolace, třívrstvá tepelná bariéra bednění a pryžová izolační vata s hliníkovou fólií drží teplo ve vodě po celý rok.',
    image: 'insulation',
  },
  secondary: [
    {
      label: 'Patentované plavecké trysky',
      text: 'Voštinová konstrukce trysek a čerpadla s vysokým průtokem dávají silný, ale hladký proud bez turbulencí, který míří na ramena a hrudník.',
      image: 'swimJets',
    },
    {
      label: '10 stupňů plaveckého proudu',
      text: 'Výbava Pro Premium řídí plavecká čerpadla frekvenčním měničem: místo pouhého zapnuto/vypnuto máte 10 úrovní — od klidného rodinného plavání po závodní tempo.',
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
