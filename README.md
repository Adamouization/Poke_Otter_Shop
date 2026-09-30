# Poke Otter

Poke Otter is a single-page storefront for an independent Pokemon card shop selling through [eBay UK](https://www.ebay.co.uk/usr/poke_otter). It presents live shop inventory, explains the raw-card handling standard, and gives visitors a direct way to ask about a card or order.

The site is intentionally static. There is no application server, database, authentication system, or custom checkout. Purchases happen on eBay UK.

## Features

- Live eBay listings loaded from the Auction Nudge widget.
- Up to 100 active listings in a responsive grid.
- Four-column desktop, three-column tablet, and two-column mobile layouts.
- Raw and graded card positioning.
- Raw-card care messaging: pack-fresh, pulled by hand, and immediately sleeved.
- Royal Mail and eBay checkout information.
- FAQ and Formspree-ready contact form.
- Responsive layout with reduced-motion support.
- Prerendered homepage HTML for search crawlers and fast first paint.
- Canonical URL, sitemap, robots directive, Open Graph, Twitter card, and JSON-LD metadata.

## Stack

- React 19
- Vite 8
- JavaScript with JSX
- Plain CSS with CSS custom properties and responsive media queries
- Vercel-compatible static build
- Auction Nudge eBay Listings Widget
- Formspree for contact-form delivery

Node 22 is the recommended runtime. The Vite version currently used by this project requires Node `^20.19.0` or `>=22.12.0`.

## Project structure

```text
.
├── public/
│   ├── poke_otter.jpg       # Shop mascot and favicon/social image
│   ├── robots.txt           # Crawler instructions and sitemap location
│   └── sitemap.xml          # Indexable site URLs
├── src/
│   ├── App.jsx              # Page sections, widget, and contact form
│   ├── entry-server.jsx     # Static prerender entry point
│   ├── main.jsx             # React entry point
│   └── styles.css           # Complete visual system and responsive styles
├── scripts/
│   └── prerender.mjs        # Injects rendered React HTML into dist/index.html
├── .env.example             # Environment variable template
├── .nvmrc                   # Recommended Node major version
├── index.html               # Document shell and SEO metadata
├── vite.config.js           # Vite configuration
└── package.json              # Scripts, dependencies, and runtime metadata
```

## Local development

Use Node 22 and npm:

```bash
npm install
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173`.

## Environment variables

The contact form uses Formspree. Copy the example file for local development:

```bash
cp .env.example .env.local
```

Then replace the placeholder endpoint:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

The endpoint is public client-side configuration, not a secret. Set the same variable in the Vercel project settings for Production, Preview, and Development as needed. Without it, the form displays a configuration message instead of attempting submission.

## Available scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Create the production build in dist/
npm run preview   # Preview the production build locally
```

## eBay listings widget

The live listing feed is mounted client-side in `EbayWidget` inside `src/App.jsx`. It uses:

- eBay user: `poke_otter`
- eBay site: `EBAY-GB`
- Layout: grid
- Maximum items: 100
- Provider: Auction Nudge

The external script writes into the single `auction-nudge-items` element and injects its own markup and styles. Do not add a second listings widget to the page. The provider warns that duplicate instances of the same widget can stop both widgets from loading.

The widget is third-party content and may be affected by network failures or ad blockers. The page therefore includes direct links to the full eBay shop as fallbacks. Listing prices, availability, feedback, and shipping details must remain live on eBay rather than being copied into static page content.

## Deploying to Vercel

1. Import the repository into Vercel.
2. Keep the framework preset as Vite, or use the detected defaults.
3. Set the `VITE_FORMSPREE_ENDPOINT` environment variable.
4. Deploy with the build command `npm run build` and output directory `dist`.

No `vercel.json` is required for this static Vite site. The canonical production URL is `https://pokeotter.jaamour.com/`.

## Content maintenance

- Update the live inventory through eBay, not in this repository.
- Keep the eBay UK URL and `EBAY-GB` widget setting aligned.
- Keep raw-card claims accurate: raw cards are pack-fresh, pulled by the seller, and immediately sleeved.
- Treat shipping, returns, and bundle offers as listing-level policy unless they are confirmed to apply to the whole shop.
- Keep the independent-seller disclaimer. Poke Otter is not affiliated with Nintendo, The Pokemon Company, Game Freak, or eBay.
- Replace the social preview image with a dedicated 1200x630 asset when the final brand artwork is ready.

## Validation

Before opening a pull request or deploying:

```bash
npm ci
npm run build
```

For visual changes, check the page at desktop and mobile widths and confirm that the eBay grid, direct eBay links, FAQ, and contact-form states still work.

There is currently no automated unit or end-to-end test suite. The CI workflow validates the production build; browser-level checks remain part of the review process.

## License

This repository is proprietary. See [`LICENSE`](./LICENSE). The Poke Otter branding, mascot artwork, copy, and storefront design may not be reused, redistributed, or relicensed without permission.
