import { renderHeader, bindHeader } from './components/header.js'
import { renderHeroHome, bindHeroHome } from './components/home/heroHome.js'
import { renderJetMomentScroll, bindJetMomentScroll } from './components/home/jetMomentScroll.js'
import { renderQuietStatement } from './components/home/quietStatement.js'
import { renderCategorySplit } from './components/home/categorySplit.js'
import { renderAdvantagesSplit } from './components/home/advantagesSplit.js'
import { renderTrustSection } from './components/home/trustSection.js'
import { renderSavingsSection, bindSavingsSection } from './components/home/savingsChart.js'
import { renderWhyStatements } from './components/home/whyStatements.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { bindInquiryModal } from './components/inquiryModal.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'
import { initLightbox } from './utils/lightbox.js'
import { initCountUp } from './utils/countUp.js'
import { initMagneticButtons } from './utils/magnetic.js'

export function renderHomePage(home) {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader({ transparent: true }),
    renderHeroHome(home),
    renderJetMomentScroll(home.jetMoment),
    renderCategorySplit(home),
    renderQuietStatement(home.quiet.afterCategories),
    renderAdvantagesSplit(home),
    renderQuietStatement(home.quiet.afterAdvantages),
    renderTrustSection(home),
    renderWhyStatements(home),
    renderSavingsSection(home),
    renderShowroomSection(home),
    renderFinalCtaHome(home),
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindHeroHome()
  bindJetMomentScroll()
  bindSavingsSection()
  bindInquiryModal({ name: 'Riptide swim spa' })

  initScrollReveal()
  initMagneticButtons()
  initCountUp()
  initLightbox()
}
