import { modelBriefs } from './modelBriefs.js'
import { savings } from './savings.js'
import { showroom } from './showroom.js'
import { home } from '../riptideHome.js'
import { formatNumber } from '../../utils/format.js'

// Every answer is built from facts already on the site (spec sheets, the official SwimSpa.cz
// product copy, savings and showroom data) — nothing here is new information. Topics the
// site has no source for (delivery, installation, financing) are deliberately absent.
const briefs = Object.values(modelBriefs)
const range = (key) => [Math.min(...briefs.map((b) => b[key])), Math.max(...briefs.map((b) => b[key]))]
const [lenMin, lenMax] = range('length')
const [widMin, widMax] = range('width')
const [hMin, hMax] = range('height')
const [volMin, volMax] = range('volume')

const cat = Object.fromEntries(home.categories.map((c) => [c.title, c.text]))
const contact = showroom.contact

export const faq = [
  {
    q: 'Kolik místa swim spa potřebuje?',
    a: `Rozměry se liší podle modelu: délka ${formatNumber(Math.round(lenMin))}–${formatNumber(Math.round(lenMax))} cm, šířka ${widMin}–${widMax} cm, výška ${hMin}–${hMax} cm a objem vody ${formatNumber(volMin)}–${formatNumber(volMax)} l. Přesné rozměry najdete u každého modelu v parametrech a v plánku rozměrů.`,
  },
  {
    q: 'Čím se liší řady Atlas, Atlantis, Aqua Life a Easy Life?',
    a: `<strong>Atlas:</strong> ${cat['Atlas']} <strong>Atlantis:</strong> ${cat['Atlantis']} <strong>Aqua Life:</strong> ${cat['Aqua Life']} <strong>Easy Life:</strong> ${cat['Easy Life']}`,
  },
  {
    q: 'Jakou hloubku zvolit?',
    a: 'Řady se standardní hloubkou (Atlas, Aqua Life) mají vanu vysokou 129 cm, Aqua Life 4.0 má 119 cm — snazší nástup a méně vody k ohřevu. Řady s extra hloubkou (Atlantis, Easy Life) mají vanu vysokou 154 cm a hloubku vody přes 140 cm — víc prostoru pro záběr a pro vyšší plavce.',
  },
  {
    q: 'Co znamená Duo?',
    a: 'Dvouzónové (Duo) modely mají plaveckou a masážní část oddělené, každou s vlastní teplotou — můžete plavat ve 29 °C a zároveň relaxovat ve 37 °C.',
  },
  {
    q: 'Jak je swim spa izolované a kolik spotřebuje?',
    a: `${savings.text}`,
  },
  {
    q: 'Jaké napájení potřebuje?',
    a: 'Podle modelu a výbavy 25 A, 32 A nebo 40 A. Modely Duo mají samostatné napájení spa zóny (20 A) a plavecké zóny (25–40 A). Hodnotu najdete u každé výbavy v parametrech modelu.',
  },
  {
    q: 'Dá se swim spa používat celoročně?',
    a: 'Ano. Atlas a Atlantis jsou v oficiálním popisu vedeny jako celoroční plavecké bazény a pětistupňová izolace Platinum Lock, společná všem modelům, drží teplo ve vodě celý rok.',
  },
  {
    q: 'Jak se swim spa ovládá?',
    a: 'Dotykovým panelem SpaTech nebo aplikací přes Wi-Fi/Bluetooth. K dispozici je 6 režimů tepelného čerpadla a 4 přednastavené profily; na řídicí systém je 5 let záruky.',
  },
  {
    q: 'Proč je u některých výbav cena „na dotaz“?',
    a: 'E-shop SwimSpa.cz zveřejňuje u každého modelu cenu jedné úrovně výbavy. Cenu ostatních úrovní vám pošleme na nezávaznou poptávku, obvykle do 24 hodin.',
  },
  {
    q: 'Mohu si swim spa prohlédnout naživo?',
    a: `Ano, po předchozí domluvě: ${contact.address.join(', ')}. Poradce vám předvede plavecký proud i hydromasážní zóny. Domluvte se na ${contact.phone} nebo přes poptávku.`,
  },
]
