import { build } from 'vite'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const serverDirectory = resolve(root, 'dist/.server')
const { EBAY_URL, PAGE_DEFINITIONS, SITE_URL } = await import(
  pathToFileURL(resolve(root, 'src/pageData.js')).href,
)

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

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function getSchema(page) {
  const pageUrl = `${SITE_URL}${page.path}`
  const pageEntity = page.type === 'Article'
    ? {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: page.title,
        description: page.description,
        image: `${SITE_URL}/poke_otter.jpg`,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        datePublished: page.datePublished,
        dateModified: page.dateModified,
        mainEntityOfPage: pageUrl,
        inLanguage: 'en-GB',
      }
    : {
        '@type': page.type,
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-GB',
      }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Poke Otter',
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/poke_otter.jpg` },
        description: 'Independent UK seller of raw and graded Pokemon cards through eBay UK.',
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        sameAs: [EBAY_URL],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Poke Otter',
        description: 'Pokemon cards for UK collectors, including raw singles and graded collector finds.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-GB',
      },
      pageEntity,
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Poke Otter', item: `${SITE_URL}/` },
          ...(page.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title, item: pageUrl }]),
        ],
      },
    ],
  }
}

function getSeoHead(page) {
  const pageUrl = `${SITE_URL}${page.path}`
  const schema = JSON.stringify(getSchema(page), null, 2)

  return `
    <meta name="description" content="${escapeAttribute(page.description)}" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:title" content="${escapeAttribute(page.ogTitle)}" />
    <meta property="og:description" content="${escapeAttribute(page.ogDescription)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:site_name" content="Poke Otter" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:image" content="${SITE_URL}/poke_otter.jpg" />
    <meta property="og:image:alt" content="Poke Otter mascot holding a Pokemon card" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="960" />
    <meta property="og:image:height" content="960" />
    <meta property="og:type" content="${page.type === 'Article' ? 'article' : 'website'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(page.ogTitle)}" />
    <meta name="twitter:description" content="${escapeAttribute(page.ogDescription)}" />
    <meta name="twitter:image" content="${SITE_URL}/poke_otter.jpg" />
    <meta name="twitter:image:alt" content="Poke Otter mascot holding a Pokemon card" />
    <script type="application/ld+json">${schema}</script>
    <title>${escapeAttribute(page.title)}</title>`
}

for (const page of PAGE_DEFINITIONS) {
  const renderedHtml = indexHtml
    .replace(/<!-- SEO_PAGE_START -->[\s\S]*?<!-- SEO_PAGE_END -->/, `<!-- SEO_PAGE_START -->${getSeoHead(page)}\n    <!-- SEO_PAGE_END -->`)
    .replace('<div id="root"></div>', `<div id="root">${render(page.path)}</div>`)

  const outputPath = page.path === '/' ? indexPath : resolve(root, 'dist', page.path.slice(1), 'index.html')
  await mkdir(resolve(outputPath, '..'), { recursive: true })
  await writeFile(outputPath, renderedHtml)
}

await rm(serverDirectory, { recursive: true, force: true })
