import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'

import { WeatherApp } from './pages/WeatherApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
)
