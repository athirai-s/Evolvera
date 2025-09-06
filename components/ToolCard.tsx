import { useState } from 'react'
import { Tool, Course } from '@/types'

interface ToolCardProps {
  tool: Tool
  persona?: string
  role?: string
}

const categoryEmojis: Record<string, string> = {
  writing: '✍️',
  productivity: '⚡',
  data: '📊',
  design: '🎨',
  video: '🎥',
  voice: '🎤',
  meeting: '🤝',
  automation: '🤖',
  research: '🔍'
}

const platformColors: Record<string, string> = {
  YouTube: 'bg-red-100 text-red-800',
  Coursera: 'bg-blue-100 text-blue-800',
  Udemy: 'bg-purple-100 text-purple-800',
  edX: 'bg-green-100 text-green-800',
  'LinkedIn Learning': 'bg-indigo-100 text-indigo-800',
  Skillshare: 'bg-orange-100 text-orange-800',
  Pluralsight: 'bg-pink-100 text-pink-800'
}

export default function ToolCard({ tool, persona, role }: ToolCardProps) {
  const [courses, setCourses] = useState<Course[]>(tool.courses || [])
  const [coursesLoaded, setCoursesLoaded] = useState(!!tool.courses)
  const [loadingCourses, setLoadingCourses] = useState(false)
  const [showCourses, setShowCourses] = useState(false)

  const fetchCourses = async () => {
    if (coursesLoaded || loadingCourses) return
    
    setLoadingCourses(true)
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: tool.name,
          persona,
          role
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses)
        setCoursesLoaded(true)
      } else {
        console.error('Failed to fetch courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoadingCourses(false)
    }
  }

  const handleCoursesToggle = () => {
    if (!showCourses) {
      setShowCourses(true)
      fetchCourses()
    } else {
      setShowCourses(false)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-purple-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">{tool.name}</h3>
        <div className="text-3xl opacity-80">{categoryEmojis[tool.category] || '🛠'}</div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.why}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">✨ Quick tasks:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {tool.learn_tasks.slice(0, 3).map((task, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2 flex-shrink-0"></span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <button
          onClick={handleCoursesToggle}
          className="w-full text-left text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between hover:text-purple-600 transition-colors"
        >
          <span>📚 Learn from courses:</span>
          <span className={`transition-transform ${showCourses ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {showCourses && (
          <div className="space-y-2">
            {loadingCourses ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="ml-2 text-sm text-gray-600">Finding courses...</span>
              </div>
            ) : courses.length > 0 ? (
              courses.map((course, index) => (
                <a
                  key={index}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-800 truncate pr-2">{course.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${platformColors[course.platform] || 'bg-gray-100 text-gray-800'}`}>
                      {course.platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{course.rating}</span>
                    </div>
                    <span>{course.duration}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                No courses found. Try the official documentation.
              </div>
            )}
          </div>
        )}
      </div>
      
      <a
        href={tool.quick_start_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-md hover:shadow-lg"
      >
        Try Now ✨
      </a>
    </div>
  )
}