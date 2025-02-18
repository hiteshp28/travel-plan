import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <BrowserRouter>
        <App />
        <Analytics /> {/* Move Analytics inside BrowserRouter or StrictMode */}
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
)
