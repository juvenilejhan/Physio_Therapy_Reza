import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Gates the scroll-reveal styles. Elements only start at opacity 0 once we know
// JS is running to reveal them again — see .js-enabled .reveal in animations.css.
document.documentElement.classList.add('js-enabled')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
