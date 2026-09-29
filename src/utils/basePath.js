// The site is built with root-absolute internal links/images (e.g. "/swim-spa/",
// "/assets/..."). On GitHub Pages the site is served from a subpath
// (e.g. "/Swimspa-web/"), so those need the deployment base prefixed at runtime.
export function applyBasePath(root = document) {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return

  const prefix = base.replace(/\/$/, '')

  root.querySelectorAll('a[href^="/"], img[src^="/"]').forEach((el) => {
    const attr = el.tagName === 'IMG' ? 'src' : 'href'
    const value = el.getAttribute(attr)
    if (!value || value.startsWith('//') || value.startsWith(prefix + '/') || value === prefix) return
    el.setAttribute(attr, prefix + value)
  })
}
