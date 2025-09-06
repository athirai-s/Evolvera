import { useState, useEffect } from 'react'
import { Course } from '@/types'

interface CourseRecommendationsProps {
  topic: string
  role: string
  className?: string
}

interface CourseCardProps {
  course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Udemy': return 'bg-purple-100 text-purple-800'
      case 'Coursera': return 'bg-blue-100 text-blue-800'
      case 'LinkedIn Learning': return 'bg-indigo-100 text-indigo-800'
      case 'Skillshare': return 'bg-green-100 text-green-800'
      case 'YouTube': return 'bg-red-100 text-red-800'
      case 'edX': return 'bg-gray-100 text-gray-800'
      case 'Pluralsight': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">★</span>
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      )
    }

    return stars
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {getRatingStars(course.rating)}
              <span className="ml-1 text-sm text-gray-600">
                {course.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{course.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(course.platform)}`}>
          {course.platform}
        </span>
        
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          View Course
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CourseRecommendations({ topic, role, className = '' }: CourseRecommendationsProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  const platforms = ['all', 'Udemy', 'Coursera', 'LinkedIn Learning', 'Skillshare', 'YouTube', 'edX', 'Pluralsight']

  useEffect(() => {
    fetchCourses()
  }, [topic, role, selectedPlatform])

  const fetchCourses = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        topic,
        role,
        maxResults: '8',
        minRating: '3.5'
      })

      if (selectedPlatform !== 'all') {
        params.append('platform', selectedPlatform)
      }

      const response = await fetch(`/api/courses/search?${params}`)
      const data = await response.json()

      if (data.success) {
        setCourses(data.data)
      } else {
        setError(data.error || 'Failed to fetch courses')
      }
    } catch (err) {
      setError('Failed to load courses')
      console.error('Error fetching courses:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = selectedPlatform === 'all' 
    ? courses 
    : courses.filter(course => course.platform === selectedPlatform)

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {topic} Courses for {role}
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <h3 className="text-lg font-medium text-red-900 mb-1">Unable to Load Courses</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchCourses}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">📚</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {topic} Courses for {role}
          </h2>
        </div>

        <div className="text-sm text-gray-600">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedPlatform === platform
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {platform === 'all' ? 'All Platforms' : platform}
          </button>
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Courses Found</h3>
          <p className="text-gray-600">Try adjusting your platform filter or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={`${course.url}-${index}`} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}