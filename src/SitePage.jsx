import App from './App.jsx'
import AnalyticsTracking from './AnalyticsTracking.jsx'
import ContentPage from './ContentPage.jsx'
import { getPageDefinition } from './pageData.js'

export default function SitePage({ pathname = '/' }) {
  const page = getPageDefinition(pathname)

  return (
    <>
      <AnalyticsTracking />
      {page.path === '/' ? <App /> : <ContentPage page={page} />}
    </>
  )
}
