import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import LP3CustomerService from '../pages/LP3CustomerService'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LP3CustomerService />
  </StrictMode>,
)
