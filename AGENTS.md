# Poke Otter Repository Guide

## Purpose

Poke Otter is a static React storefront for the independent `poke_otter` Pokemon card shop on eBay UK. The site is a marketing and browsing layer only. Visitors purchase through eBay; this repository does not contain checkout, accounts, a database, or a private API.

## Stack and commands

- React 19 with JSX.
- Vite 8.
- Plain CSS in `src/styles.css`; do not introduce a UI framework without a clear need.
- Node 22 is the recommended runtime. Use the version in `.nvmrc`.
- `npm run dev` starts local development.
- `npm run build` creates the deployable `dist/` directory.
- `npm run preview` serves the production build locally.
- CI uses `npm ci` followed by `npm run build`.

Always run `npm run build` after source, configuration, dependency, or metadata changes.

## Repository layout

- `src/App.jsx`: page structure, eBay widget integration, and Formspree form behavior.
- `src/main.jsx`: React entry point.
- `src/styles.css`: brand system, layout, responsive behavior, and widget overrides.
- `public/poke_otter.jpg`: mascot asset used by the page, favicon, and social metadata.
- `index.html`: document language, title, description, Open Graph metadata, and favicon.
- `.env.example`: documented public build-time environment configuration.

## Product and content rules

- This is an **eBay UK only** shop. Keep `https://www.ebay.co.uk/usr/poke_otter` and `EBAY-GB` consistent.
- The shop sells raw and graded Pokemon cards.
- Raw cards may be described as pack-fresh, pulled by the seller, and immediately sleeved.
- Royal Mail can be mentioned as a shipping method, but exact service, price, delivery, and returns terms belong to each live eBay listing unless the seller confirms a shop-wide policy.
- Do not hardcode changing listing prices, item availability, feedback counts, or inventory into the site.
- Preserve direct links to the eBay shop as a fallback for widget failures.
- Keep copy friendly, collector-focused, and concise. Avoid claims that are not confirmed by the seller.
- Keep the independent-seller disclaimer. Poke Otter is not affiliated with eBay, Nintendo, The Pokemon Company, or Game Freak.

## eBay widget constraints

The Free Seller Tools script is loaded client-side because it writes directly into the DOM. Keep the single `fst_listings` mount point and do not use `dangerouslySetInnerHTML` for the external script.

The current widget uses one grid feed with a maximum of 100 listings. Responsive columns are controlled by local CSS because the provider's injected styles do not reliably enforce the desired row count. Do not embed a second copy of the same listings widget on the page.

The provider's disclosure text and redirect behavior are external content. Do not remove or misrepresent it.

## Formspree configuration

The contact form reads `VITE_FORMSPREE_ENDPOINT` at build time. The value is public client-side configuration and belongs in `.env.local` for local development and Vercel environment settings for deployments. Never commit a real `.env.local` file.

When changing the form, preserve the success, error, missing-configuration, and honeypot states.

## Design rules

- Preserve the existing warm cream, red, brown, blue, and ink palette unless a deliberate redesign is requested.
- Keep the mascot prominent but avoid using the Pokemon logo as a shop logo.
- Maintain keyboard focus states, semantic headings, labelled form fields, visible link affordances, and reduced-motion support.
- Check desktop and mobile layouts after visual changes. The eBay grid should be four columns on desktop, three on tablet, and two on standard mobile widths.
- Prefer small, local changes over introducing new dependencies.

## Deployment

Vercel can deploy the repository using the detected Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`
- Required environment variable: `VITE_FORMSPREE_ENDPOINT`

No custom Vercel configuration is currently required. The final subdomain can be connected in the Vercel project settings.

## Change checklist

Before considering work complete:

1. Keep changes limited to the requested behavior.
2. Run `npm run build`.
3. Check the rendered page at desktop and mobile sizes when UI changes are involved.
4. Confirm eBay links, widget loading, FAQ behavior, and contact-form states.
5. Do not commit secrets, generated `dist/`, or `node_modules/`.
