import { renderHeader, bindHeader } from './components/header.js'
import { renderProductHero, bindProductHero } from './components/productHero.js'
import { renderQuickSpecs } from './components/quickSpecs.js'
import { renderTrimComparison, bindTrimComparison } from './components/trimComparison.js'
import { renderModelBar, bindModelBar } from './components/modelBar.js'
import { renderModelHighlights, bindModelHighlights } from './components/modelHighlights.js'
import { renderModelDimensions, bindModelDimensions } from './components/modelDimensions.js'
import { renderMaterialsSwatches } from './components/materialsSwatches.js'
import { renderFeatureGrid } from './components/featureGrid.js'
import { renderSavingsSection, bindSavingsSection } from './components/home/savingsChart.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { renderMobileStickyCTA, bindMobileStickyCTA } from './components/mobileStickyCTA.js'
import { bindInquiryModal } from './components/inquiryModal.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'
import { initLightbox } from './utils/lightbox.js'
import { initCountUp } from './utils/countUp.js'
import { initMagneticButtons } from './utils/magnetic.js'

export function renderModelPage(model) {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader({ transparent: true }),
    renderProductHero(model),
    renderQuickSpecs(model),
    renderModelBar(model),
    renderTrimComparison(model),
    renderModelHighlights(model),
    renderMaterialsSwatches(model),
    renderModelDimensions(model),
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
  bindTrimComparison()
  bindModelHighlights()
  bindModelBar()
  bindModelDimensions()
  bindSavingsSection()
  bindMobileStickyCTA()
  bindInquiryModal(model)

  initScrollReveal()
  initMagneticButtons()
  initCountUp()
  initLightbox()
}
