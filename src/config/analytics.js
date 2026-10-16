// Measurement for the Riptide site (GA4 + Meta through Google Tag Manager).
//
// GTM_ID: the Google Tag Manager container that should run on this site. Leave it empty and
// no tracking script is loaded and no cookie banner is shown — the dataLayer events below
// are still pushed (harmless without GTM), so switching tracking on is this one line.
// Setup steps for GTM, GA4 and Meta: docs/mereni-konverzi.md
export const GTM_ID = ''

// Where the "Ochrana osobních údajů" links point (cookie banner + footer).
export const PRIVACY_URL = 'https://www.swimspa.cz/podminky-ochrany-osobnich-udaju/'

// Name of the stored cookie choice (localStorage). Bump the number when the categories change,
// so everyone is asked again.
export const CONSENT_KEY = 'riptide_consent_v1'
