'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'
import ToolCard from '@/components/ToolCard'
import NewsItem from '@/components/NewsItem'
import PersonaInsightCard from '@/components/PersonaInsightCard'
import { ToolsResponse, NewsResponse, Tool, NewsItem as NewsItemType } from '@/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Plan() {
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
    fetchData()
  }, [persona, role, router])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [toolsResponse, newsResponse] = await Promise.all([
        fetch('/api/tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ persona, role })
        }),
        fetch('/api/news')
      ])

      if (!toolsResponse.ok) {
        throw new Error('Failed to fetch tools')
      }

      const toolsData: ToolsResponse = await toolsResponse.json()
      setTools(toolsData.tools)

      if (newsResponse.ok) {
        const newsData: NewsResponse = await newsResponse.json()
        setNews(newsData.items.slice(0, 10))
      }

    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load recommendations')
      
      // Fallback tools based on role
      const fallbackTools = getFallbackTools(role!)
      setTools(fallbackTools)
    } finally {
      setLoading(false)
    }
  }

  const getFallbackTools = (role: string): Tool[] => {
    const fallbackTools: Tool[] = [
      {
        name: 'ChatGPT',
        category: 'writing',
        why: 'Most popular AI assistant for writing, coding, and problem-solving across all professions',
        quick_start_url: 'https://chat.openai.com',
        learn_tasks: ['Write professional emails', 'Generate creative content', 'Debug code', 'Research topics']
      },
      {
        name: 'Claude AI',
        category: 'writing',
        why: 'Advanced AI assistant excelling at analysis, writing, and complex reasoning tasks',
        quick_start_url: 'https://claude.ai',
        learn_tasks: ['Analyze documents', 'Write technical content', 'Code review', 'Strategic planning']
      },
      {
        name: 'Midjourney',
        category: 'design',
        why: 'Leading AI image generation tool for creating stunning visuals and artwork',
        quick_start_url: 'https://midjourney.com',
        learn_tasks: ['Generate concept art', 'Create marketing visuals', 'Design logos', 'Produce illustrations']
      },
      {
        name: 'GitHub Copilot',
        category: 'productivity',
        why: 'AI code completion tool that accelerates development across programming languages',
        quick_start_url: 'https://github.com/features/copilot',
        learn_tasks: ['Auto-complete code', 'Generate functions', 'Write tests', 'Debug issues']
      },
      {
        name: 'Runway ML',
        category: 'video',
        why: 'Cutting-edge AI video generation and editing platform for content creators',
        quick_start_url: 'https://runwayml.com',
        learn_tasks: ['Generate video clips', 'Remove backgrounds', 'Create animations', 'Edit footage']
      },
      {
        name: 'Gemini AI',
        category: 'research',
        why: 'Google\'s multimodal AI for advanced research, analysis, and creative tasks',
        quick_start_url: 'https://gemini.google.com',
        learn_tasks: ['Analyze data', 'Research topics', 'Process documents', 'Generate insights']
      },
      {
        name: 'Perplexity AI',
        category: 'research',
        why: 'AI-powered search engine that provides accurate answers with source citations',
        quick_start_url: 'https://perplexity.ai',
        learn_tasks: ['Research topics', 'Fact-check information', 'Generate reports', 'Find sources']
      },
      {
        name: 'Notion AI',
        category: 'productivity',
        why: 'Integrated AI assistant within Notion for enhanced note-taking and content creation',
        quick_start_url: 'https://notion.so',
        learn_tasks: ['Generate content', 'Summarize notes', 'Create templates', 'Organize projects']
      }
    ]

    return fallbackTools
  }


  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          🎯 Your AI Toolkit
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Personalized AI tools for {persona} working as {role}
        </p>
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-4 max-w-md mx-auto">
            <p className="text-yellow-800 text-sm">{error}. Showing fallback recommendations.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              🤖 AI Tools & Learning Resources
              <span className="ml-3 text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {tools.length} tools
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} persona={persona || ''} role={role || ''} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">📰 Latest AI Updates</h2>
            {news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item, index) => (
                  <NewsItem key={index} item={item} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <p className="text-gray-600">We'll fetch news again soon.</p>
              </div>
            )}
          </section>
        </div>

        <div className="xl:col-span-1">
          <PersonaInsightCard persona={persona!} />
        </div>
      </div>
    </div>
  )
}