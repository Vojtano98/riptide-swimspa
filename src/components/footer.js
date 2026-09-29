export function renderFooter() {
  const year = new Date().getFullYear()
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <img src="/assets/brand/riptide-logo-white.png" alt="Riptide" class="footer-logo" />
            <p class="footer-tagline">Riptide swim spa — exkluzivně v ČR přes SwimSpa.cz.</p>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <div class="footer-col-title">Řady</div>
              <a href="/atlas/">Atlas</a>
              <a href="/atlantis/">Atlantis</a>
              <a href="/aqua-life/">Aqua Life</a>
              <a href="/easy-life/">Easy Life</a>
            </div>
            <div class="footer-col">
              <div class="footer-col-title">Kontakt</div>
              <a href="tel:+420777605789">+420 777 605 789</a>
              <a href="mailto:info@swimspa.cz">info@swimspa.cz</a>
              <span class="footer-address">Nad Vršovskou horou 88/4<br />101 00 Praha 10 – Michle</span>
            </div>
            <div class="footer-col">
              <div class="footer-col-title">Sociální sítě</div>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} Riptide swim spa · prodává SwimSpa.cz — NO TRADING s.r.o. · IČO 05295823</span>
          <div class="footer-legal">
            <a href="#">Obchodní podmínky</a>
            <a href="#">Ochrana osobních údajů</a>
          </div>
        </div>
      </div>
    </footer>
  `
}
