// dataLayer events for Google Tag Manager. Every name and parameter carries the `riptide_`
// prefix, so nothing here can collide with the events of the SwimSpa.cz shop (which already
// uses e.g. `form_submit`) even when both end up in the same GTM, GA4 or Meta account.
// Full event reference: docs/mereni-konverzi.md

export function pushEvent(event, params = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Which kind of page the visitor is on: home, produkty, rada (series) or model.
export function pageType(path = location.pathname) {
  const parts = path.replace(/^\/riptide-swimspa/, '').split('/').filter(Boolean)
  if (!parts.length) return 'home'
  if (parts[0] === 'produkty') return 'produkty'
  return parts.length === 1 ? 'rada' : 'model'
}

// A unique id per conversion, so the browser event and a possible server-side event
// (Meta Conversions API) can be deduplicated.
const eventId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`)

// Fired only after the form service confirmed the inquiry was delivered.
export function trackFormSent({ type, name, model, variant }) {
  pushEvent('riptide_form_sent', {
    riptide_form_type: type, // price | showroom | question
    riptide_form_name: name, // the dialog title the visitor saw
    riptide_model: model, // e.g. "Atlantis 7.0", or "Riptide swim spa" outside model pages
    riptide_variant: variant || '', // equipment level if one was picked, e.g. "Pro Premium"
    riptide_page_type: pageType(),
    riptide_event_id: eventId(),
  })
}
