import React from 'react'

export default function DomainCard({ domain, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #ddd',
        padding: 16,
        borderRadius: 10,
        width: '30%',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        background: 'white',
      }}
    >
      <h3>{domain.name}</h3>
      <p>{domain.description}</p>
      <button style={{
        marginTop: 8,
        background: '#4B0E0E',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        padding: '6px 12px',
        cursor: 'pointer',
      }}>
        Start
      </button>
    </div>
  )
}
