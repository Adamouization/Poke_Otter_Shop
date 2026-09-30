import { useEffect } from 'react'

export default function AnalyticsTracking() {
  useEffect(() => {
    function handleDocumentClick(event) {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href^="https://www.ebay.co.uk/"]')
      if (!link || typeof window.gtag !== 'function') return

      window.gtag('event', 'ebay_shop_click', {
        link_location: link.dataset.analyticsLocation || link.textContent.trim().slice(0, 40),
      })
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  return null
}
