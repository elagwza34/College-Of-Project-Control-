import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

type AnalyticsWindow = Window & { dataLayer?: unknown[]; ENV_GTM_ID?: string }

const analyticsWindow = window as AnalyticsWindow
analyticsWindow.dataLayer = analyticsWindow.dataLayer || []

// Mount Google Tag Manager container when a valid GTM ID is provided.
const gtmId = String(import.meta.env.VITE_GTM_ID || analyticsWindow.ENV_GTM_ID || '').trim()
if (/^GTM-[A-Z0-9]+$/i.test(gtmId)) {
  analyticsWindow.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
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
