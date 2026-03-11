import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import LP5LeadGeneration from '../pages/LP5LeadGeneration'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LP5LeadGeneration />
  </StrictMode>,
)
