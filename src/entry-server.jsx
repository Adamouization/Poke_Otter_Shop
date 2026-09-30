import { renderToString } from 'react-dom/server'
import SitePage from './SitePage.jsx'

export function render(pathname = '/') {
  return renderToString(<SitePage pathname={pathname} />)
}
