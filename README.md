# Riptide Swim Spa

Prezentační web značky **Riptide** — exkluzivně v ČR přes [SwimSpa.cz](https://vojtano98.github.io/Swimspa-web/).

Statický vícestránkový web (Vite + vanilla JS, žádný framework), stejná architektura jako sesterský projekt `Swimspa-web`. Nasazuje se automaticky na GitHub Pages přes GitHub Actions.

## Obsah a zdroje dat

Veškerá produktová data (rozměry, objemy, výkony čerpadel, výbava jednotlivých provedení Pro Premium / Pro Luxury / Hydro) jsou přepsána přímo z oficiálních katalogů výrobce (Oasis Spas / Crystal Island, 2026) — žádné parametry nejsou vymyšlené.

**Výjimka: ceny jsou orientační placeholdery** (dle zadání „ceny si zatím vymysli, budeme ladit postupně") a je potřeba je před spuštěním do provozu nahradit reálným ceníkem. Ceny se nastavují v `src/data/models/*.js` (pole `price` u modelu a u každé varianty).

Produktové fotografie jsou reálné snímky extrahované z dodaných PDF katalogů (`public/assets/photos/`), logo Riptide bylo dodáno klientem (bílá verze), tmavá verze byla dogenerována přebarvením stejné vektorové kresby (`public/assets/brand/`).

## Struktura

```
src/
  data/
    series/        4 řady (Atlas, Atlantis, Aqua Life, Easy Life) — hub stránky
    models/         18 jednotlivých modelů — detail stránky
    shared/         sdílený obsah (showroom, úspora energie, technologie, spec. řádky)
  components/       znovupoužitelné UI komponenty
  <série>/<model>/  jedna složka = jedna stránka (index.html + main.js)
```

Nové stránky (série/modely) lze vygenerovat úpravou seznamu ve `scripts/scaffold-pages.mjs` a jeho opětovným spuštěním (`node scripts/scaffold-pages.mjs`) — vytvoří jen `index.html` + `main.js`, data je potřeba doplnit ručně do `src/data/`.

## Vývoj

```bash
npm install
npm run dev        # lokální vývojový server
npm run build       # produkční build do dist/
npm run build:ghpages   # build s base path pro GitHub Pages
```

## Nasazení

Push do `main` spustí `.github/workflows/deploy.yml`, který postaví web a nahraje ho na GitHub Pages.
