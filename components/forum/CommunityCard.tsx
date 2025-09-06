import { Community } from '@/types'
import Link from 'next/link'

interface CommunityCardProps {
  community: Community
}

export default function CommunityCard({ community }: CommunityCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI Models': return 'bg-purple-100 text-purple-800'
      case 'Tools': return 'bg-blue-100 text-blue-800'
      case 'Discussion': return 'bg-green-100 text-green-800'
      case 'News': return 'bg-red-100 text-red-800'
      case 'Help': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatMemberCount = (count: number) => {
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`
    return `${(count / 1000000).toFixed(1)}M`
  }

  return (
    <Link href={`/forum/r/${community.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 p-6 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {community.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                /r{community.displayName}
              </h3>
              <p className="text-sm text-gray-600">
                {formatMemberCount(community.memberCount)} members
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {community.isOfficial && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" title="Official Community">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(community.category)}`}>
              {community.category}
            </span>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {community.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Created {new Date(community.createdAt).toLocaleDateString()}</span>
          <span className="text-purple-600 group-hover:text-purple-700 font-medium">
            Join Community →
          </span>
        </div>
      </div>
    </Link>
  )
}