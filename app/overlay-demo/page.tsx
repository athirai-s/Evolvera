'use client'

import { useState, useEffect } from 'react'

export default function OverlayDemo() {
  const [showNudge1, setShowNudge1] = useState(false)
  const [showNudge2, setShowNudge2] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowNudge1(true), 1000)
    const timer2 = setTimeout(() => setShowNudge2(true), 3000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Mock Document Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Smart Screen Guide Demo</h1>
        <p className="text-gray-700 mb-4">
          This page simulates a Chrome overlay coach that provides contextual AI suggestions
          as you work on documents. The nudges below demonstrate how AI could help in real-time.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 relative" id="writing-area">
          <h2 className="text-xl font-semibold mb-4">Sample Document</h2>
          <p className="mb-4">
            I am writing a important business proposal that needs to be reviewed by the board
            of directors next week. This proposal will outline our company's strategy for the
            upcoming quarter and include financial projections.
          </p>
          <p className="mb-4">
            The proposal should cover market analysis, competitive positioning, and resource
            allocation. We also need to address potential risks and mitigation strategies.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 relative" id="table-area">
          <h3 className="text-lg font-semibold mb-4">Quarterly Sales Data</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Region</th>
                <th className="text-left p-2">Q1 Sales</th>
                <th className="text-left p-2">Q2 Sales</th>
                <th className="text-left p-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">North America</td>
                <td className="p-2">$125,000</td>
                <td className="p-2">$142,000</td>
                <td className="p-2">+13.6%</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Europe</td>
                <td className="p-2">$98,500</td>
                <td className="p-2">$108,200</td>
                <td className="p-2">+9.8%</td>
              </tr>
              <tr>
                <td className="p-2">Asia Pacific</td>
                <td className="p-2">$67,300</td>
                <td className="p-2">$78,900</td>
                <td className="p-2">+17.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Nudge 1: Writing Assistant */}
      {showNudge1 && (
        <div className="fixed top-20 right-8 z-50 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 max-w-sm relative">
            <div className="absolute -left-2 top-6 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45"></div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Writing Detected</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Looks like you're writing—try Grammarly here for instant grammar and style suggestions.
                </p>
                <div className="flex space-x-2">
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                    Try Grammarly
                  </button>
                  <button 
                    onClick={() => setShowNudge1(false)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nudge 2: Table Analysis */}
      {showNudge2 && (
        <div className="fixed bottom-32 left-8 z-50 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 max-w-sm relative">
            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">Table Spotted</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Have a table? Send to Gemini for a 30-sec summary and key insights.
                </p>
                <div className="flex space-x-2">
                  <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                    Analyze Table
                  </button>
                  <button 
                    onClick={() => setShowNudge2(false)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}