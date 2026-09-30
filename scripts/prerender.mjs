import { build } from 'vite'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const serverDirectory = resolve(root, 'dist/.server')

await build({
  root,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist/.server',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'entry-server.js',
      },
    },
  },
})

const serverEntry = pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href
const { render } = await import(`${serverEntry}?t=${Date.now()}`)
const indexPath = resolve(root, 'dist/index.html')
const indexHtml = await readFile(indexPath, 'utf8')
const renderedHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)

await writeFile(indexPath, renderedHtml)
await rm(serverDirectory, { recursive: true, force: true })
