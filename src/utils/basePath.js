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

  const rewriteOne = (value) =>
    !value || value.startsWith('//') || value.startsWith(prefix + '/') || value === prefix
      ? value
      : prefix + value

  const rewriteSrcset = (el) => {
    const value = el.getAttribute('srcset')
    if (!value) return
    const rewritten = value
      .split(',')
      .map((part) => {
        const [url, descriptor] = part.trim().split(/\s+/, 2)
        if (!url || !url.startsWith('/')) return part.trim()
        return descriptor ? `${rewriteOne(url)} ${descriptor}` : rewriteOne(url)
      })
      .join(', ')
    el.setAttribute('srcset', rewritten)
  }

  root.querySelectorAll('a[href^="/"]').forEach((el) => rewrite(el, 'href'))
  root.querySelectorAll('img[src^="/"], source[src^="/"]').forEach((el) => rewrite(el, 'src'))
  root.querySelectorAll('img[srcset], source[srcset]').forEach(rewriteSrcset)
  // Lazy-loaded frames (see jetMomentScroll.js) carry their URL in data-src
  // until JS promotes it to src, so it needs the same rewrite up front.
  root.querySelectorAll('img[data-src^="/"]').forEach((el) => rewrite(el, 'data-src'))
}
