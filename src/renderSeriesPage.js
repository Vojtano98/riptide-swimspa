import { renderHeader, bindHeader } from './components/header.js'
import { renderBreadcrumb } from './components/breadcrumb.js'
import { renderModelsGrid } from './components/hub/modelsGrid.js'
import { renderTextBenefitsGrid } from './components/textBenefitsGrid.js'
import { renderJetPrecisionStory } from './components/jetPrecisionStory.js'
import { renderAccessoryShowcase } from './components/accessoryShowcase.js'
import { renderSavingsSection, bindSavingsSection } from './components/home/savingsChart.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { bindInquiryModal } from './components/inquiryModal.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'
import { initMagneticButtons } from './utils/magnetic.js'

export function renderSeriesPage(series) {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader(),
    renderBreadcrumb(series.breadcrumb),
    renderModelsGrid(series),
    renderTextBenefitsGrid(series.hydrotherapy, { tone: 'tint' }),
    renderJetPrecisionStory(series.jetPrecision),
    renderAccessoryShowcase(series.accessories),
    renderSavingsSection(series),
    renderShowroomSection(series),
    renderFinalCtaHome(series),
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindSavingsSection()
  bindInquiryModal({ name: series.breadcrumb[series.breadcrumb.length - 1].label })

  initScrollReveal()
  initMagneticButtons()
}
