import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mount Google Tag Manager container when VITE_GTM_ID is provided.
const gtmId = import.meta.env.VITE_GTM_ID
if (gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId)) {
  const win = window as unknown as { dataLayer?: unknown[] }
  win.dataLayer = win.dataLayer || []
  win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
  document.head.appendChild(script)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
