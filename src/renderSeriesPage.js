import { renderHeader, bindHeader } from './components/header.js'
import { renderBreadcrumb } from './components/breadcrumb.js'
import { renderModelsGrid } from './components/hub/modelsGrid.js'
import { renderSavingsSection, bindSavingsSection } from './components/home/savingsChart.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { bindInquiryModal } from './components/inquiryModal.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'

export function renderSeriesPage(series) {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader(),
    renderBreadcrumb(series.breadcrumb),
    renderModelsGrid(series),
    renderSavingsSection(series),
    renderShowroomSection(series),
    renderFinalCtaHome(series),
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindSavingsSection()
  bindInquiryModal({ name: series.intro.headline })

  initScrollReveal()
}
