// One-off scaffolding script: generates index.html + main.js for every series hub
// and model detail page, from the list below. Run with `node scripts/scaffold-pages.mjs`.
// Safe to delete after use — it only writes files, nothing depends on it at build time.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = join(__dirname, '..', 'src')

const seriesPages = [
  { path: 'atlas', dataFile: 'series/atlas.js', exportName: 'atlas', title: 'Atlas | Riptide Swim Spa', desc: 'Riptide Atlas — plavecký bazén standardní hloubky 129 cm. Dvě velikosti, tři úrovně výbavy.' },
  { path: 'atlantis', dataFile: 'series/atlantis.js', exportName: 'atlantis', title: 'Atlantis | Riptide Swim Spa', desc: 'Riptide Atlantis — extra hloubka 154 cm a nejtlustší skořepina na trhu. Tři velikosti.' },
  { path: 'aqua-life', dataFile: 'series/aquaLife.js', exportName: 'aquaLife', title: 'Aqua Life | Riptide Swim Spa', desc: 'Riptide Aqua Life — swim spa standardní hloubky s hydromasáží. Pět velikostí, včetně Duo.' },
  { path: 'easy-life', dataFile: 'series/easyLife.js', exportName: 'easyLife', title: 'Easy Life | Riptide Swim Spa', desc: 'Riptide Easy Life — swim spa extra hloubky. Osm velikostí, jednozónové i Duo.' },
]

const modelPages = [
  { path: 'atlas/atlas-4-4', dataFile: 'models/atlas-4-4.js', exportName: 'atlas44', title: 'Atlas 4.4 | Riptide Swim Spa' },
  { path: 'atlas/atlas-6-0', dataFile: 'models/atlas-6-0.js', exportName: 'atlas60', title: 'Atlas 6.0 | Riptide Swim Spa' },
  { path: 'atlantis/atlantis-4-4', dataFile: 'models/atlantis-4-4.js', exportName: 'atlantis44', title: 'Atlantis 4.4 | Riptide Swim Spa' },
  { path: 'atlantis/atlantis-6-0', dataFile: 'models/atlantis-6-0.js', exportName: 'atlantis60', title: 'Atlantis 6.0 | Riptide Swim Spa' },
  { path: 'atlantis/atlantis-7-0', dataFile: 'models/atlantis-7-0.js', exportName: 'atlantis70', title: 'Atlantis 7.0 | Riptide Swim Spa' },
  { path: 'aqua-life/aqua-life-4-0', dataFile: 'models/aqua-life-4-0.js', exportName: 'aquaLife40', title: 'Aqua Life 4.0 | Riptide Swim Spa' },
  { path: 'aqua-life/aqua-life-4-4', dataFile: 'models/aqua-life-4-4.js', exportName: 'aquaLife44', title: 'Aqua Life 4.4 | Riptide Swim Spa' },
  { path: 'aqua-life/aqua-life-5-5', dataFile: 'models/aqua-life-5-5.js', exportName: 'aquaLife55', title: 'Aqua Life 5.5 | Riptide Swim Spa' },
  { path: 'aqua-life/aqua-life-6-0', dataFile: 'models/aqua-life-6-0.js', exportName: 'aquaLife60', title: 'Aqua Life 6.0 | Riptide Swim Spa' },
  { path: 'aqua-life/aqua-life-6-0-duo', dataFile: 'models/aqua-life-6-0-duo.js', exportName: 'aquaLife60Duo', title: 'Aqua Life 6.0 Duo | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-4-4', dataFile: 'models/easy-life-4-4.js', exportName: 'easyLife44', title: 'Easy Life 4.4 | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-5-5', dataFile: 'models/easy-life-5-5.js', exportName: 'easyLife55', title: 'Easy Life 5.5 | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-6-0', dataFile: 'models/easy-life-6-0.js', exportName: 'easyLife60', title: 'Easy Life 6.0 | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-6-0-duo', dataFile: 'models/easy-life-6-0-duo.js', exportName: 'easyLife60Duo', title: 'Easy Life 6.0 Duo | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-7-0', dataFile: 'models/easy-life-7-0.js', exportName: 'easyLife70', title: 'Easy Life 7.0 | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-7-0-duo', dataFile: 'models/easy-life-7-0-duo.js', exportName: 'easyLife70Duo', title: 'Easy Life 7.0 Duo | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-8-0', dataFile: 'models/easy-life-8-0.js', exportName: 'easyLife80', title: 'Easy Life 8.0 | Riptide Swim Spa' },
  { path: 'easy-life/easy-life-8-0-duo', dataFile: 'models/easy-life-8-0-duo.js', exportName: 'easyLife80Duo', title: 'Easy Life 8.0 Duo | Riptide Swim Spa' },
]

function depthPrefix(path) {
  const depth = path.split('/').length
  return '../'.repeat(depth)
}

function writePage({ path, dataFile, exportName, title, desc }, renderFn, renderFile) {
  const dir = join(srcDir, path)
  mkdirSync(dir, { recursive: true })
  const prefix = depthPrefix(path)

  const html = `<!doctype html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${title}</title>
  ${desc ? `<meta name="description" content="${desc}" />\n  ` : ''}<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="${prefix}style.css" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
`
  writeFileSync(join(dir, 'index.html'), html)

  const js = `import { ${exportName} } from '${prefix}data/${dataFile}'
import { ${renderFn} } from '${prefix}${renderFile}'

${renderFn}(${exportName})
`
  writeFileSync(join(dir, 'main.js'), js)
}

seriesPages.forEach((p) => writePage(p, 'renderSeriesPage', 'renderSeriesPage.js'))
modelPages.forEach((p) => writePage(p, 'renderModelPage', 'renderModelPage.js'))

console.log(`Scaffolded ${seriesPages.length} series pages + ${modelPages.length} model pages.`)
