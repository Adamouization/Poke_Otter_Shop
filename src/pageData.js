export const SITE_URL = 'https://pokeotter.jaamour.com'
export const EBAY_URL = 'https://www.ebay.co.uk/usr/poke_otter'

export const PAGE_DEFINITIONS = [
  {
    path: '/',
    title: 'Poke Otter | Pokemon cards on eBay UK',
    description: 'Shop Pokemon cards in the UK with Poke Otter: pack-fresh raw singles, graded collector cards, and live eBay UK listings.',
    ogTitle: 'Poke Otter | Pokemon cards on eBay UK',
    ogDescription: 'Shop fresh pulls, graded cards, and collector finds from Poke Otter on eBay UK.',
    type: 'WebPage',
  },
  {
    path: '/pokemon-cards-uk/',
    title: 'Pokemon Cards UK | Raw Singles & Collectors | Poke Otter',
    description: 'Find Pokemon cards in the UK from Poke Otter: pack-fresh raw singles, holos, and graded collector finds listed on eBay UK.',
    ogTitle: 'Pokemon Cards UK | Poke Otter',
    ogDescription: 'Browse raw Pokemon singles and graded collector cards from an independent UK seller on eBay.',
    type: 'CollectionPage',
  },
  {
    path: '/graded-pokemon-cards-uk/',
    title: 'Graded Pokemon Cards UK | Collector Cards | Poke Otter',
    description: 'Browse graded Pokemon cards for UK collectors, with listing photos, condition, grading details, postage, and buyer terms on eBay UK.',
    ogTitle: 'Graded Pokemon Cards UK | Poke Otter',
    ogDescription: 'Explore graded Pokemon card listings and collector finds from Poke Otter on eBay UK.',
    type: 'CollectionPage',
  },
  {
    path: '/guides/raw-vs-graded-pokemon-cards/',
    title: "Raw vs Graded Pokemon Cards: A Collector's Guide | Poke Otter",
    description: 'Should you buy a raw or graded Pokemon card? Compare cost, condition, protection, and collecting goals in this practical UK collector guide.',
    ogTitle: 'Raw vs Graded Pokemon Cards: A Collector’s Guide',
    ogDescription: 'A practical guide to choosing between raw and graded Pokemon cards as a collector.',
    type: 'Article',
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
  },
]

export function getPageDefinition(pathname = '/') {
  const normalizedPath = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}/`
  return PAGE_DEFINITIONS.find((page) => page.path === normalizedPath) || PAGE_DEFINITIONS[0]
}
