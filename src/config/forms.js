// FormSubmit relays form submissions straight to an inbox without needing a backend
// (this is a static site, so there's nowhere to run server code) — no account or API
// key required. The destination email lives right in the endpoint URL below.
//
// IMPORTANT: the very first submission ever sent to a given address triggers a
// one-time "please confirm you want to receive form submissions" email from
// FormSubmit to that address — it must be confirmed there before real submissions
// start arriving. To switch the inbox later, just change INQUIRY_EMAIL and repeat
// that one-time confirmation for the new address.
export const INQUIRY_EMAIL = 'novotnyvv@gmail.com'

export const INQUIRY_ENDPOINT = `https://formsubmit.co/${INQUIRY_EMAIL}`
