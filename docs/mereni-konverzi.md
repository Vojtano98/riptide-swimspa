# Měření konverzí Riptide webu — GTM, GA4 a Meta

Návod krok za krokem, jak měřit odeslané poptávky z Riptide webu ve stávajícím Google Tag
Manageru, Google Analytics 4 a Meta (Facebook) účtu SwimSpa.cz tak, aby se data **nemíchala**
s měřením e-shopu swimspa.cz.

> Názvy položek v rozhraní GTM, GA4 a Meta odpovídají stavu k říjnu 2026. Google i Meta je
> občas přejmenují — když se tlačítko jmenuje trochu jinak, hledejte stejný význam.

---

## 1. Jak to funguje

```
Riptide web ──► dataLayer ──► Google Tag Manager ──► GA4  (událost riptide_form_sent)
                                                 └─► Meta (událost RiptideFormSent)
```

Web sám nic do GA4 ani Mety neposílá. Jen při každém **úspěšně odeslaném** formuláři vloží do
datové vrstvy (`dataLayer`) událost. GTM ji zachytí a předá dál — ale jen když návštěvník
v cookie liště souhlasil (Consent Mode v2).

### Proč se data nebudou míchat

| Co | swimspa.cz (Shoptet) | Riptide web |
|---|---|---|
| Událost formuláře v GTM | `form_submit` (už existuje) | **`riptide_form_sent`** |
| Parametry | — | vše s prefixem **`riptide_`** |
| Událost v GA4 | Shoptet události | **`riptide_form_sent`** + vlastní datový stream |
| Událost v Metě | standardní (PageView, Lead…) | **`RiptideFormSent`** (vlastní událost) |

### Události, které web posílá

**`riptide_form_sent`** — po potvrzení, že poptávka opravdu odešla (ne po kliknutí na tlačítko).

```js
dataLayer.push({
  event: 'riptide_form_sent',
  riptide_form_type: 'price',            // price | showroom | question
  riptide_form_name: 'Nezávazná poptávka', // titulek formuláře, který návštěvník viděl
  riptide_model: 'Atlantis 7.0',         // na homepage a výpisech "Riptide swim spa"
  riptide_variant: 'Pro Premium',        // vybraná výbava, jinak prázdné
  riptide_page_type: 'model',            // home | produkty | rada | model
  riptide_event_id: '5fd22ead-…'         // unikátní ID (deduplikace pro Meta)
})
```

| `riptide_form_type` | Kde vzniká |
|---|---|
| `price` | „Poptat cenu" — hlavička, stránka modelu, výbavy, závěrečné výzvy |
| `showroom` | „Domluvit prohlídku" v sekci Showroom |
| `question` | „Zeptat se poradce" (FAQ) a „Zeptat se na umístění" (rozměry) |

**`riptide_consent_update`** — když návštěvník uloží volbu v cookie liště
(`riptide_consent_analytics`, `riptide_consent_marketing`: `granted` / `denied`).
Slouží jako spouštěč pro tagy, které mají naběhnout hned po udělení souhlasu.

Na každé stránce je navíc v datové vrstvě `riptide_site: 'riptide'`.

---

## 2. Rozhodnutí předem: který kontejner a který stream

### GTM — doporučuji nový kontejner ve stávajícím účtu

Kontejner swimspa.cz (`GTM-WKCH9WTJ`) obsahuje tagy postavené pro Shoptet — Google Ads,
Sklik retargeting a konverze, posluchač formuláře `#formPoptavka` a další. Kdyby se načítal
i na Riptide webu, spustily by se tam i tyto tagy a do stávajících účtů by tekla data
z cizího webu.

**Doporučení:** v **tom samém GTM účtu** vytvořit **nový kontejner** „Riptide web".
Je to stále „váš" GTM (stejný účet, stejní uživatelé), jen oddělený.

> Pokud chcete opravdu jen jeden kontejner, viz [příloha A](#příloha-a-jeden-společný-kontejner).

### GA4 — doporučuji nový datový stream ve stávající službě

Ve službě GA4 swimspa.cz (`G-FJD603M0TQ`) přidejte **druhý webový datový stream** „Riptide web".
Dostanete nové měřicí ID (`G-…`). Výhody:

- jste ve stejné službě GA4, konverze vidíte vedle e-shopu,
- návštěvy Riptide webu jdou do vlastního streamu a dají se odfiltrovat,
- událost `riptide_form_sent` se nemůže splést s žádnou událostí e-shopu.

### Meta — stejný pixel, vlastní událost

Použijte stávající pixel. V kontejneru swimspa.cz je konstanta `1707884936672556`, která
vypadá jako ID pixelu — **ověřte ho v Meta Events Manageru** (Zdroje dat → váš pixel → ID).
Riptide posílá vlastní událost `RiptideFormSent`, ze které uděláte vlastní konverzi.

---

## 3. GA4: nový datový stream a nastavení

1. **GA4 → Správce (ozubené kolo) → Shromažďování a úpravy dat → Datové streamy → Přidat stream → Web.**
2. URL webu: doména Riptide webu (dnes `vojtano98.github.io/riptide-swimspa`, později finální doména).
   Název: `Riptide web`. Rozšířené měření může zůstat zapnuté.
3. Zkopírujte **ID měření** (`G-XXXXXXXXXX`) — budete ho potřebovat v GTM.
4. **Vlastní definice** (aby šly parametry vidět v přehledech):
   **Správce → Zobrazení dat → Vlastní definice → Vytvořit vlastní dimenze**, rozsah **Událost**:

   | Název dimenze | Parametr události |
   |---|---|
   | Riptide – typ formuláře | `form_type` |
   | Riptide – model | `model` |
   | Riptide – výbava | `variant` |
   | Riptide – typ stránky | `page_type` |

5. **Klíčová událost (konverze):** **Správce → Zobrazení dat → Klíčové události → Nová klíčová
   událost** → název přesně `riptide_form_sent` → Uložit.
   (Jde to i později v **Události** přepnutím „Označit jako klíčovou událost", až se událost poprvé objeví.)

---

## 4. GTM: nový kontejner

1. **tagmanager.google.com** → účet SwimSpa → **Vytvořit kontejner** → název `Riptide web`,
   platforma **Web** → Vytvořit.
2. Zkopírujte **ID kontejneru** (`GTM-XXXXXXX`). Instalační kód **nevkládejte** — web ho
   vkládá sám (viz [krok 8](#8-zapnutí-měření-na-webu)).
3. **Správce → Nastavení kontejneru → Další nastavení → zapněte „Povolit přehled souhlasu"**
   (Enable consent overview) → Uložit. Odteď v seznamu tagů uvidíte ikonu štítu se souhlasem.

### 4.1 Proměnné

**Proměnné → Uživatelem definované proměnné → Nová → Proměnná vrstvy dat**,
verze vrstvy dat **2**. Vytvořte šest proměnných:

| Název proměnné v GTM | Název proměnné vrstvy dat |
|---|---|
| `DLV – riptide_form_type` | `riptide_form_type` |
| `DLV – riptide_form_name` | `riptide_form_name` |
| `DLV – riptide_model` | `riptide_model` |
| `DLV – riptide_variant` | `riptide_variant` |
| `DLV – riptide_page_type` | `riptide_page_type` |
| `DLV – riptide_event_id` | `riptide_event_id` |

A jednu konstantu: **Nová → Konstanta** → název `CONST – Meta Pixel ID`, hodnota = ID pixelu.

### 4.2 Spouštěče

1. **Nový → Vlastní událost**
   - Název: `CE – riptide_form_sent`
   - Název události: `riptide_form_sent`
   - Spouštět při: **Všechny vlastní události**
2. **Nový → Vlastní událost**
   - Název: `CE – riptide_consent_update`
   - Název události: `riptide_consent_update`
3. Vestavěné spouštěče `Initialization – All Pages` a `All Pages` už existují.

### 4.3 Tagy

#### Tag 1 — Google tag (GA4)

- **Nový → Konfigurace tagu → Google Analytics → Značka Google** (Google Tag)
- ID značky: `G-XXXXXXXXXX` (ID nového streamu z kroku 3)
- Spouštěč: **Initialization – All Pages**
- Souhlas: nic nepřidávejte — Google tag má vestavěné kontroly souhlasu (`analytics_storage`).
- Název: `GA4 – Google tag – Riptide`

#### Tag 2 — GA4 událost: odeslaný formulář

- **Nový → Google Analytics → Událost Google Analytics**
- ID měření: `G-XXXXXXXXXX`
- Název události: `riptide_form_sent`
- Parametry události:

  | Název parametru | Hodnota |
  |---|---|
  | `form_type` | `{{DLV – riptide_form_type}}` |
  | `form_name` | `{{DLV – riptide_form_name}}` |
  | `model` | `{{DLV – riptide_model}}` |
  | `variant` | `{{DLV – riptide_variant}}` |
  | `page_type` | `{{DLV – riptide_page_type}}` |

- Spouštěč: **CE – riptide_form_sent**
- Název: `GA4 – riptide_form_sent`

#### Tag 3 — Meta Pixel (základní kód)

- **Nový → Vlastní HTML**, vložte:

```html
<script>
if (!window.fbq) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '{{CONST – Meta Pixel ID}}');
  fbq('track', 'PageView');
}
</script>
```

- Rozšířená nastavení → Možnosti spouštění tagu: **Jednou na stránku**
- Rozšířená nastavení → **Nastavení souhlasu → Vyžadovat další souhlas pro spuštění tagu → `ad_storage`**
- Spouštěče: **All Pages** a **CE – riptide_consent_update**
  (druhý zajistí, že pixel naběhne hned, když návštěvník souhlas udělí až na stránce)
- Název: `Meta – Pixel – základ`

#### Tag 4 — Meta událost: odeslaný formulář

- **Nový → Vlastní HTML**, vložte:

```html
<script>
if (window.fbq) {
  fbq('trackCustom', 'RiptideFormSent', {
    form_type: {{DLV – riptide_form_type}},
    model: {{DLV – riptide_model}},
    variant: {{DLV – riptide_variant}},
    page_type: {{DLV – riptide_page_type}}
  }, { eventID: {{DLV – riptide_event_id}} });
}
</script>
```

- Rozšířená nastavení → **Řazení tagů → Spustit tag před tímto tagem: `Meta – Pixel – základ`**
- **Nastavení souhlasu → vyžadovat `ad_storage`**
- Spouštěč: **CE – riptide_form_sent**
- Název: `Meta – RiptideFormSent`

#### Tag 5 (volitelný) — Google Ads konverze

V kontejneru swimspa.cz je Google Ads účet `AW-788489906`. Chcete-li poptávky z Riptide webu
i v Google Ads:

1. Google Ads → Cíle → Konverze → **Nová konverzní akce → Web → ručně** → kategorie
   „Odeslání formuláře pro potenciální zákazníky", název `Riptide – poptávka`.
2. V GTM: **Nový → Google Ads → Sledování konverzí Google Ads** → ID a štítek konverze
   z nové akce → spouštěč **CE – riptide_form_sent**.
3. Přidejte i tag **Linker konverzí** se spouštěčem All Pages.

### 4.4 Ověření v režimu náhledu

1. V GTM klikněte **Náhled** a zadejte URL Riptide webu.
2. Na webu klikněte v cookie liště **Přijmout vše**.
3. V Tag Assistantu zkontrolujte:
   - v událostech `Consent` a `riptide_consent_update` se souhlas přepnul na *granted*,
   - na `Container Loaded` / `Initialization` se spustil `GA4 – Google tag – Riptide`,
   - `Meta – Pixel – základ` se spustil (po souhlasu).
4. Odešlete testovací poptávku (do poznámky napište „TEST", e-mail přijde do schránky prodeje).
5. V Tag Assistantu musí být událost **`riptide_form_sent`** a na ní spuštěné tagy
   `GA4 – riptide_form_sent` a `Meta – RiptideFormSent`. V záložce *Proměnné* zkontrolujte
   hodnoty `DLV – riptide_…`.
6. Vyzkoušejte i **Jen nezbytné** (otevřete znovu přes „Nastavení cookies" v patičce):
   Meta tagy se pak spustit **nesmí**.

### 4.5 Publikování

**Odeslat → Publikovat** → název verze např. `Riptide – měření poptávek v1` → Publikovat.

---

## 5. Kontrola v GA4

1. **Správce → DebugView** — během náhledu z GTM uvidíte `riptide_form_sent` s parametry.
2. Po publikaci: **Přehledy → Reálný čas** → karta „Počet událostí podle názvu".
3. Data ve standardních přehledech se objeví do 24–48 hodin.
4. Přehled jen Riptide: **Prozkoumat → Volný formát** → dimenze *Datový stream*, *Riptide – typ
   formuláře*, *Riptide – model*; metrika *Klíčové události*; filtr *Název události* =
   `riptide_form_sent`.

---

## 6. Meta: vlastní konverze

1. **Events Manager → váš pixel → Testovat události** → zadejte URL Riptide webu → otevře se
   web → přijměte cookies → odešlete testovací poptávku → v seznamu musí přijít `RiptideFormSent`.
2. Pokud máte v **Nastavení → Oprávnění k provozu** (Traffic permissions) seznam povolených
   domén, přidejte doménu Riptide webu, jinak Meta události zahodí.
3. **Events Manager → Vlastní konverze → Vytvořit vlastní konverzi**
   - Název: `Riptide – odeslaná poptávka`
   - Zdroj dat: váš pixel
   - Událost konverze: **RiptideFormSent**
   - (volitelně) pravidlo: URL obsahuje doménu Riptide webu
   - Kategorie: **Potenciální zákazník** (Lead)
   - Hodnota: nechte prázdné, nebo zadejte odhadovanou hodnotu poptávky
4. V reklamní sestavě kampaně: **Konverze → Místo: Web → Cíl výkonu: maximalizovat počet
   konverzí → Událost: `Riptide – odeslaná poptávka`**.
5. Kampaně e-shopu dál optimalizují na své standardní události; nic se nesmíchá.

> **Do budoucna:** `riptide_event_id` je připravené pro Meta Conversions API (odesílání ze
> serveru). Když ho jednou zapojíte, Meta podle stejného ID spojí prohlížečovou a serverovou
> událost a nezapočítá ji dvakrát.

---

## 7. Cookie lišta a souhlas

Web obsahuje vlastní cookie lištu napojenou na Google Consent Mode v2:

- výchozí stav všech čtyř souhlasů (`analytics_storage`, `ad_storage`, `ad_user_data`,
  `ad_personalization`) je **denied** — nastaví se dřív, než se načte GTM,
- volby: **Přijmout vše**, **Jen nezbytné** (stejně výrazné tlačítko), **Nastavení** (zvlášť
  analytické a marketingové),
- volba se uloží v prohlížeči (`riptide_consent_v1`) a při další návštěvě se použije ještě před
  načtením GTM,
- změnit ji jde kdykoli odkazem **Nastavení cookies** v patičce,
- lišta odkazuje na zásady ochrany osobních údajů SwimSpa.cz.

> Texty lišty jsou stručné a obecné. Doporučuji, aby je zkontroloval ten, kdo u SwimSpa.cz řeší
> GDPR, a aby zásady ochrany osobních údajů zmiňovaly i Riptide web.

---

## 8. Zapnutí měření na webu

Měření je v kódu připravené, ale **vypnuté**, dokud není vyplněné ID kontejneru:

`src/config/analytics.js`

```js
export const GTM_ID = 'GTM-XXXXXXX' // ← ID nového kontejneru z kroku 4
```

Po nasazení se na všech stránkách automaticky:

- nastaví výchozí souhlas *denied*,
- načte GTM,
- zobrazí cookie lišta a v patičce odkaz „Nastavení cookies".

Dokud je `GTM_ID` prázdné, web nenačítá žádný měřicí skript a lišta se nezobrazuje.

---

## 9. Kontrolní seznam

- [ ] GA4: nový datový stream „Riptide web", zkopírované `G-…`
- [ ] GA4: 4 vlastní dimenze, klíčová událost `riptide_form_sent`
- [ ] GTM: nový kontejner „Riptide web", přehled souhlasu zapnutý
- [ ] GTM: 6 proměnných DLV + konstanta s ID pixelu
- [ ] GTM: spouštěče `CE – riptide_form_sent`, `CE – riptide_consent_update`
- [ ] GTM: tagy Google tag, GA4 událost, Meta základ, Meta událost (+ volitelně Google Ads)
- [ ] GTM: ověřeno v náhledu (souhlas ano i ne), publikováno
- [ ] Meta: testovací událost přišla, vlastní konverze vytvořená
- [ ] Web: `GTM_ID` vyplněné a nasazené

---

## Řešení problémů

| Problém | Příčina a řešení |
|---|---|
| V náhledu GTM chybí `riptide_form_sent` | Událost vzniká až po úspěšném odeslání. Pokud formulář hlásí chybu (např. špatný e-mail), událost se neodešle — to je správně. |
| Tag GA4 je „Not fired" kvůli souhlasu | Návštěvník nepřijal analytické cookies. V Advanced Consent Mode Google tag i tak pošle anonymní ping bez cookies. |
| Meta tag se nespustil | Chybí souhlas `ad_storage` (marketingové cookies), nebo se pixel nenačetl — zkontrolujte tag `Meta – Pixel – základ` a řazení tagů. |
| V GA4 nevidím parametry | Vlastní dimenze se plní až od chvíle vytvoření, zpětně ne. |
| Meta události nepřichází | Zkontrolujte povolené domény (Traffic permissions) a že ID pixelu v konstantě je správné. |

---

## Příloha A: jeden společný kontejner

Pokud chcete použít přímo kontejner swimspa.cz (`GTM-WKCH9WTJ`):

1. Do `src/config/analytics.js` vyplňte `GTM-WKCH9WTJ`.
2. V GTM vytvořte proměnnou **Riptide web** (typ *Vyhledávací tabulka* nebo *RegEx tabulka*
   nad proměnnou *Page Hostname*: doména Riptide webu → `true`).
3. Vytvořte spouštěč **Výjimka – Riptide web**: *Zobrazení stránky* (a/nebo *Vlastní událost*
   s regulárním výrazem `.*`), podmínka `Riptide web` = `true`.
4. **Ke každému stávajícímu tagu**, který se spouští na všech stránkách (Google Ads, Sklik,
   remarketing, posluchače formulářů…), přidejte tuto výjimku.
5. Tagy z kroku 4.3 pak vytvořte v tomto kontejneru (s ID nového GA4 streamu).

Je to víc práce a při každém novém tagu e-shopu je potřeba na výjimku myslet — proto
doporučuji samostatný kontejner.
