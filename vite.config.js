import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fg from 'fast-glob'
import { readFileSync, existsSync } from 'node:fs'
import { heroImages } from './src/data/shared/heroImages.js'

// Every page is a folder under src/ with its own index.html + main.js
// (see src/main.js for home, src/atlas/atlas-4-4/main.js for a model page, etc).
// Rather than hand-maintain a list of ~23 entries, discover them at build time.
function pageInputs() {
  const files = fg.sync('src/**/index.html', { cwd: __dirname })
  const entries = {}
  for (const file of files) {
    const key = file === 'src/index.html' ? 'home' : file.replace('src/', '').replace('/index.html', '').replace(/\//g, '-')
    entries[key] = resolve(__dirname, file)
  }
  return entries
}

// Gets the hero photo moving before any JavaScript has run. Every page's markup is
// rendered client-side, so without this the browser only discovers the hero <img> after
// the module graph has downloaded and executed, then starts a ~300 KB download — which is
// what made the first screen appear as bare text. Here each page's <head> gets a preload
// hint for its hero (home: data/riptideHome.js, model pages: data/models/<slug>.js) plus
// a one-rule stylesheet that paints the blurred placeholder in the still-empty #app.
// Reads the same heroImages.js the runtime uses, so the two can't drift apart.
function heroPreload() {
  let base = '/'
  const heroOf = (file) => {
    const rel = file.replace(__dirname + '/', '')
    let dataFile = null
    if (rel === 'src/index.html') dataFile = 'src/data/riptideHome.js'
    else {
      const m = rel.match(/^src\/[^/]+\/([^/]+)\/index\.html$/)
      if (m) dataFile = `src/data/models/${m[1]}.js`
    }
    if (!dataFile || !existsSync(resolve(__dirname, dataFile))) return null
    const text = readFileSync(resolve(__dirname, dataFile), 'utf8')
    const hit = text.match(/(?:\bhero|\bimage):\s*'(\/assets\/photos\/([\w-]+)\.jpg)'/)
    return hit && heroImages[hit[2]] ? { path: hit[1], ...heroImages[hit[2]] } : null
  }
  return {
    name: 'hero-preload',
    configResolved: (config) => (base = config.base),
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const hero = ctx.filename ? heroOf(ctx.filename) : null
        if (!hero) return html
        const stem = base + hero.path.slice(1).replace(/\.jpg$/, '')
        const srcset = hero.widths.map((w) => `${stem}-${w}.webp ${w}w`).join(', ')
        const tags = `
  <link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />
  <style>#app:empty{min-height:100svh;background:#0a0a08 url(${hero.lqip}) center/cover no-repeat}</style>`
        return html.replace('</head>', `${tags}\n</head>`)
      },
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [heroPreload()],
  root: 'src',
  publicDir: '../public',
  base: mode === 'ghpages' ? '/riptide-swimspa/' : '/',
  server: {
    port: 5174,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: pageInputs(),
    },
  },
}))
