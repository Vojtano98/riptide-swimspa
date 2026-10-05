const CHEVRON =
  '<svg class="nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'

// Series descriptors are the same eyebrows the homepage category tiles use.
const PRODUCTS = [
  { href: '/produkty/', title: 'Všechny produkty', text: 'Přehled všech modelů a cen' },
  { href: '/atlas/', title: 'Atlas', text: 'Jen plavání · standardní hloubka' },
  { href: '/atlantis/', title: 'Atlantis', text: 'Jen plavání · extra hloubka' },
  { href: '/aqua-life/', title: 'Aqua Life', text: 'Plavání + hydromasáž · standardní hloubka' },
  { href: '/easy-life/', title: 'Easy Life', text: 'Plavání + hydromasáž · extra hloubka' },
]

// Jump links to homepage sections, in the same order as the sections on the page.
const DISCOVER = [
  { href: '/#swim-spa', title: 'Co je swim spa', text: 'Bazén, ve kterém plavete na místě' },
  { href: '/#technologie', title: 'Technologie', text: 'Proč se v Riptide plave jinak' },
  { href: '/#uspora', title: 'Úspora energie', text: 'Až o 26 % nižší náklady na ohřev' },
  { href: '/#kategorie', title: 'Řady Riptide', text: 'Čtyři řady, dvě otázky' },
  { href: '/#pruvodce', title: 'Najděte svůj model', text: 'Čtyři otázky a ukážeme, co vám sedí' },
  { href: '/#faq', title: 'Časté otázky', text: 'Místo, napájení, provoz, ceny' },
]

const panelLinks = (items) =>
  items
    .map((i) => `<a href="${i.href}" data-nav-link><strong>${i.title}</strong><span>${i.text}</span></a>`)
    .join('')

export function renderHeader({ transparent = false } = {}) {
  return `
    <a class="skip-link" href="#main">Přeskočit na obsah</a>
    <header class="site-header${transparent ? ' site-header--transparent' : ''}" id="site-header">
      <div class="container">
        <a href="/" class="brand-lockup" aria-label="Riptide Swim Spa — domů">
          <span class="site-logo">
            <img src="/assets/brand/riptide-logo-dark.png" alt="Riptide" class="site-logo-img site-logo-img--color" decoding="async" />
            <img src="/assets/brand/riptide-logo-white.png" alt="Riptide" class="site-logo-img site-logo-img--white" decoding="async" />
          </span>
          <span class="brand-lockup-divider" aria-hidden="true"></span>
          <span class="brand-partner">
            <span class="brand-partner-label">Exkluzivní partner</span>
            <span class="brand-partner-imgs">
              <img src="/assets/brand/swimspa-logo-color.png" alt="SwimSpa.cz" class="brand-partner-img brand-partner-img--color" decoding="async" />
              <img src="/assets/brand/swimspa-logo-white.png" alt="SwimSpa.cz" class="brand-partner-img brand-partner-img--white" decoding="async" />
            </span>
          </span>
        </a>
        <nav>
          <ul class="site-nav" id="site-nav">
            <li class="nav-group">
              <a href="/produkty/" class="nav-trigger" aria-controls="nav-products" data-nav-link>Produkty ${CHEVRON}</a>
              <div class="nav-panel" id="nav-products">
                ${panelLinks(PRODUCTS)}
              </div>
            </li>
            <li class="nav-group">
              <button type="button" class="nav-trigger" aria-expanded="false" aria-controls="nav-discover">Objevte Riptide ${CHEVRON}</button>
              <div class="nav-panel nav-panel--wide" id="nav-discover">
                ${panelLinks(DISCOVER)}
              </div>
            </li>
            <li><a href="/#showroom" data-nav-link>Kontakty a showroom</a></li>
            <li class="site-nav-mobile-actions">
              <a href="tel:+420777605789" class="site-nav-mobile-phone" data-nav-link>+420 777 605 789</a>
              <button class="btn btn-primary site-nav-mobile-cta" data-open-inquiry data-nav-link>Poptat cenu</button>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <a href="tel:+420777605789" class="header-contact">+420 777 605 789</a>
          <button class="btn btn-primary header-cta" data-open-inquiry>Poptat cenu</button>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span></button>
        </div>
      </div>
    </header>
  `
}

export function bindHeader() {
  const header = document.getElementById('site-header')
  const toggle = document.getElementById('nav-toggle')
  const nav = document.getElementById('site-nav')

  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      header.classList.toggle('is-scrolled', window.scrollY > 24)
      ticking = false
    })
  }
  header.classList.toggle('is-scrolled', window.scrollY > 24)
  window.addEventListener('scroll', onScroll, { passive: true })

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open')
    header.classList.toggle('nav-is-open', isOpen)
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  // Desktop dropdowns: open on hover via CSS; the buttons make them work for touch and
  // keyboard too (click toggles, Escape / outside click closes).
  const groups = [...nav.querySelectorAll('.nav-group')]
  const closeGroups = (except) =>
    groups.forEach((g) => {
      if (g === except) return
      g.classList.remove('is-open')
      g.querySelector('.nav-trigger').setAttribute?.('aria-expanded', 'false')
    })
  groups.forEach((g) => {
    const trigger = g.querySelector('.nav-trigger')
    if (trigger.tagName === 'A') return // "Produkty" is a real link; its dropdown opens on hover / focus
    trigger.addEventListener('click', () => {
      const open = g.classList.toggle('is-open')
      trigger.setAttribute('aria-expanded', String(open))
      closeGroups(g)
    })
  })
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-group')) closeGroups()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGroups()
  })

  nav.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      closeGroups()
      nav.classList.remove('is-open')
      header.classList.remove('nav-is-open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
}
