import { renderHeader, bindHeader } from './components/header.js'
import { renderProductHero, bindProductHero } from './components/productHero.js'
import { renderQuickSpecs } from './components/quickSpecs.js'
import { renderTrimComparison } from './components/trimComparison.js'
import { renderFeatureGrid } from './components/featureGrid.js'
import { renderSavingsSection, bindSavingsSection } from './components/home/savingsChart.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { renderMobileStickyCTA, bindMobileStickyCTA } from './components/mobileStickyCTA.js'
import { bindInquiryModal } from './components/inquiryModal.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'

export function renderModelPage(model) {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader({ transparent: true }),
    renderProductHero(model),
    renderQuickSpecs(model),
    renderTrimComparison(model),
    renderFeatureGrid(model),
    renderSavingsSection(model),
    renderShowroomSection(model),
    renderFinalCtaHome(model),
    renderFooter(),
    renderMobileStickyCTA(model),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindProductHero()
  bindSavingsSection()
  bindMobileStickyCTA()
  bindInquiryModal(model)

  initScrollReveal()
}
