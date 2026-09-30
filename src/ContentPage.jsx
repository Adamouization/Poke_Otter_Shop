import { EBAY_URL } from './pageData.js'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Poke Otter home">
        <span className="brand-mark"><img src="/poke_otter.jpg" alt="" /></span>
        <span><strong>Poke Otter</strong><small>eBay UK card shop</small></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Home</a>
      </nav>
      <a className="header-shop-link" data-analytics-location="content page header" href={EBAY_URL} target="_blank" rel="noreferrer">
        View eBay shop <ArrowUpRight />
      </a>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href="/" aria-label="Poke Otter home">
          <span className="brand-mark"><img src="/poke_otter.jpg" alt="" /></span>
          <span><strong>Poke Otter</strong><small>Otterly good finds.</small></span>
        </a>
        <p>Raw pulls and graded cards, listed on eBay UK.</p>
      </div>
      <div className="footer-links">
        <a data-analytics-location="content page footer" href={EBAY_URL} target="_blank" rel="noreferrer">eBay shop <ArrowUpRight /></a>
        <a href="/pokemon-cards-uk/">Raw Pokemon Cards</a>
        <a href="/graded-pokemon-cards-uk/">Graded cards</a>
        <a href="/guides/raw-vs-graded-pokemon-cards/">Guide</a>
      </div>
      <div className="footer-bottom">
        <span>Pokemon is a trademark of its respective owners. Poke Otter is an independent seller and is not affiliated with eBay, Nintendo, The Pokemon Company, or Game Freak.</span>
        <span>© {new Date().getFullYear()} Poke Otter</span>
      </div>
    </footer>
  )
}

function PageLink({ href, children }) {
  return <a className="text-link" href={href}>{children} <ArrowUpRight /></a>
}

function LandingPage({ page, graded = false }) {
  return (
    <>
      <section className="content-hero">
        <div className="section content-hero__inner">
          <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> {graded ? 'Graded cards in the UK' : 'Pokemon cards in the UK'}</p>
          <h1>{graded ? 'Graded Pokemon cards for UK collectors.' : 'A simple place to find your next Pokemon card.'}</h1>
          <p className="content-hero__lede">
            {graded
              ? 'Explore graded collector cards from Poke Otter, with the photos, condition, postage, and buying details shown on each eBay UK listing.'
              : 'Browse pack-fresh raw singles, holos, and graded collector finds from an independent seller on eBay UK.'}
          </p>
          <div className="hero-actions">
            <a className="button button--cream" data-analytics-location="content page hero" href={EBAY_URL} target="_blank" rel="noreferrer">Browse live listings <ArrowUpRight /></a>
            <a className="button button--ghost" href="/">Back to Poke Otter <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <main className="content-main">
        <div className="section content-layout">
          <article className="content-prose">
            {graded ? (
              <>
                <p className="eyebrow"><span className="eyebrow-dot" /> Collect with confidence</p>
                <h2>Graded cards ready for the collection.</h2>
                <p>Graded Pokemon cards are a good fit for collectors who want a card presented in a protective slab with its grading information visible. Poke Otter’s live eBay listings show the available card, label, condition, photos, price, and seller terms so you can check the details before buying.</p>
                <div className="content-card-grid">
                  <article className="content-card">
                    <span className="content-card__number">01</span>
                    <h3>Check the card and label</h3>
                    <p>Review the listing photos and confirm the Pokemon, set, card number, grading company, and grade shown in the listing.</p>
                  </article>
                  <article className="content-card">
                    <span className="content-card__number">02</span>
                    <h3>Compare the full details</h3>
                    <p>Look at the price, postage, estimated delivery, and return terms on the live eBay listing before purchasing.</p>
                  </article>
                  <article className="content-card">
                    <span className="content-card__number">03</span>
                    <h3>Choose what fits your collection</h3>
                    <p>A graded card can suit a display collection, a favourite Pokemon, or a card you want protected for the long term.</p>
                  </article>
                </div>
                <h2>Raw or graded? Both have a place.</h2>
                <p>Some collectors prefer the flexibility and lower entry point of raw Pokemon singles. Others want a graded card already protected and presented for display. There is no single right choice: start with the card you want and the way you plan to collect it.</p>
                <p><PageLink href="/guides/raw-vs-graded-pokemon-cards/">Read the raw versus graded collector guide</PageLink></p>
              </>
            ) : (
              <>
                <p className="eyebrow"><span className="eyebrow-dot" /> Find your next card</p>
                <h2>Pokemon singles for UK collectors.</h2>
                <p>Poke Otter is an independent Pokemon card seller on eBay UK. The shop focuses on pack-fresh raw singles, holos, and graded collector cards. The live inventory changes on eBay, so each listing is the right place to check current photos, condition, price, postage, and returns.</p>
                <div className="content-card-grid">
                  <article className="content-card">
                    <span className="content-card__number">01</span>
                    <h3>Pack-fresh raw cards</h3>
                    <p>Raw cards are pulled by the seller and sleeved immediately before being listed.</p>
                  </article>
                  <article className="content-card">
                    <span className="content-card__number">02</span>
                    <h3>Graded collector finds</h3>
                    <p>Find cards presented in protective slabs for collectors who enjoy display-ready pieces.</p>
                  </article>
                  <article className="content-card">
                    <span className="content-card__number">03</span>
                    <h3>Clear listing details</h3>
                    <p>Use the live eBay listing to review photographs, condition, postage, and buyer terms.</p>
                  </article>
                </div>
                <h2>How buying works</h2>
                <ol className="content-steps">
                  <li><span><strong>Browse the live shop.</strong> Find a Pokemon card that fits your collection.</span></li>
                  <li><span><strong>Read the listing carefully.</strong> Check photos, condition, price, postage, and terms.</span></li>
                  <li><span><strong>Complete the purchase on eBay UK.</strong> The transaction and buyer protection stay with eBay.</span></li>
                  <li><span><strong>Follow the order details.</strong> Keep the eBay order information handy for delivery and any questions.</span></li>
                </ol>
                <p><PageLink href="/graded-pokemon-cards-uk/">Explore graded Pokemon cards</PageLink></p>
              </>
            )}
          </article>
          <aside className="content-aside">
            <div className="content-aside__card">
              <img src="/poke_otter.jpg" alt="Poke Otter mascot" width="960" height="960" loading="lazy" />
              <p className="eyebrow"><span className="eyebrow-dot" /> Shop on eBay UK</p>
              <h2>See what is available today.</h2>
              <p>Prices, availability, photos, postage, and returns are kept current on each live listing.</p>
              <a className="button button--red" data-analytics-location="content page sidebar" href={EBAY_URL} target="_blank" rel="noreferrer">View the eBay shop <ArrowUpRight /></a>
            </div>
            <nav className="content-aside__links" aria-label="Explore Poke Otter">
              <strong>Explore more</strong>
              <a href="/pokemon-cards-uk/">Raw Pokemon Cards in the UK</a>
              <a href="/graded-pokemon-cards-uk/">Graded Pokemon cards</a>
              <a href="/guides/raw-vs-graded-pokemon-cards/">Raw vs graded guide</a>
            </nav>
          </aside>
        </div>
      </main>
    </>
  )
}

function GuidePage() {
  return (
    <>
      <section className="content-hero content-hero--guide">
        <div className="section content-hero__inner">
          <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> Collector guide</p>
          <h1>Raw vs graded Pokemon cards: how should you buy?</h1>
          <p className="content-hero__lede">The right choice depends on your budget, the card you want, and how you plan to enjoy your collection. Here is a practical way to compare both options.</p>
          <p className="content-byline"><time dateTime="2026-09-30">30 September 2026</time> · Poke Otter</p>
        </div>
      </section>

      <main className="content-main">
        <article className="section guide-layout">
          <div className="content-prose">
            <p className="eyebrow"><span className="eyebrow-dot" /> The short answer</p>
            <h2>Choose raw for flexibility, graded for protection and presentation.</h2>
            <p>Raw Pokemon cards are ungraded cards sold in their current condition. Graded cards have been assessed and are usually presented in a protective slab with the grading information shown on the label. Neither option is automatically better: the best choice is the one that matches the card and the reason you are collecting it.</p>

            <h2>When a raw Pokemon card may suit you</h2>
            <p>Raw cards can be a practical way to build a collection around particular Pokemon, sets, artwork, or card numbers. They can also make sense when you want to spend more of your budget on the card itself rather than on a graded presentation.</p>
            <ul>
              <li>You want to collect several cards or complete a theme.</li>
              <li>You enjoy examining the card directly in a sleeve or binder.</li>
              <li>You want to compare condition and price across individual listings.</li>
              <li>You are comfortable checking the seller’s photos and condition description carefully.</li>
            </ul>

            <h2>When a graded Pokemon card may suit you</h2>
            <p>Graded cards can be appealing when protection, display, and a recorded assessment are important to you. The slab gives the card a consistent presentation, while the listing’s photographs and details help you decide whether that particular card belongs in your collection.</p>
            <ul>
              <li>You want a display-ready card in a protective slab.</li>
              <li>You are collecting a favourite Pokemon or standout card.</li>
              <li>You want the grading company and grade visible with the card.</li>
              <li>You prefer to buy an already graded example rather than submit a raw card yourself.</li>
            </ul>

            <h2>Raw vs graded at a glance</h2>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th scope="col">Consideration</th><th scope="col">Raw card</th><th scope="col">Graded card</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Presentation</th><td>Sleeved or stored by the collector</td><td>Presented in a protective slab</td></tr>
                  <tr><th scope="row">Condition</th><td>Review listing photos and description</td><td>Review the grade, label, and listing photos</td></tr>
                  <tr><th scope="row">Best for</th><td>Binders, themes, and flexible collecting</td><td>Display pieces and protected favourites</td></tr>
                  <tr><th scope="row">Buying check</th><td>Inspect corners, edges, surface, and centring</td><td>Check the card, slab, label, and seller terms</td></tr>
                </tbody>
              </table>
            </div>

            <h2>What to check in any listing</h2>
            <ol className="content-steps">
              <li><span><strong>Identify the card.</strong> Confirm the Pokemon, set, card number, language, and rarity where shown.</span></li>
              <li><span><strong>Study the photographs.</strong> Look at the front and back, corners, edges, surface, or slab and label.</span></li>
              <li><span><strong>Read the condition and terms.</strong> The live listing is the source for the seller’s description, postage, delivery estimate, and returns.</span></li>
              <li><span><strong>Buy through the listing.</strong> Complete the transaction on eBay UK so the order stays within eBay’s process.</span></li>
            </ol>

            <div className="content-cta">
              <p className="eyebrow"><span className="eyebrow-dot" /> Ready to browse?</p>
              <h2>Find a card for your collection.</h2>
              <p>See Poke Otter’s current raw and graded Pokemon card listings on eBay UK.</p>
              <a className="button button--cream" data-analytics-location="guide call to action" href={EBAY_URL} target="_blank" rel="noreferrer">View live listings <ArrowUpRight /></a>
            </div>
          </div>
          <aside className="guide-aside">
            <nav className="content-aside__links" aria-label="Explore Poke Otter">
              <strong>More from Poke Otter</strong>
              <a href="/pokemon-cards-uk/">Raw Pokemon Cards in the UK</a>
              <a href="/graded-pokemon-cards-uk/">Graded Pokemon cards</a>
              <a href="/">Back to the live shop</a>
            </nav>
          </aside>
        </article>
      </main>
    </>
  )
}

export default function ContentPage({ page }) {
  const isGuide = page.type === 'Article'

  return (
    <div className="site-shell content-shell">
      <SiteHeader />
      {isGuide ? <GuidePage /> : <LandingPage page={page} graded={page.path.includes('graded')} />}
      <SiteFooter />
    </div>
  )
}
