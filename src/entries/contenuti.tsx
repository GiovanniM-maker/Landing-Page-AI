import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import LP2ContentMachine from '../pages/LP2ContentMachine'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LP2ContentMachine />
  </StrictMode>,
)
