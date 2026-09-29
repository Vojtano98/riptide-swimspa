import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fg from 'fast-glob'

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

export default defineConfig(({ mode }) => ({
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
