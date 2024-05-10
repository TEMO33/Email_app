import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx'
import { Router } from 'react-router-dom'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
)
