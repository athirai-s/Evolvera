import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { NewsResponseSchema, NewsItem } from '@/types'

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Pathify-AI/1.0'
  }
})

const RSS_FEEDS = [
  {
    url: 'https://openai.com/blog/rss.xml',
    source: 'OpenAI' as const
  },
  {
    url: 'https://www.anthropic.com/news/rss.xml',
    source: 'Anthropic' as const
  },
  {
    url: 'https://ai.googleblog.com/feeds/posts/default',
    source: 'GoogleAI' as const
  },
  {
    url: 'https://www.producthunt.com/feed/topic/artificial-intelligence',
    source: 'ProductHunt' as const
  }
]

const HN_API_URL = 'https://hn.algolia.com/api/v1/search?query=AI&tags=story&hitsPerPage=10'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

async function fetchRSSFeed(feedUrl: string, source: NewsItem['source']): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl)
    
    return feed.items.slice(0, 5).map(item => ({
      source,
      title: item.title || 'Untitled',
      url: item.link || feedUrl,
      publishedAt: item.pubDate || new Date().toISOString(),
      summary: truncate(stripHtml(item.contentSnippet || item.content || ''), 200)
    }))
  } catch (error) {
    console.error(`Failed to fetch ${source} RSS:`, error)
    return []
  }
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(HN_API_URL, { 
      headers: { 'User-Agent': 'Pathify-AI/1.0' }
    })
    
    if (!response.ok) {
      throw new Error(`HN API responded with ${response.status}`)
    }
    
    const data = await response.json()
    
    return data.hits.slice(0, 5).map((hit: any) => ({
      source: 'HackerNews' as const,
      title: hit.title || 'Untitled',
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      publishedAt: hit.created_at || new Date().toISOString(),
      summary: truncate(hit.title || '', 200)
    }))
  } catch (error) {
    console.error('Failed to fetch HackerNews:', error)
    return []
  }
}

export async function GET() {
  try {
    const feedPromises = RSS_FEEDS.map(feed => 
      fetchRSSFeed(feed.url, feed.source)
    )
    
    const hackerNewsPromise = fetchHackerNews()
    
    const results = await Promise.allSettled([
      ...feedPromises,
      hackerNewsPromise
    ])
    
    const allItems: NewsItem[] = []
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value)
      } else {
        const sourceName = index < RSS_FEEDS.length 
          ? RSS_FEEDS[index].source 
          : 'HackerNews'
        console.error(`Failed to fetch ${sourceName}:`, result.reason)
      }
    })
    
    // Sort by publication date (newest first)
    allItems.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
    const response = {
      items: allItems.slice(0, 20) // Limit to 20 most recent items
    }
    
    const validatedResponse = NewsResponseSchema.parse(response)
    
    return NextResponse.json(validatedResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' // Cache for 5 minutes
      }
    })
    
  } catch (error) {
    console.error('News API error:', error)
    
    return NextResponse.json({
      items: []
    }, {
      status: 200, // Return empty array instead of error to not break the UI
      headers: {
        'Cache-Control': 'public, s-maxage=60' // Short cache on errors
      }
    })
  }
}