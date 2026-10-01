// The site is built with root-absolute internal links/images (e.g. "/swim-spa/",
// "/assets/..."). On GitHub Pages the site is served from a subpath
// (e.g. "/Swimspa-web/"), so those need the deployment base prefixed at runtime.
export function applyBasePath(root = document) {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return

  const prefix = base.replace(/\/$/, '')

  const rewrite = (el, attr) => {
    const value = el.getAttribute(attr)
    if (!value || value.startsWith('//') || value.startsWith(prefix + '/') || value === prefix) return
    el.setAttribute(attr, prefix + value)
  }

  root.querySelectorAll('a[href^="/"]').forEach((el) => rewrite(el, 'href'))
  root.querySelectorAll('img[src^="/"], source[src^="/"]').forEach((el) => rewrite(el, 'src'))
}
