import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px 60px' }}>
      <header style={{ background: '#4B0E0E', color: 'white', padding: 20, borderRadius: 8 }}>
        <h1>Compliance Assessment</h1>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}
