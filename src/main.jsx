import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import SitePage from './SitePage.jsx'
import './styles.css'

const rootElement = document.getElementById('root')
const app = (
  <StrictMode>
    <SitePage pathname={window.location.pathname} />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
