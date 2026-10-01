export function renderHeader({ transparent = false } = {}) {
  return `
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
            <li><a href="/atlas/" data-nav-link>Atlas</a></li>
            <li><a href="/atlantis/" data-nav-link>Atlantis</a></li>
            <li><a href="/aqua-life/" data-nav-link>Aqua Life</a></li>
            <li><a href="/easy-life/" data-nav-link>Easy Life</a></li>
            <li><a href="/#showroom" data-nav-link>Kontakt</a></li>
            <li class="site-nav-mobile-actions">
              <a href="tel:+420777605789" class="site-nav-mobile-phone" data-nav-link>+420 777 605 789</a>
              <button class="btn btn-primary site-nav-mobile-cta" data-open-inquiry data-nav-link>Spočítat cenu</button>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <a href="tel:+420777605789" class="header-contact">+420 777 605 789</a>
          <button class="btn btn-primary header-cta" data-open-inquiry>Spočítat cenu</button>
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

  nav.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open')
      header.classList.remove('nav-is-open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
}
