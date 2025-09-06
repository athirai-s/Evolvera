'use client'

import { useState, useEffect } from 'react'
import CourseRecommendations from '@/components/CourseRecommendations'

const popularTopics = [
  'ChatGPT',
  'AI',
  'Machine Learning',
  'Data Analysis',
  'Automation',
  'Prompt Engineering',
  'Python',
  'Excel',
  'Digital Marketing',
  'UX Design'
]

const commonRoles = [
  'Accountant',
  'Marketer',
  'Designer',
  'Developer',
  'Teacher',
  'Nurse',
  'Sales',
  'Product Manager',
  'Data Analyst',
  'Engineer',
  'Researcher',
  'Founder'
]

export default function CoursesPage() {
  const [selectedTopic, setSelectedTopic] = useState('ChatGPT')
  const [selectedRole, setSelectedRole] = useState('Accountant')
  const [customTopic, setCustomTopic] = useState('')
  const [customRole, setCustomRole] = useState('')
  
  const currentTopic = customTopic.trim() || selectedTopic
  const currentRole = customRole.trim() || selectedRole

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎯 Course Recommendations
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best courses from top learning platforms, personalized for your role and interests.
          Choose from Udemy, Coursera, LinkedIn Learning, Skillshare, and more.
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customize Your Recommendations</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Topic Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">What do you want to learn?</h3>
            
            {/* Popular Topics */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Popular Topics:</p>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSelectedTopic(topic)
                      setCustomTopic('')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTopic === topic && !customTopic.trim()
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Topic Input */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Or enter your own topic:</p>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value)
                  if (e.target.value.trim()) {
                    setSelectedTopic('')
                  }
                }}
                placeholder="e.g., Blockchain, React, Photography..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's your role?</h3>
            
            {/* Common Roles */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Common Roles:</p>
              <div className="flex flex-wrap gap-2">
                {commonRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setSelectedRole(role)
                      setCustomRole('')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedRole === role && !customRole.trim()
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Role Input */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Or enter your own role:</p>
              <input
                type="text"
                value={customRole}
                onChange={(e) => {
                  setCustomRole(e.target.value)
                  if (e.target.value.trim()) {
                    setSelectedRole('')
                  }
                }}
                placeholder="e.g., Content Creator, Lawyer, Chef..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Current Selection Display */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <p className="text-center text-gray-700">
            <span className="font-medium">Currently showing courses:</span>{' '}
            <span className="font-semibold text-purple-700">{currentTopic}</span> for{' '}
            <span className="font-semibold text-pink-700">{currentRole}</span>
          </p>
        </div>
      </div>

      {/* Course Recommendations */}
      <CourseRecommendations
        topic={currentTopic}
        role={currentRole}
        className="mb-8"
      />

      {/* Platform Information */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          📚 Courses from Top Learning Platforms
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Our recommendations include courses from the most trusted online learning platforms
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'Udemy', color: 'bg-purple-100 text-purple-800', description: 'Practical skills & tutorials' },
            { name: 'Coursera', color: 'bg-blue-100 text-blue-800', description: 'University-level courses' },
            { name: 'LinkedIn Learning', color: 'bg-indigo-100 text-indigo-800', description: 'Professional development' },
            { name: 'Skillshare', color: 'bg-green-100 text-green-800', description: 'Creative skills & design' },
            { name: 'YouTube', color: 'bg-red-100 text-red-800', description: 'Free tutorials & guides' },
            { name: 'edX', color: 'bg-gray-100 text-gray-800', description: 'Academic courses' },
            { name: 'Pluralsight', color: 'bg-orange-100 text-orange-800', description: 'Technology training' }
          ].map((platform) => (
            <div
              key={platform.name}
              className={`${platform.color} px-4 py-2 rounded-xl text-center`}
            >
              <div className="font-medium">{platform.name}</div>
              <div className="text-xs opacity-75 mt-1">{platform.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}