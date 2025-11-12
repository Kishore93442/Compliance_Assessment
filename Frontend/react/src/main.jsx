import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import DomainList from './pages/DomainList'
import DomainQuestions from './pages/DomainQuestions'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DomainList />} />
          <Route path="domain/:id" element={<DomainQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
