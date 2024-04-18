import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const ws = new WebSocket( 'ws://127.0.0.1:3000' )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App ws={ws}/>
  </React.StrictMode>,
)
