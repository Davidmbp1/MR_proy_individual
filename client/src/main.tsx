import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos App en BrowserRouter para que funcione React Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
