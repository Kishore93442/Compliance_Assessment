import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDomains } from '../api'
import DomainCard from '../components/DomainCard'

export default function DomainList() {
  const [domains, setDomains] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getDomains()
      .then(res => setDomains(res.data))
      .catch(err => console.error('Error fetching domains:', err))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#3B0A0A]">
          Compliance Assessment Domains
        </h2>
        <button className="bg-gray-300 text-gray-700 text-sm font-medium px-6 py-2 rounded-lg hover:bg-gray-400">
          Submit
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-10">
        <p className="text-sm font-semibold text-[#3B0A0A]">Assessment Progress</p>
        <div className="w-full bg-gray-100 rounded-full h-3 mt-2">
          <div className="bg-[#3B0A0A] h-3 rounded-full w-[0%]"></div>
        </div>
        <p className="text-right text-sm font-medium mt-1">0%</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-start">
        {domains.length === 0 ? (
          <p>Loading domains...</p>
        ) : (
          domains.map(domain => (
            <DomainCard
              key={domain.id}
              domain={domain}
              onClick={() => navigate(`/domain/${domain.id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}
