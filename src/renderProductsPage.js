import { renderHeader, bindHeader } from './components/header.js'
import { renderBreadcrumb } from './components/breadcrumb.js'
import { renderModelsGrid, bindModelsGrid } from './components/hub/modelsGrid.js'
import { renderShowroomSection } from './components/home/showroomSection.js'
import { renderFinalCtaHome } from './components/home/finalCtaHome.js'
import { renderFooter } from './components/footer.js'
import { bindInquiryModal } from './components/inquiryModal.js'
import { home } from './data/riptideHome.js'
import { showroom } from './data/shared/showroom.js'
import { atlas } from './data/series/atlas.js'
import { atlantis } from './data/series/atlantis.js'
import { aquaLife } from './data/series/aquaLife.js'
import { easyLife } from './data/series/easyLife.js'

import { initScrollReveal } from './utils/reveal.js'
import { applyBasePath } from './utils/basePath.js'
import { initCountUp } from './utils/countUp.js'
import { initMagneticButtons } from './utils/magnetic.js'
import { withShopData } from './data/shared/shopData.js'
import { initAnchors } from './utils/anchors.js'

// One flat catalogue of every model, in series order; each card carries its series name
// as a badge and the series chips above the grid filter on it.
const SERIES = [atlas, atlantis, aquaLife, easyLife]
const seriesName = (s) => s.breadcrumb[s.breadcrumb.length - 1].label

export function renderProductsPage() {
  const app = document.getElementById('app')
  const models = SERIES.flatMap((s) => withShopData(s.models).map((m) => ({ ...m, brand: seriesName(s), series: seriesName(s) })))

  const hub = {
    models,
    seriesFilter: SERIES.map(seriesName),
    intro: {
      eyebrow: 'NABÍDKA RIPTIDE',
      headline: 'Všechny swim spa Riptide.',
      text: `${models.length} modelů ve čtyřech řadách. Filtrujte podle řady, řaďte podle ceny, délky nebo objemu — a otevřete detail modelu.`,
    },
  }

  app.innerHTML = [
    renderHeader(),
    '<main id="main" tabindex="-1">',
    renderBreadcrumb([{ label: 'Domů', href: '/' }, { label: 'Produkty' }]),
    renderModelsGrid(hub),
    renderShowroomSection({ showroom }),
    renderFinalCtaHome({ finalCta: home.finalCta }),
    '</main>',
    renderFooter(),
  ].join('')

  applyBasePath(app)

  bindHeader()
  bindModelsGrid()
  bindInquiryModal({ name: 'Riptide swim spa' })

  initScrollReveal()
  initMagneticButtons()
  initCountUp()
  initAnchors()
}
