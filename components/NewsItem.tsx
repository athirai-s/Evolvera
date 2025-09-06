import { NewsItem as NewsItemType } from '@/types'

interface NewsItemProps {
  item: NewsItemType
}

const sourceBadges: Record<string, { color: string; emoji: string }> = {
  OpenAI: { color: 'bg-green-100 text-green-800', emoji: '🤖' },
  Anthropic: { color: 'bg-blue-100 text-blue-800', emoji: '🔮' },
  GoogleAI: { color: 'bg-red-100 text-red-800', emoji: '🔍' },
  ProductHunt: { color: 'bg-orange-100 text-orange-800', emoji: '🚀' },
  HackerNews: { color: 'bg-yellow-100 text-yellow-800', emoji: '💬' }
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  return `${diffInWeeks}w ago`
}

export default function NewsItem({ item }: NewsItemProps) {
  const badge = sourceBadges[item.source] || { color: 'bg-gray-100 text-gray-800', emoji: '📰' }
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
          <span className="mr-1">{badge.emoji}</span>
          {item.source}
        </span>
        <span className="text-xs text-gray-500 flex-shrink-0 ml-3">
          {getRelativeTime(item.publishedAt)}
        </span>
      </div>
      
      <h3 className="font-medium text-gray-900 mb-2 leading-snug">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          {item.title}
        </a>
      </h3>
      
      {item.summary && (
        <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
      )}
    </div>
  )
}