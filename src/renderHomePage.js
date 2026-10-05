import { renderHeader, bindHeader } from './components/header.js'
import { renderHeroHome, bindHeroHome } from './components/home/heroHome.js'
import { renderJetMomentScroll, bindJetMomentScroll } from './components/home/jetMomentScroll.js'
import { renderQuietStatement, bindQuietStatements } from './components/home/quietStatement.js'
import { renderCategorySplit } from './components/home/categorySplit.js'
import { renderSwimSpaExplainer } from './components/home/swimSpaExplainer.js'
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
import { renderReviews } from './components/reviewsSection.js'
import { renderFaq } from './components/faqSection.js'
import { renderModelAdvisor, bindModelAdvisor } from './components/home/modelAdvisor.js'
import { initAnchors } from './utils/anchors.js'

export function renderHomePage(home) {
  const app = document.getElementById('app')

  // Order follows the buyer's questions: what is a swim spa → why is this one better →
  // the extras (hydromassage, two temperatures) → what does it cost to run → which series
  // and model is for me → can I trust the maker → come and see it.
  app.innerHTML = [
    renderHeader({ transparent: true }),
    '<main id="main" tabindex="-1">',
    renderHeroHome(home),
    renderSwimSpaExplainer(home),
    renderWhyStatements(home),
    renderJetMomentScroll(home.jetMoment),
    renderQuietStatement(home.quiet.afterCategories),
    renderSavingsSection(home),
    renderQuietStatement(home.quiet.afterAdvantages),
    renderCategorySplit(home),
    renderModelAdvisor(),
    renderTrustSection(home),
    renderReviews(),
    renderFaq(),
    renderShowroomSection(home),
    renderFinalCtaHome(home),
    '</main>',
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindHeroHome()
  bindJetMomentScroll()
  bindSavingsSection()
  bindQuietStatements()
  bindModelAdvisor()
  bindInquiryModal({ name: 'Riptide swim spa' })

  initScrollReveal()
  initMagneticButtons()
  initCountUp()
  initLightbox()
  initAnchors()
}
