import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import LP6DocumentAutomation from '../pages/LP6DocumentAutomation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LP6DocumentAutomation />
  </StrictMode>,
)
