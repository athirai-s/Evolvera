import { useState } from 'react'
import { Community, CreatePost } from '@/types'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  communities: Community[]
  onSubmit: (postData: CreatePost) => Promise<void>
}

export default function CreatePostModal({ isOpen, onClose, communities, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [communityId, setCommunityId] = useState('')
  const [tags, setTags] = useState('')
  const [modelRating, setModelRating] = useState<number | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !communityId) return

    setIsSubmitting(true)
    try {
      const postData: CreatePost = {
        title: title.trim(),
        content: content.trim(),
        communityId,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        modelRating
      }

      await onSubmit(postData)
      
      // Reset form
      setTitle('')
      setContent('')
      setCommunityId('')
      setTags('')
      setModelRating(undefined)
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Community Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Community *
            </label>
            <select
              value={communityId}
              onChange={(e) => setCommunityId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            >
              <option value="">Select a community</option>
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  /r{community.displayName} ({community.memberCount} members)
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              required
              maxLength={300}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
            <div className="text-xs text-gray-500 mt-1">
              {title.length}/300 characters
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or questions..."
              required
              rows={8}
              maxLength={10000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {content.length}/10,000 characters
            </div>
          </div>

          {/* Model Rating (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Model Rating (Optional)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setModelRating(modelRating === rating ? undefined : rating)}
                  className={`text-2xl transition-colors ${
                    modelRating && rating <= modelRating
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  ★
                </button>
              ))}
              {modelRating && (
                <button
                  type="button"
                  onClick={() => setModelRating(undefined)}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear rating
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Rate the AI model you're discussing (if applicable)
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="review, comparison, help, tutorial (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add relevant tags to help others find your post
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim() || !communityId}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isSubmitting ? 'Creating Post...' : 'Create Post'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}