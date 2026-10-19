import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { trackVisit } from './track'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

trackVisit()