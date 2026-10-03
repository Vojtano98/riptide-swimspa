import { renderHeader, bindHeader } from './components/header.js'
import { renderBreadcrumb } from './components/breadcrumb.js'
import { renderModelsGrid, bindModelsGrid } from './components/hub/modelsGrid.js'
import { renderModelCompare, bindModelCompare } from './components/hub/modelCompare.js'
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
import { initLightbox } from './utils/lightbox.js'
import { initCountUp } from './utils/countUp.js'
import { initMagneticButtons } from './utils/magnetic.js'
import { renderSeriesHero } from './components/hub/seriesHero.js'
import { withShopData } from './data/shared/shopData.js'
import { initAnchors } from './utils/anchors.js'

export function renderSeriesPage(rawSeries) {
  const series = { ...rawSeries, models: withShopData(rawSeries.models) }
  const app = document.getElementById('app')

  app.innerHTML = [
    renderHeader(),
    '<main id="main" tabindex="-1">',
    renderBreadcrumb(series.breadcrumb),
    renderSeriesHero(series),
    renderModelsGrid({ ...series, noHead: true }),
    renderModelCompare(series),
    renderTextBenefitsGrid(series.hydrotherapy, { tone: 'tint' }),
    renderJetPrecisionStory(series.jetPrecision),
    renderAccessoryShowcase(series.accessories),
    renderSavingsSection(series),
    renderShowroomSection(series),
    renderFinalCtaHome(series),
    '</main>',
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindModelsGrid()
  bindModelCompare()
  bindSavingsSection()
  bindInquiryModal({ name: series.breadcrumb[series.breadcrumb.length - 1].label })

  initScrollReveal()
  initMagneticButtons()
  initCountUp()
  initLightbox()
  initAnchors()
}
