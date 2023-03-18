import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
