import { useEffect, useRef, useState } from 'react'

const EBAY_URL = 'https://www.ebay.co.uk/usr/poke_otter'
const AUCTION_NUDGE_URL =
  'https://www.auctionnudge.com/feed/item/js/theme/unstyled/img_size/500/show_logo/0/SellerID/poke_otter/siteid/3/MaxEntries/100/page/init'
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" />
    </svg>
  )
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 1 1.7 7.3L21 10l-7.3 1.7L12 19l-1.7-7.3L3 10l7.3-1.7L12 1Zm7.2 15.5.7 2.8 2.8.7-2.8.7-.7 2.8-.7-2.8-2.8-.7 2.8-.7.7-2.8Z" />
    </svg>
  )
}

function EbayWidget() {
  const [status, setStatus] = useState('loading')
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    let active = true
    const previousCallback = window.auction_nudge_loaded
    window.auction_nudge_loaded = (data) => {
      if (!active) return
      previousCallback?.(data)
      if (!data || data.target_div_id === 'auction-nudge-items') setStatus('ready')
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = AUCTION_NUDGE_URL
    script.async = true
    script.onerror = () => {
      if (active) setStatus('error')
    }
    container.appendChild(script)

    // Auction Nudge normally waits for window.load. Handle a late mount too.
    script.onload = () => {
      if (active && document.readyState === 'complete' && window.AN_Item_items?.ready) {
        window.AN_Item_items.ready()
      }
    }

    return () => {
      active = false
      if (window.auction_nudge_loaded === previousCallback) {
        delete window.auction_nudge_loaded
      } else {
        window.auction_nudge_loaded = previousCallback
      }
      script.remove()
      const listings = document.getElementById('auction-nudge-items')
      if (listings) listings.innerHTML = ''
    }
  }, [])

  return (
    <div className="widget-frame">
      {status === 'loading' && (
        <div className="widget-loading" role="status">
          <span className="loader-orb" />
          <p>Fetching the latest Poke Otter listings...</p>
        </div>
      )}
      <div ref={mountRef} aria-live="polite">
        <div id="auction-nudge-items" className="auction-nudge" />
      </div>
      {status === 'error' && (
        <div className="widget-fallback">
          <p>The live listing feed is taking a breather.</p>
          <a className="text-link" href={EBAY_URL} target="_blank" rel="noreferrer">
            Browse the shop directly on eBay <ArrowUpRight />
          </a>
        </div>
      )}
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!FORMSPREE_ENDPOINT) {
      setStatus('missing')
      return
    }

    setStatus('sending')
    const form = event.currentTarget

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New Poke Otter enquiry" />
      <label className="honeypot" aria-hidden="true">
        Do not fill this field
        <input name="_gotcha" tabIndex="-1" autoComplete="off" />
      </label>
      <div className="form-grid">
        <label>
          Your name
          <input type="text" name="name" placeholder="Ash Ketchum" required />
        </label>
        <label>
          Email address
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows="5" placeholder="Ask about a card, an order, or anything else..." required />
      </label>
      <div className="form-actions">
        <button className="button button--red" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'} <ArrowUpRight />
        </button>
        {status === 'success' && <p className="form-note form-note--success">Message sent. We will be in touch.</p>}
        {status === 'missing' && <p className="form-note">Add the Formspree endpoint in Vercel to turn this form on.</p>}
        {status === 'error' && <p className="form-note form-note--error">Something went wrong. Please try again.</p>}
      </div>
    </form>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Poke Otter home">
          <span className="brand-mark">
            <img src="/poke_otter.jpg" alt="" />
          </span>
          <span>
            <strong>Poke Otter</strong>
            <small>eBay UK card shop</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#care">Card care</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-shop-link" href={EBAY_URL} target="_blank" rel="noreferrer">
          View eBay shop <ArrowUpRight />
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> eBay UK only</p>
            <h1>Find your next favourite card.</h1>
            <p className="hero-intro">
              Fresh pulls, graded grails, and otterly good finds for Pokemon collectors. Browse the live shop and check out securely through eBay UK.
            </p>
            <div className="hero-actions">
              <a className="button button--cream" href="#shop">Browse latest cards <ArrowDown /></a>
              <a className="button button--ghost" href={EBAY_URL} target="_blank" rel="noreferrer">Go to eBay <ArrowUpRight /></a>
            </div>
            <div className="hero-footnote"><Spark /> Raw + graded cards <span /> Royal Mail postage</div>
          </div>
          <div className="hero-art" aria-label="Poke Otter mascot holding a Pokemon card">
            <div className="hero-sun" />
            <div className="hero-card hero-card--back" />
            <div className="hero-card hero-card--front"><span>POKE<br />OTTER</span></div>
            <div className="mascot-frame">
              <img src="/poke_otter.jpg" alt="Poke Otter mascot holding a Pokemon card" />
            </div>
            <div className="art-sticker"><span>LIVE</span><strong>on eBay</strong><small>UK</small></div>
          </div>
        </section>

        <div className="ticker" aria-label="Shop highlights">
          <span>POKEMON TCG</span><i />
          <span>RAW + GRADED</span><i />
          <span>PACK-FRESH PULLS</span><i />
          <span>ROYAL MAIL</span><i />
          <span>EBAY UK</span>
        </div>

        <section className="section listings-section" id="shop">
          <div className="section-heading section-heading--listings">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> The live shop</p>
              <h2>Current cards, straight from eBay.</h2>
              <p className="section-lede">The inventory below updates from the Poke Otter eBay shop. Tap a card to see its full photos, condition, postage, and buying details.</p>
            </div>
            <a className="text-link" href={EBAY_URL} target="_blank" rel="noreferrer">See all listings <ArrowUpRight /></a>
          </div>
          <EbayWidget />
        </section>

        <section className="care-section" id="care">
          <div className="section care-intro">
            <div className="care-art">
              <div className="care-label">THE OTTER<br />STANDARD</div>
              <img src="/poke_otter.jpg" alt="Poke Otter mascot" />
            </div>
            <div className="care-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> A little about the shop</p>
              <h2>Good cards deserve good care.</h2>
              <p>Every raw card listed by Poke Otter is pack-fresh, pulled by me, and immediately sleeved. Alongside fresh pulls, you will find graded cards for collectors who like their favourites protected and ready for display.</p>
              <a className="text-link" href={EBAY_URL} target="_blank" rel="noreferrer">Meet the shop on eBay <ArrowUpRight /></a>
            </div>
          </div>
          <div className="section standards-grid">
            <article className="standard-card standard-card--red">
              <span className="standard-number">01</span>
              <div className="standard-icon"><Spark /></div>
              <h3>Pack-fresh raw cards</h3>
              <p>Fresh from the pack, handled carefully, and sleeved immediately.</p>
            </article>
            <article className="standard-card standard-card--blue">
              <span className="standard-number">02</span>
              <div className="standard-icon">PSA</div>
              <h3>Raw and graded finds</h3>
              <p>Pick up a new pull or find a graded card worthy of the collection.</p>
            </article>
            <article className="standard-card standard-card--cream">
              <span className="standard-number">03</span>
              <div className="standard-icon"><ArrowUpRight /></div>
              <h3>Shop through eBay UK</h3>
              <p>Full listing details, eBay buyer protection, and Royal Mail postage options.</p>
            </article>
          </div>
        </section>

        <section className="section process-section">
          <div className="section-heading section-heading--centered">
            <p className="eyebrow"><span className="eyebrow-dot" /> Simple as a Pokeball</p>
            <h2>Find it. Love it. Add to basket.</h2>
          </div>
          <div className="process-grid">
            <div className="process-step"><span>01</span><h3>Browse</h3><p>Explore the live listings and find a card that catches your eye.</p></div>
            <div className="process-step"><span>02</span><h3>Check the details</h3><p>See the listing photos, condition, price, postage, and seller terms.</p></div>
            <div className="process-step"><span>03</span><h3>Buy on eBay</h3><p>Complete your purchase through eBay UK and wait for your next favourite card.</p></div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section faq-layout">
            <div className="faq-heading">
              <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> Questions, answered</p>
              <h2>Before you make room in the binder.</h2>
              <p>Need something more specific? Send a message and ask about a card, a listing, or an order.</p>
              <a className="button button--cream" href="#contact">Ask a question <ArrowDown /></a>
            </div>
            <div className="faq-list">
              <details open>
                <summary>What does Poke Otter sell?<span>+</span></summary>
                <p>Pokemon TCG cards on eBay UK, including pack-fresh raw singles, holos, and graded collector cards.</p>
              </details>
              <details>
                <summary>How are raw cards handled?<span>+</span></summary>
                <p>Raw cards are pack-fresh, pulled by me, and immediately sleeved before they are listed.</p>
              </details>
              <details>
                <summary>How does postage work?<span>+</span></summary>
                <p>Listings use Royal Mail postage options. The exact service, price, and estimated delivery date are shown on each eBay listing.</p>
              </details>
              <details>
                <summary>What about returns?<span>+</span></summary>
                <p>Returns and buyer-protection terms are shown on each listing. Please check the listing details before purchasing.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-heading">
            <p className="eyebrow"><span className="eyebrow-dot" /> Come say hello</p>
            <h2>Looking for a particular card?</h2>
            <p>Ask about a listing, a card, or your order. The contact form will connect to the shop once the Formspree endpoint is configured.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark"><img src="/poke_otter.jpg" alt="" /></span>
            <span><strong>Poke Otter</strong><small>Otterly good finds.</small></span>
          </a>
          <p>Raw pulls and graded cards, listed on eBay UK.</p>
        </div>
        <div className="footer-links">
          <a href={EBAY_URL} target="_blank" rel="noreferrer">eBay shop <ArrowUpRight /></a>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-bottom">
          <span>Pokemon is a trademark of its respective owners. Poke Otter is an independent seller.</span>
          <span>© {new Date().getFullYear()} Poke Otter</span>
        </div>
      </footer>
    </div>
  )
}

export default App
