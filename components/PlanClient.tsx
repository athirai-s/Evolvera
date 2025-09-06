'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'
import ToolCard from '@/components/ToolCard'
import NewsItem from '@/components/NewsItem'
import PersonaInsightCard from '@/components/PersonaInsightCard'
import ActionableAdvice from '@/components/ActionableAdvice'
import { ToolsResponse, NewsResponse, Tool, NewsItem as NewsItemType } from '@/types'

export default function PlanClient() {
  const [tools, setTools] = useState<Tool[]>([])
  const [news, setNews] = useState<NewsItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const persona = searchParams.get('persona')
  const role = searchParams.get('role')

  useEffect(() => {
    if (!persona || !role) {
      router.push('/')
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [toolsResponse, newsResponse] = await Promise.all([
          fetch('/api/tools', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ persona, role }),
          }),
          fetch('/api/news')
        ])

        if (!toolsResponse.ok) {
          throw new Error(`Tools API error: ${toolsResponse.status}`)
        }

        if (!newsResponse.ok) {
          throw new Error(`News API error: ${newsResponse.status}`)
        }

        const [toolsData, newsData]: [ToolsResponse, NewsResponse] = await Promise.all([
          toolsResponse.json(),
          newsResponse.json()
        ])

        setTools(toolsData.tools)
        setNews(newsData.items)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [persona, role, router])

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            🚀 Your AI-Powered Journey
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Curating personalized AI tools and insights just for you...
          </p>
        </div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            ⚠️ Something Went Wrong
          </h1>
          <p className="text-red-600 text-lg mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="rounded-full px-8 py-4 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          🚀 Your AI-Powered Journey
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Here are the perfect AI tools curated specifically for your needs as a <span className="font-medium text-purple-600">{role}</span>.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              🛠️ Recommended AI Tools
            </h2>
            <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full border border-purple-100">
              {tools.length} tools found
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Persona Insights */}
          <PersonaInsightCard persona={persona!} />

          {/* Actionable Advice */}
          <ActionableAdvice persona={persona!} role={role!} />

          {/* AI News */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
              📰 Latest AI News
            </h3>
            <div className="space-y-4">
              {news.slice(0, 5).map((item, index) => (
                <NewsItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              🎯 Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/')}
                className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 border border-purple-100 hover:border-purple-200"
              >
                <div className="font-medium text-gray-900">🔄 Try Different Persona</div>
                <div className="text-sm text-gray-600">Explore tools for other roles</div>
              </button>
              <button 
                onClick={() => router.push(`/role?persona=${persona}`)}
                className="w-full text-left px-4 py-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 border border-purple-100 hover:border-purple-200"
              >
                <div className="font-medium text-gray-900">💼 Change Role</div>
                <div className="text-sm text-gray-600">Update your profession</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}