'use client'

import { useState } from 'react'
import { Tool, TimeEntry } from '@/types'

interface TimeTrackerCardProps {
  tools: Tool[]
  timeEntries: TimeEntry[]
  onAddEntry: (entry: Omit<TimeEntry, 'id' | 'date'>) => void
}

export default function TimeTrackerCard({ tools, timeEntries, onAddEntry }: TimeTrackerCardProps) {
  const [selectedTool, setSelectedTool] = useState('')
  const [minutes, setMinutes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTool && minutes && parseInt(minutes) > 0) {
      onAddEntry({
        tool: selectedTool,
        minutes: parseInt(minutes)
      })
      setSelectedTool('')
      setMinutes('')
    }
  }

  const totalMinutes = timeEntries.reduce((sum, entry) => sum + entry.minutes, 0)
  const toolUsage = timeEntries.reduce((acc, entry) => {
    acc[entry.tool] = (acc[entry.tool] || 0) + entry.minutes
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">⏱ Time Tracker</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <select
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
            required
          >
            <option value="">Select a tool</option>
            {tools.map((tool) => (
              <option key={tool.name} value={tool.name}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes spent"
            min="1"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-sm"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          Add Entry
        </button>
      </form>

      {timeEntries.length > 0 && (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Total time: <span className="font-medium">{totalMinutes} minutes</span>
            </p>
          </div>
          
          <div className="space-y-2">
            {Object.entries(toolUsage).map(([tool, mins]) => {
              const percentage = (mins / totalMinutes) * 100
              return (
                <div key={tool} className="text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 truncate">{tool}</span>
                    <span className="text-gray-500 flex-shrink-0">{mins}m</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-black h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}