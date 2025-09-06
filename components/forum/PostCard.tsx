import { useState } from 'react'
import { Post } from '@/types'
import Link from 'next/link'

interface PostCardProps {
  post: Post
  showCommunity?: boolean
  onVote?: (postId: string, vote: 'up' | 'down') => void
}

export default function PostCard({ post, showCommunity = true, onVote }: PostCardProps) {
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (vote: 'up' | 'down') => {
    if (isVoting || !onVote) return
    
    setIsVoting(true)
    try {
      await onVote(post.id, vote)
    } finally {
      setIsVoting(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const getNetScore = () => post.upvotes - post.downvotes

  const getRatingStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <button
            onClick={() => handleVote('up')}
            disabled={isVoting}
            className="text-gray-400 hover:text-green-500 transition-colors disabled:opacity-50 p-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <span className={`text-sm font-medium ${
            getNetScore() > 0 ? 'text-green-600' : 
            getNetScore() < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {getNetScore()}
          </span>
          
          <button
            onClick={() => handleVote('down')}
            disabled={isVoting}
            className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 p-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {showCommunity && (
                <>
                  <Link 
                    href={`/forum/r/${post.communityId}`}
                    className="font-medium text-purple-600 hover:text-purple-700"
                  >
                    /r{post.communityName}
                  </Link>
                  <span>•</span>
                </>
              )}
              <span>Posted by</span>
              <span className="font-medium text-gray-900">{post.authorName}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
              {post.isEdited && (
                <>
                  <span>•</span>
                  <span className="text-gray-500">edited</span>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <Link href={`/forum/post/${post.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-700 transition-colors mb-2 line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Model Rating */}
          {post.modelRating && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-sm font-medium text-yellow-800">Model Rating:</span>
              <div className="flex items-center gap-1">
                {getRatingStars(post.modelRating)}
                <span className="text-sm font-medium text-yellow-800 ml-1">
                  {post.modelRating}/5
                </span>
              </div>
            </div>
          )}

          {/* Content Preview */}
          <div className="text-gray-700 mb-4 line-clamp-3">
            {post.content.length > 200 
              ? `${post.content.substring(0, 200)}...`
              : post.content
            }
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link 
              href={`/forum/post/${post.id}`}
              className="flex items-center gap-1 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.commentCount} comments
            </Link>
            
            <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}