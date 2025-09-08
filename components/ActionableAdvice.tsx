'use client'

import { useState, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { AdviceResponse, AdviceItem } from '@/types'
import { toTitleCase } from '@/lib/utils'

interface ActionableAdviceProps {
  persona: string
  role: string
}

export default function ActionableAdvice({ persona, role }: ActionableAdviceProps) {
  const [advice, setAdvice] = useState<AdviceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/advice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ persona, role }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch advice: ${response.status}`)
        }

        const data: AdviceResponse = await response.json()
        setAdvice(data.advice)
      } catch (err) {
        console.error('Error fetching advice:', err)
        setError(err instanceof Error ? err.message : 'Failed to load advice')
      } finally {
        setLoading(false)
      }
    }

    fetchAdvice()
  }, [persona, role])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
          💡 Actionable AI Advice
        </h3>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
          💡 Actionable AI Advice
        </h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center">
        💡 Actionable AI Advice for {toTitleCase(role)}
      </h3>
      
      <div className="space-y-6">
        {advice.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ⏱️ {item.timeEstimate}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">📋 Steps to follow:</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {item.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="border-t pt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">🛠️ Recommended tools:</h5>
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool, toolIndex) => (
                  <span key={toolIndex} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}